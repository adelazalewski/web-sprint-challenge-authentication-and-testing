const db = require("../../data/dbConfig")

async function add(user) {
    const [id] = await db("users").insert(user)
return findById(id)
}

function find() {
    return db("users").select("id","username", "password")
}

function findById(id) {
    return db("users").where("id", id).first("id", "username", "password")
}

function findByUsername(username) {
    return db("users").where("username", username).first("id", "username", "password")
}

module.exports = {
    find,
    findById,
    findByUsername,
    add,
}