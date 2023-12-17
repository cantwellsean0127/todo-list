// Imports our database pool object
import database_pool from "../database/database.js"

// Route for creating a new todo item
const createTodo = async (req, res) => {

    // Verifies an task was sent in the request body and is of the type string
    if (req.body.task === undefined) {
        sendBadRequest(res, "Missing required parameter: 'task' of type string")
        return
    } else if (typeof req.body.task !== "string") {
        sendBadRequest(res, `Parameter 'task' should be of type string, received ${typeof req.body.task} instead`)
        return
    }

    // Inserts the new todo item into the database
    const query_parameters = [req.body.task]
    const database_response = await database_pool.query("INSERT INTO todos (task, is_finished) VALUES ($1, FALSE) RETURNING *;", query_parameters)

    // If a todo item was indeed inserted, send the created todo item with a 201 Created status code
    if (database_response.rowCount === 1) {
        res.status(201)
        res.send(database_response.rows[0])
    }

    // Otherwise, send a 400 Bad Request response
    else {
        res.status(400)
        res.send()
    }
}

// Route for reading all todo items
const readTodos = async (req, res) => {

    // Queries the database for all the todo items
    const database_response = await database_pool.query("SELECT * FROM todos ORDER BY id;")

    // Sends the items
    res.status(200)
    res.send(database_response.rows)
}

// Route for updating a todo item
const updateTodo = async (req, res) => {

    // Verifies an id was sent in the request body and is of the type number
    if (req.body.id === undefined) {
        sendBadRequest(res, "Missing required parameter: 'id' of type number")
        return
    } else if (typeof req.body.id !== "number") {
        sendBadRequest(res, `Parameter 'id' should be of type number, received ${typeof req.body.id} instead`)
        return
    }

    // Verifies an task was sent in the request body and is of the type string
    if (req.body.task === undefined) {
        sendBadRequest(res, "Missing required parameter: 'task' of type string")
        return
    } else if (typeof req.body.task !== "string") {
        sendBadRequest(res, `Parameter 'task' should be of type string, received ${typeof req.body.task} instead`)
        return
    }

    // Verifies an is_finished status was sent in the request body and is of the type boolean
    if (req.body.is_finished === undefined) {
        sendBadRequest(res, "Missing required parameter: 'is_finished' of type boolean")
        return
    } else if (typeof req.body.is_finished !== "boolean") {
        sendBadRequest(res, `Parameter 'is_finished' should be of type boolean, received ${typeof req.body.is_finished} instead`)
        return
    }

    // Verifies the passed id is not out of range for the id BIGSERIAL column
    if (req.body.id < 1 || req.body.id > Math.pow(2, 63)) {
        sendNotFound(res, `No item found with an ID of ${req.body.id}`)
        return
    }

    // Verifies an item with the passed id exists
    let query_parameters = [req.body.id]
    let database_response = await database_pool.query("SELECT id FROM todos WHERE id = $1;", query_parameters)
    if (database_response.rowCount === 0) {
        sendNotFound(res, `No item found with an ID of ${req.body.id}`)
        return
    }

    // Updates the todo item
    query_parameters = [req.body.task, req.body.is_finished, req.body.id]
    database_response = await database_pool.query("UPDATE todos SET task = $1, is_finished = $2 WHERE id = $3 RETURNING *;", query_parameters)

    // If a todo item was indeed updated, send the updated item with a 200 OK status code
    if (database_response.rowCount === 1) {
        res.status(200)
        res.send(database_response.rows[0])
    }

    // Otherwise, send a 400 Bad Request response
    else {
        res.status(400)
        res.send()
    }
}

// Route for deleting a todo item
const deleteTodo = async (req, res) => {

    // Verifies an id was sent in the request body and is of the type number
    if (req.body.id === undefined) {
        sendBadRequest(res, "Missing required parameter: 'id' of type number")
        return
    } else if (typeof req.body.id !== "number") {
        sendBadRequest(res, `Parameter 'id' should be of type number, received ${typeof req.body.id} instead`)
        return
    }

    // Verifies the passed id is not out of range for the id BIGSERIAL column
    if (req.body.id < 1 || req.body.id > Math.pow(2, 63)) {
        sendNotFound(res, `No item found with an ID of ${req.body.id}`)
        return
    }

    // Verifies an item with the passed id exists
    let query_parameters = [req.body.id]
    let database_response = await database_pool.query("SELECT id FROM todos WHERE id = $1;", query_parameters)
    if (database_response.rowCount === 0) {
        sendNotFound(res, `No item found with an ID of ${req.body.id}`)
        return
    }

    // Delets the todo item
    query_parameters = [req.body.id]
    database_response = await database_pool.query("DELETE FROM todos WHERE id = $1 RETURNING *;", query_parameters)

    // If a todo item was indeed deleted, send a 204 No Content response
    if (database_response.rowCount === 1) {
        res.status(204)
        res.send()
    }

    // Otherwise, send a 400 Bad Request response
    else {
        res.status(400)
        res.send()
    }
}

// When this function is called, return a 400 Bad Request response
const sendBadRequest = (res, errorMessage = "Bad Request") => {
    res.status(400)
    res.send(errorMessage)
}

// When this function is called, return a 404 Not Found response
const sendNotFound = (res, errorMessage = "Not Found") => {
    res.status(404)
    res.send(errorMessage)
}

// When this module is imported and invoked, add the server's routes
export default (server) => {

    // Route for creating a new todo item
    server.post("/api/todos", createTodo)

    // Route for reading all todo items
    server.get("/api/todos", readTodos)

    // Routes for updating a new todo item
    server.put("/api/todos", updateTodo)
    server.patch("/api/todos", updateTodo)

    // Routes for deleting a new todo item
    server.delete("/api/todos", deleteTodo)
}
