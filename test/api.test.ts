import request from "supertest";
import app from "../src/app";

describe("POST /api/auth/unregister", () => {
  it("should return 200 OK", () => {
    request(app)
      .post("/api/auth/unregister")
      .send({ user: {
        id: "cac5688b-5953-48a7-a712-aa02be24882c",
        username: "merturl"
      } })
      .expect(200);
  });
});
