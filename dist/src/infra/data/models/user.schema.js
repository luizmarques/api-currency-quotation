"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        minlength: 3,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    favoriteCurrency: {
        type: [String],
        required: true,
    },
}, {
    timestamps: true,
    toObject: { useProjection: true },
    toJSON: { useProjection: true },
});
exports.default = UserSchema;
