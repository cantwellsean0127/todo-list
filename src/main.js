// Imports our server object
import server from "./server/server.js"

// The process module allows us to interact with the OS process running this application
import { env } from "process"

// This is where program execution begins
const start = () => {

    // Listens for incoming connections
    server.listen(env.server_port)

}

// Starts our program
start()
