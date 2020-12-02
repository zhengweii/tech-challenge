require("dotenv").config();
const request = require("supertest");

const { app } = require("../../index");

test("Sign in user success", async () => {
    await request(app)
        .post("/sign-in")
        .send({
            email: "test@test.com",
            password: "123321"
        })
        .expect(200);
});

test("Sign in user failure incorrect email", async () => {
    await request(app)
        .post("/sign-in")
        .send({
            email: "test@incorrectEmail.com",
            password: "123321"
        })
        .expect(401);
});

test("Sign in user failure incorrect password", async () => {
    await request(app)
        .post("/sign-in")
        .send({
            email: "test@test.com",
            password: "incorrectPassword"
        })
        .expect(401);
});
