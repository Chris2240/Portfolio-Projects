// import the express
import express from "express";

// a1) because I use ESNext module in my project to importing/exporting methods and async methods
// I need to replace __dirname with an alternative method that works with ES modules 
import { fileURLToPath } from "url"; 
import path from "path";

// initialize the express engine
const app: express.Application = express();

// declaration of App Port Number.
const port = 3000;

// a2) get the current directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// serve static files from 'src/assets' (before compilation)
app.use(express.static("src/assets"));  // this mean src/assets/(all files) will be served as http://localhost:3000/(all files)

// serve static files from 'build/src/assets' (after compilation)
app.use(express.static("build/src/assets"));    // this mean build/src/assets/(all files) will be served as http://localhost:3000/(all files)

// serve static files from node_modules (e.g., papaparse, etc.)
app.use("/libs", express.static("node_modules"));

// handling '/' request - serve the SPA (index.html)
// providing the root of the index.html inside my folders and files tree
app.get("/", (_req, _res)=>{
    _res.sendFile(path.join(__dirname, "..", "src", "index.html"));
});

// server setup - Port Listening
app.listen(port, () =>{
    console.log(`Express Srver Running - Port: ${port}`);
});