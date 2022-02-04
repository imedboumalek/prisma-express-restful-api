"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPassword = void 0;
const prisma_client_1 = __importDefault(require("../prisma-client"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_1 = require("express");
const checkRequiredFieldsForSignIn = (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(403).json({
            message: "Please provide username and password",
        });
        return;
    }
    next();
};
const checkUserExistance = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.body;
    const user = yield prisma_client_1.default.author.findFirst({
        where: {
            username: username,
        },
    });
    if (!user) {
        res.status(403).json({
            message: "Invalid username or password",
        });
        return;
    }
    res.locals.user = user;
    next();
});
const checkPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { password } = req.body;
    const user = res.locals.user;
    const hashedPassword = yield bcrypt_1.default.hash(password, user.salt);
    const isPasswordValid = hashedPassword === user.password;
    if (!isPasswordValid) {
        res.status(403).json({
            message: "Username or password is incorrect",
        });
        return;
    }
    next();
});
exports.checkPassword = checkPassword;
const returnJWT = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = res.locals.user;
    const token = jsonwebtoken_1.default.sign({
        sub: user.id,
        username: user.username,
        iat: Math.floor(Date.now() / 1000),
    }, process.env.JWT_SECRET);
    res.json({
        access_token: token,
    });
});
exports.default = (0, express_1.Router)().use(checkRequiredFieldsForSignIn, checkUserExistance, exports.checkPassword, returnJWT);
//# sourceMappingURL=login.js.map