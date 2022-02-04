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
require("mocha");
const chai_1 = require("chai");
const app_1 = __importDefault(require("./../app"));
describe("/auth", () => {
    describe("/login", () => {
        it("should return 400 if username or password is missing", () => __awaiter(void 0, void 0, void 0, function* () {
            yield chai
                .request(app_1.default)
                .post("/auth/login")
                .send({
                username: "",
            })
                .end((err, res) => {
                chai_1.assert.equal(res.status, 400);
                chai_1.assert.equal(res.body.message, "username or password is missing");
            });
            yield chai
                .request(app_1.default)
                .post("/auth/login")
                .send({
                password: "",
            })
                .end((err, res) => {
                chai_1.assert.equal(res.status, 400);
                chai_1.assert.equal(res.body.message, "username or password is missing");
            });
        }));
        it("should return 403 if user does not exist", () => {
            chai
                .request(app_1.default)
                .post("/auth/login")
                .send({
                username: "test",
                password: "test",
            })
                .end((err, res) => {
                chai_1.assert.equal(res.status, 403);
                chai_1.assert.equal(res.body.message, "Invalid username or password");
            });
        });
        it("should return 403 if password is incorrect", () => {
            chai
                .request(app_1.default)
                .post("/auth/login")
                .send({
                username: "simohamed",
                password: "test",
            })
                .end((err, res) => {
                chai_1.assert.equal(res.status, 403);
                chai_1.assert.equal(res.body.message, "Invalid username or password");
            });
        });
        it("should return JWT if username and password are correct", () => {
            chai
                .request(app_1.default)
                .post("/auth/login")
                .send({
                username: "simohamed",
                password: "12345679",
            })
                .end((err, res) => {
                chai_1.assert.equal(res.status, 200);
                chai_1.assert.isNotNull(res.body.access_token);
            });
        });
    });
});
//# sourceMappingURL=auth.test.js.map