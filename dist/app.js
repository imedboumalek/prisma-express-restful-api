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
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const authors_1 = __importDefault(require("./routes/authors/authors"));
const auth_1 = __importDefault(require("./routes/auth/auth"));
const countries_1 = __importDefault(require("./routes/countries/countries"));
const swagger_config_1 = __importDefault(require("./swagger-config"));
const prisma_client_1 = __importDefault(require("./prisma-client"));
const submissions_1 = __importDefault(require("./routes/submissions/submissions"));
function main() {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        dotenv_1.default.config();
        yield prisma_client_1.default.$connect().then(() => {
            console.log("connected to prisma");
        });
        const app = (0, express_1.default)();
        app.use((0, morgan_1.default)("dev"));
        app.use(express_1.default.json());
        app.use(express_1.default.urlencoded({ extended: false }));
        app.use((0, cookie_parser_1.default)());
        app.use(swagger_config_1.default);
        app.use(countries_1.default);
        app.use(auth_1.default);
        app.use(authors_1.default);
        app.use(submissions_1.default);
        app.listen((_a = process.env.PORT) !== null && _a !== void 0 ? _a : 8080, () => {
            var _a;
            // console.log("hello");
            console.log(`Server is running on port ${(_a = process.env.PORT) !== null && _a !== void 0 ? _a : 8080}`);
        });
    });
}
main().finally(() => {
    prisma_client_1.default.$disconnect();
});
//# sourceMappingURL=app.js.map