const db = require('../../Data/dbConfig');

const find = () => {
    return db("users").select("id", "username", "password");
}

const findBy = (filter) => {
    // make sure to include the role information
    return db("users").where(filter);
}

const add = async (user) => {
    const [id] = await db("users").insert(user);

    return findById(id);
}

const findById = (id) => {
    return db("users")
        .where({ id })
        .first();
}

module.exports = {
    add,
    find,
    findBy,
    findById
};