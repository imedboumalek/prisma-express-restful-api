require("mocha");
import chai, { assert } from "chai";
import chaiHttp from "chai-http";
import server from "../src/app";
chai.use(chaiHttp);
describe("/auth", () => {
  describe("/login", () => {
    it("should return 400 if username or password is missing", async () => {
      const withoutUsername = await chai
        .request(server)
        .post("/auth/login")
        .send({
          username: "",
        });
      const withoutPassword = await chai

        .request(server)
        .post("/auth/login")
        .send({
          password: "",
        });
      assert.equal(withoutUsername.status, 400);
      assert.equal(withoutPassword.status, 400);
    });

    it("should return 403 if user does not exist", () => {
      chai
        .request(server)
        .post("/auth/login")
        .send({
          username: "test",
          password: "test",
        })
        .end((err, res) => {
          assert.equal(res.status, 403);
          assert.equal(res.body.message, "Invalid username or password");
        });
    });
    it("should return 403 if password is incorrect", () => {
      chai
        .request(server)
        .post("/auth/login")
        .send({
          username: "simohamed",
          password: "test",
        })
        .end((err, res) => {
          assert.equal(res.status, 403);
          assert.equal(res.body.message, "Invalid username or password");
        });
    });

    it("should return JWT if username and password are correct", () => {
      chai
        .request(server)
        .post("/auth/login")
        .send({
          username: "simohamed",
          password: "12345679",
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isNotNull(res.body.access_token);
        });
    });
  });
});
