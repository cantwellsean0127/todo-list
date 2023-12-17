// The express module allows us to easily create and manage HTTP servers
import express from "express"

// Imports our middleware function
import addMiddleware from "./server-middleware.js"

// Imports our server routes
import addRoutes from "./server-routes.js"

// Creates our express server instance
const server = express()

// Adds the middleware
addMiddleware(server)

// Adds our routes
addRoutes(server)

// Exports our server object
export default server