const { Member } = require('../models/member');
const log = require('../helpers/log');

class MemberController {
    static async addMember(req, res, next) {
        try {
            let obj = {};
            const { name } = req.body;
            if (name) obj.name = name;

            let result = await Member.create(obj);

            log.info(req.clientIp + ' - ' + 'Success Access Api addMmeber - success add member');
            res.status(200).json({
                success: true,
                message: "Success add member",
                data: result
            });
        } catch (err) {
            log.error(err + " - Api addMember")
            next(err);
        }
    }

    static async memberList(req, res, next) {
        try {
            let admins = await Member.find()
                .populate({ path: 'book', select: ['-createdAt', '-updatedAt', '-stock'] });


            log.info(req.clientIp + ' - ' + 'Success Access Api memberList');
            res.status(200).json({
                success: true,
                message: "Success retrive Member list",
                data: admins,
            });
        } catch (err) {
            log.error(err + " - Api memberList")
            next(err)
        }
    }

}

module.exports = MemberController