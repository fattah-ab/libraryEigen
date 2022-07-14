const { Book } = require('../models/book');
const { Member } = require('../models/member');
const log = require('../helpers/log');

class BookController {
    static async addBook(req, res, next) {
        try {
            let obj = {};
            const { code, title, author, stock } = req.body;
            if (code) obj.code = code;
            if (title) obj.title = title;
            if (author) obj.author = author;
            if (stock) obj.stock = stock;

            let result = await Book.create(obj);

            log.info(req.clientIp + ' - ' + 'Success Access Api addBook - success add book');
            res.status(200).json({
                success: true,
                message: "Success add book",
                data: result
            });
        } catch (err) {
            log.error(err + " - Api addBook")
            next(err);
        }
    }

    static async bookList(req, res, next) {
        try {
            let books = await Book.find({ stock: { $ne: 0 } })
                .populate({ path: 'member', select: ['-createdAt', '-updatedAt'] });

            log.info(req.clientIp + ' - ' + 'Success Access Api bookList');
            res.status(200).json({
                success: true,
                message: "Success retrive Book list",
                data: books,
            });
        } catch (err) {
            log.error(err + " - Api bookList")
            next(err)
        }
    }

    static async borrowBook(req, res, next) {
        try {
            let obj = {};

            const { codeBook, idMember } = req.body;
            if (codeBook) obj.codeBook = codeBook;
            if (idMember) obj.idMember = idMember;

            let book = await Book.findOne({ code: codeBook });
            let member = await Member.findById({ _id: idMember });

            const downStock = book.stock -= 1;
            let now = new Date();

            if (member.isPenalty === true) {
                if (now.getDate() - book.dateBack.getDate() > 3) {
                    await Book.findByIdAndUpdate(book._id, { $set: { stock: downStock, dateBorrow: now }, $push: { member: idMember } }, { new: true });
                    await Member.findByIdAndUpdate(idMember, { $set: { isPenalty: false }, $push: { book: book._id, } }, { new: true });

                    log.info(req.clientIp + ' - ' + 'Success Access Api borrowBook - success borrow book');
                    res.status(200).json({
                        success: true,
                        message: "Success Borrow Book",
                    });
                } else {

                    log.info(req.clientIp + ' - ' + 'Success Access Api borrowBook - cannot borrow book');
                    return res.status(200).json({
                        success: true,
                        message: "Cannot borrow Book, you are still on penalty",
                    });
                }

            }

            await Book.findByIdAndUpdate(book._id, { $set: { stock: downStock, dateBorrow: now }, $push: { member: idMember } }, { new: true });
            await Member.findByIdAndUpdate(idMember, { $push: { book: book._id, } }, { new: true });

            log.info(req.clientIp + ' - ' + 'Success Access Api borrowBook - success borrow book');
            res.status(200).json({
                success: true,
                message: "Success Borrow Book",
            });
        } catch (err) {
            log.error(err + " - Api borrowBook")
            next(err)
        }
    }

    static async returnBook(req, res, next) {
        try {
            const { codeBook } = req.body;

            let book = await Book.findOne({ code: codeBook })
                .populate({ path: 'member', select: ['-createdAt', '-updatedAt'] });

            let member = await Member.findById({ _id: book.member[0]._id });

            const addStock = book.stock += 1;
            let now = new Date();

            if (now.getDate() - book.dateBorrow.getDate() > 7) {
                await Member.findByIdAndUpdate(member._id, { $set: { isPenalty: true }, $pull: { book: book._id, } }, { new: true });
                await Book.findByIdAndUpdate(book._id, { $set: { stock: addStock, dateBack: now }, $pull: { member: member._id } }, { new: true });

                log.info(req.clientIp + ' - ' + 'Success Access Api returnBook - success return book with penalized');
                res.status(200).json({
                    success: true,
                    message: "Success return Book and members are penalized",
                });
            }

            await Member.findByIdAndUpdate(member._id, { $set: { isPenalty: false }, $pull: { book: book._id, } }, { new: true });
            await Book.findByIdAndUpdate(book._id, { $set: { stock: addStock, dateBack: now }, $pull: { member: member._id } }, { new: true });

            log.info(req.clientIp + ' - ' + 'Success Access Api returnBook - success return book');
            res.status(200).json({
                success: true,
                message: "Success return Book ",
            });
        } catch (err) {
            log.error(err + " - Api returnBook")
            next(err)
        }
    }

}

module.exports = BookController