const db = require("../data/config")

function find() {
    return db('schemes');
}

function findById(id) {
    return db('schemes')
        .where( "id", id )
        .first()
        .then((res) => {
            if (res !== []) {
                return res;
            }
            return null;
        })
}

function findSteps(id) {
    return db('schemes')
    .join("steps", "steps.scheme_id", "schemes.id")
    .where( "schemes.id", id )
    .select("steps.id", "steps.step_number", "schemes.scheme_name", "steps.instructions")
    .orderBy("step_number")
}

function add(scheme) {
    return db("schemes")
    .insert(scheme)
}

function addStep(stepData, id) {
    return db("steps").join("schemes", "schemes.id", id).insert(stepData);
}

function update(changes, id) {
    return db('schemes')
    .where("id", id)
    .update(changes)
}

function remove(id) {
    return db("schemes").where("id", id).del();
}

module.exports = {
    find,
    findById,
    findSteps,
    add,
    addStep,
    update,
    remove
}