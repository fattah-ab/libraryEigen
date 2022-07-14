const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    code: {
        type: String,
    },
    title: {
        type: String,
    },
    author: {
        type: String,
    },
    stock: {
        type: Number,
        default: 1
    },
    dateBorrow: {
        type: Date,
    },
    dateBack: {
        type: Date,
    },
    member: [{ type: mongoose.Schema.Types.ObjectId, ref: "Member" }],
}, { timestamps: true, versionKey: false });

exports.Book = mongoose.model("Book", bookSchema);
