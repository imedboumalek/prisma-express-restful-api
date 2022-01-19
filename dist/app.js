"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const authors_1 = __importDefault(require("./routes/authors/authors"));
const auth_1 = __importDefault(require("./routes/auth/auth"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(authors_1.default);
app.use(auth_1.default);
app.listen((_a = process.env.PORT) !== null && _a !== void 0 ? _a : 8080, () => {
    var _a;
    console.log("hello");
    console.log(`Server is running on port ${(_a = process.env.PORT) !== null && _a !== void 0 ? _a : 8080}`);
});
//# sourceMappingURL=app.js.map