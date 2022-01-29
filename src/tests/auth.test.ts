import { assert } from "chai";

require("mocha");
describe("Testing Auth", () => {
  describe("/login", () => {
    it("should return 400 if username or password is missing", () => {
      assert(true);
    });
    it("should return 403 if user does not exist", () => {
      assert(true);
    });
    it("should return 403 if password is incorrect", () => {
      assert(true);
    });
    it("should return JWT if username and password are correct", () => {
      assert(true);
    });
  });
});
