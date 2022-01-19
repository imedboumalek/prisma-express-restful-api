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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const prisma_client_1 = __importDefault(require("../../prisma-client"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const checkRequiredFields = (req, res, next) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400).json({
            message: "Please provide username, email and password",
        });
        return;
    }
    next();
};
// all should be strings
const validateCredentials = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, email, first_name, last_name } = req.body;
    let response;
    if (typeof username !== "string" || username.length < 3) {
        response["username"] =
            "Username must be a string & at least 3 characters long";
    }
    if (typeof password !== "string" || password.length < 8) {
        response["password"] = "Password must be at least 8 characters long";
    }
    if (typeof email !== "string" || !email.includes("@")) {
        response["email"] = "Email must be a valid email";
    }
    if (typeof first_name !== "string") {
        response["first_name"] = "First name must be a string";
    }
    if (typeof last_name !== "string") {
        response["last_name"] = "Last name must be a string";
    }
    if (response) {
        res.status(400).json(response);
        return;
    }
    next();
});
const checkCredentialExistance = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email } = req.body;
    const usedCredentials = (yield prisma_client_1.default.author.count({
        where: {
            OR: [{ email: email }, { username: username }],
        },
    })) !== 0;
    console.log("usedCredentials", usedCredentials);
    if (usedCredentials) {
        res.status(400).json({
            message: "Username or email already exists",
        });
        return;
    }
    next();
});
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, first_name, last_name } = req.body;
    const salt = yield bcrypt_1.default.genSalt(10);
    const hashedPassword = yield bcrypt_1.default.hash(password, salt);
    const newAuthor = yield prisma_client_1.default.author
        .create({
        data: {
            username: username,
            email: email,
            password: hashedPassword,
            first_name: first_name,
            last_name: last_name,
            salt: salt,
            jwt: "zaa3ma jwt ak chayef",
        },
    })
        .then((author) => {
        const { salt, password, jwt } = author, therest = __rest(author, ["salt", "password", "jwt"]);
        return therest;
    });
    res.status(200).json(Object.assign({}, newAuthor));
});
router.post("/signup", checkRequiredFields, checkCredentialExistance, validateCredentials, signup);
router.all("/signup", (req, res) => {
    // return method not allowed
    res.status(405).send({
        message: "Method not allowed",
    });
});
exports.default = router;
//# sourceMappingURL=signup.js.map