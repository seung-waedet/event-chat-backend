const request = require("supertest");
const { app, io } = require("../server"); // Import app and io
const mongoose = require("mongoose");

// Close the server and database connection after all tests are done
afterAll(async () => {
  io.close(); // Close the socket.io server
  await mongoose.connection.close();
});

describe("GET /", () => {
  it("should return 200 OK with a welcome message", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      status: true,
      message: "EventChat",
    });
  });
});
