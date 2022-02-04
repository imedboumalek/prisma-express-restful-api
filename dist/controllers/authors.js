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
exports.getCurrentAuthor = exports.getAllAuthors = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
const prisma_client_1 = __importDefault(require("../prisma-client"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getAllAuthors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    prisma_client_1.default.author
        .findMany({
        include: {
            country: true,
            org: true,
            submissions: true,
        },
    })
        .then((authors) => {
        const authorsFiltered = authors.map((e) => {
            const { createdAt, updatedAt, username, email, password, salt } = e, theRest = __rest(e, ["createdAt", "updatedAt", "username", "email", "password", "salt"]);
            return theRest;
        });
        res.json(authorsFiltered);
    });
});
exports.getAllAuthors = getAllAuthors;
const getCurrentAuthor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = req.headers.authorization;
    if (!auth) {
        res.status(401).json({
            message: "Unauthorized",
        });
        return;
    }
    const token = auth.split(" ")[1];
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            res.status(401).json({
                message: "Unauthorized",
            });
            return;
        }
        prisma_client_1.default.author
            .findFirst({
            where: {
                id: parseInt(decoded["sub"].toString()),
            },
            include: {
                country: true,
                org: true,
                submissions: {
                    include: {
                        topic: true,
                        conferences: true,
                        tags: true,
                    },
                },
            },
        })
            .then((author) => {
            const { salt, password } = author, theRest = __rest(author, ["salt", "password"]);
            res.json(theRest);
        });
    });
});
exports.getCurrentAuthor = getCurrentAuthor;
//# sourceMappingURL=authors.js.map