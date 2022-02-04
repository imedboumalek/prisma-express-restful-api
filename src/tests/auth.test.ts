require("mocha");
import { assert } from "chai";
import chaiHttp from "chai-http";
import server from "./../app";

describe("/auth", () => {
  describe("/login", () => {
    it("should return 400 if username or password is missing", async () => {
      await chai
        .request(server)
        .post("/auth/login")
        .send({
          username: "",
        })
        .end((err, res) => {
          assert.equal(res.status, 400);
          assert.equal(res.body.message, "username or password is missing");
        });
      await chai

        .request(server)
        .post("/auth/login")
        .send({
          password: "",
        })
        .end((err, res) => {
          assert.equal(res.status, 400);
          assert.equal(res.body.message, "username or password is missing");
        });
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
