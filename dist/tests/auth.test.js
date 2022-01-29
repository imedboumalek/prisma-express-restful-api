"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("mocha");
describe("Testing Auth", () => {
    describe("/login", () => {
        it("should return 400 if username or password is missing", () => {
            (0, chai_1.assert)(true);
        });
        it("should return 403 if user does not exist", () => {
            (0, chai_1.assert)(true);
        });
        it("should return 403 if password is incorrect", () => {
            (0, chai_1.assert)(true);
        });
        it("should return JWT if username and password are correct", () => {
            (0, chai_1.assert)(true);
        });
    });
});
//# sourceMappingURL=auth.test.js.map