import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import { after } from "mocha";
import server from "../src/app";
chai.use(chaiHttp);
const app = chai.request(server).keepOpen();
describe("/auth", () => {
  after(() => {
    app.close();
  });
  describe("/login", () => {
    it("should return 400 if username or password is missing", (done) => {
      app
        .post("/auth/login")
        .send({
          username: "",
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal(
            "Please provide username and password"
          );
          done();
        });
    });

    it("should return 403 if user does not exist", (done) => {
      app
        .post("/auth/login")
        .send({
          username: "test",
          password: "test",
        })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          done();
        });
    });
    it("should return 403 if password is incorrect", (done) => {
      app
        .post("/auth/login")
        .send({
          username: "simohamed",
          password: "test",
        })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          done();
        });
    });

    it("should return JWT if username and password are correct", (done) => {
      app
        .post("/auth/login")
        .send({
          username: "simohamed",
          password: "12345679",
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
  });
});
