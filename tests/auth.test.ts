require("mocha");
import chai, { should } from "chai";
import chaiHttp from "chai-http";
import server from "../src/app";
chai.use(chaiHttp);
should;
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
      withoutPassword.status.should.equal(400);

      withoutUsername.status.should.equal(400);
    });

    it("should return 403 if user does not exist", async () => {
      const res = await chai.request(server).post("/auth/login").send({
        username: "test",
        password: "test",
      });
      res.status.should.equal(403);
      res.body.should.have.property("message");
      res.body.message.should.equal("Invalid username or password");
    });
    it("should return 403 if password is incorrect", async () => {
      const res = await chai.request(server).post("/auth/login").send({
        username: "simohamed",
        password: "test",
      });
      res.status.should.equal(403);
      res.body.should.have.property("message");
    });

    it("should return JWT if username and password are correct", async () => {
      const res = await chai.request(server).post("/auth/login").send({
        username: "simohamed",
        password: "12345679",
      });
      res.status.should.equal(200);
      res.body.should.have.property("access_token");
      res.body.access_token.should.be.a("string");
    });
  });
});
