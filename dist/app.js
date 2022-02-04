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
const authors_1 = __importDefault(require("./routes/authors"));
const auth_1 = __importDefault(require("./routes/auth"));
const countries_1 = __importDefault(require("./routes/countries"));
const submissions_1 = __importDefault(require("./routes/submissions"));
const swagger_config_1 = __importDefault(require("./swagger-config"));
const prisma_client_1 = __importDefault(require("./prisma-client"));
const helmet_1 = __importDefault(require("helmet"));
const app = (0, express_1.default)();
// async function main() {
dotenv_1.default.config();
prisma_client_1.default.$connect().then(() => {
    console.log("connected to prisma");
});
if (process.env.NODE_ENV == "dev") {
    app.use((0, morgan_1.default)("dev"));
}
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(swagger_config_1.default);
app.use(countries_1.default);
app.use(auth_1.default);
app.use(authors_1.default);
app.use(submissions_1.default);
app.listen((_a = process.env.PORT) !== null && _a !== void 0 ? _a : 5000, () => {
    var _a;
    console.log(`Server is running on port ${(_a = process.env.PORT) !== null && _a !== void 0 ? _a : 5000}`);
});
// }
// main().finally(() => {
//   dbclient.$disconnect();
// });
exports.default = app;
//# sourceMappingURL=app.js.map