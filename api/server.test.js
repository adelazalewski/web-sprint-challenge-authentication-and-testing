// Write your tests here
const request = require("supertest")
const server = require("./server")
const users = require("./auth/auth-model")
const db = require("../data/dbConfig")

afterAll(async () => {
    await db.destroy() //closes the db connections
})

test('sanity', () => {
  expect(true).toBe(true)
})

describe("api integration tests", () => {
  // test("can create a new user", async() => {
  //   const res = await request(server).post("/api/auth/register").send({username: "test", password: "12345"})
  //   expect(res.status).toBe(201)
  //   expect(res.type).toBe("application/json")
  //   expect(res.body.username).toBe("test")
  // }) - passed then failed 
  test("sends error message if the user is already taken", async() => {
    const res = await request(server).post("/api/auth/register").send({username: "test", password:"12345"})
    expect(res.status).toBe(409)
    expect(res.body.message).toBe("username already taken")
  })

  test("sends error message when req misses username or pass", async () => {
    const res = await request(server).post("/api/auth/register").send({username: "", password:"12345"})
    expect(res.status).toBe(400)
    expect(res.body.message).toBe("username and password required")
  })

  test("login success", async() => {
    const res = await request(server).post("/api/auth/login").send({username: "test", password:"12345"})
    expect(res.status).toBe(200)
    expect(res.type).toBe("application/json")
    
  })

  test("sends error message if credentials dont match", async ( )=> {
    const res = await request(server).post("/api/auth/login").send({username: "test", password:""})
    expect(res.status).toBe(400)
    expect(res.body.message).toBe("username and password required")
  })

  test("sends error message id username is missing", async () => {
    const res = await request(server).post("/api/auth/login").send({username: "adela z", password:"12345"})
    expect(res.status).toBe(401)
    expect(res.body.message).toBe("invalid credentials")
  })

})


