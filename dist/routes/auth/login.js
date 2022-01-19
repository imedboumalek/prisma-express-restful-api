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
const express_1 = __importDefault(require("express"));
const prisma_client_1 = __importDefault(require("../../prisma-client"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.default.Router();
const checkRequiredFields = (req, res, next) => {
    console.log("login");
    const { username, password } = req.body;
    console.log("username", username);
    console.log("password", password);
    if (!username || !password) {
        res.status(400).json({
            message: "Please provide username and password",
        });
        return;
    }
    next();
};
//TODO refactor this
router.post("/login", checkRequiredFields, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield prisma_client_1.default.author.findFirst({
        where: {
            username: username,
        },
    });
    console.log("user", user);
    if (!user) {
        res.status(400).json({
            message: "Username or password is incorrect",
        });
        return;
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, user.salt);
    const isPasswordValid = hashedPassword === user.password;
    console.log("isPasswordValid", isPasswordValid);
    if (!isPasswordValid) {
        res.status(400).json({
            message: "Username or password is incorrect",
        });
        return;
    }
    const token = jsonwebtoken_1.default.sign({
        sub: user.id,
        username: user.username,
        iat: Math.floor(Date.now() / 1000),
    }, process.env.JWT_SECRET);
    yield prisma_client_1.default.author
        .update({
        where: {
            id: user.id,
        },
        data: {
            jwt: token,
        },
    })
        .then(() => {
        console.log("updated jwt");
    });
    res.status(200).json({
        access_token: token,
    });
}));
router.all("/login", (req, res) => {
    // return method not allowed
    res.status(405).send({
        message: "Method not allowed",
    });
});
exports.default = router;
//# sourceMappingURL=login.js.map