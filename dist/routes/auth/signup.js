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
const router = express_1.default.Router();
const prisma_client_1 = __importDefault(require("../../prisma-client"));
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email } = req.body;
    console.log(username, email);
    if (username && email) {
        const usedCredentials = yield prisma_client_1.default.author.count({
            where: {
                OR: [username, email],
            },
        });
        console.log("usedCredentials", usedCredentials);
        if (usedCredentials) {
            res.status(400).json({
                message: "Username or email already exists",
            });
            return;
        }
        res.sendStatus(200).json({
            message: "congratulations, you have signed up",
        });
    }
    else {
        res.status(400).json({
            message: "Please provide username and email",
        });
    }
}));
router.all("/signup", (req, res) => {
    // return method not allowed
    res.status(405).send({
        message: "Method not allowed",
    });
});
exports.default = router;
//# sourceMappingURL=signup.js.map