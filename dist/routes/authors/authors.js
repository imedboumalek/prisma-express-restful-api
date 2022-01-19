"use strict";
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
/* eslint-disable @typescript-eslint/no-unused-vars */
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_client_1 = __importDefault(require("../../prisma-client"));
const authorsRouter = express_1.default.Router();
authorsRouter.get("/authors", (req, res) => {
    prisma_client_1.default.author
        .findMany({
        include: {
            country: true,
            org: true,
        },
    })
        .then((authors) => {
        const authorsFiltered = authors.map((e) => {
            const { createdAt, updatedAt, username, email, password, jwt, salt } = e, theRest = __rest(e, ["createdAt", "updatedAt", "username", "email", "password", "jwt", "salt"]);
            return theRest;
        });
        res.json(authorsFiltered);
    });
});
authorsRouter.get("/authors/current", (req, res) => {
    // validate headers
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
                username: decoded["username"],
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
            const { salt, password, jwt } = author, theRest = __rest(author, ["salt", "password", "jwt"]);
            res.json(theRest);
        });
    });
});
exports.default = authorsRouter;
//# sourceMappingURL=authors.js.map