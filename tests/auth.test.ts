import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import faker from "faker";
import { after } from "mocha";
import server from "../src/app";
chai.use(chaiHttp);
const app = chai.request(server).keepOpen();
describe("/auth", () => {
  after(() => {
    app.close();
  });

  describe("/signup", () => {
    it("should return 403 if username or password is missing", (done) => {
      app
        .post("/auth/signup")
        .send({})
        .end((err, res) => {
          expect(res.status).to.equal(403);

          done();
        });
    });
    it("should return 200 if user does not exist", (done) => {
      app
        .post("/auth/signup")
        .send({
          email: "simohamed@gmail.com",
          password: "123456789",
          username: "simohamed",
          first_name: "John",
          last_name: "Doe",
          countryId: 1,
          orgId: 5,
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
    it("should return 403 if user already exists", (done) => {
      app
        .post("/auth/signup")
        .send({
          email: "simohamed@gmail.com",
          password: "123456789",
          username: "simohamed",
          first_name: "John",
          last_name: "Doe",
          countryId: 1,
          orgId: 5,
        })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          done();
        });
    });
  });
  describe("/login", () => {
    it("should return 403 if username or password is missing", (done) => {
      app
        .post("/auth/login")
        .send({
          username: "",
        })
        .end((err, res) => {
          expect(res.status).to.equal(403);
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
          password: "123456789",
        })
        .end((err, res) => {
          console.log("res", res.status);
          expect(res.status).to.equal(200);
          done();
        });
    });
  });
});
