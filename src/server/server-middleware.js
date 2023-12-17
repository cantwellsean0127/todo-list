// The path module allows us to interact with paths
import { dirname, join } from "path"

// The express module contains many middlewares we can add to our server
import express from "express"

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

}