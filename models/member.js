const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    isPenalty: {
        type: Boolean,
        default: false
    },
    book: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
}, { timestamps: true, versionKey: false });

exports.Member = mongoose.model("Member", memberSchema);
