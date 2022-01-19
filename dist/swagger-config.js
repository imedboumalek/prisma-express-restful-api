"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Conference/article submission API made with express",
            version: "0.1.0",
            description: " CRUD API application made with Express and documented with Swagger",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
        },
        servers: [
            {
                url: "http://localhost:3000/books",
            },
        ],
    },
    apis: ["./routes/*"],
};
exports.default = (0, swagger_jsdoc_1.default)(options);
//# sourceMappingURL=swagger-config.js.map