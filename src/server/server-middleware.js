// The path module allows us to interact with paths
import { dirname, join } from "path"

// The express module contains many middlewares we can add to our server
import express from "express"

// The express-rate-limit module allows us to add rate limiting to requests
import express_rate_limit from "express-rate-limit"

// Gets this filepath and directory
const thisFilePath = import.meta.url
const thisDirectory = dirname(thisFilePath)

// When this module is imported and invoked, add the server's middleware
export default (server) => {

    // This middleware parses the body of any incoming requests and converts it into an object if the body is a JSON string
    server.use(express.json())

    // Statically serves the output from building our react files
    let static_directory = join(thisDirectory, "../react/dist").slice(5)
    server.use(express.static(static_directory))

    // Statically serves media files
    static_directory = join(thisDirectory, "../react/media").slice(5)
    server.use(express.static(static_directory))

    // Applies a rate limiting of 100 requests per minute window
    server.use(express_rate_limit({
        windowMs: 1 * 60 * 1000,
        max: 500,
    }))

}