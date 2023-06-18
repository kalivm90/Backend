// need something like create-react-app to build you a skeleton? Use: 
// "express <projectName>"
// cd <projectName>
// npm install 


const express = require("express");
// logger middleware
const logger = require("morgan")
// connecting to MongoDB (see enf of routes)
const MongoClient = require("mongodb").MongoClient;

const app = express();
const port = 3000;

// WIKI GROUP ROUTES
const wiki = require("./wiki")
// imported module
const math = require("./math")


/* Setting up templates */

// Set directory to contain the templates ('views')
app.set("views", path.join(__dirname, "views"))

// Set view engine to use, in this case 'some_template_engine_name'
app.set("view engine", "some_template_engine_name");


/* 
    MIDDLEWARE - since node is handlled synchronously some middleware will have to be added first. ALL middleware uses "next()" to tell it to move onto the next route
                 or middleware function
*/
// using imported middleware
app.use(logger("dev"))

// custom middleware - do not forget next()!
const my_middleware = (req, res, next) => {
    console.log(`Custom middleware: Method: ${req.method}, URL: ${req.url}`);
    next();
}

// use it globally
// app.use(my_middleware);

// or use it for a specified route. Go to /middle

// GET
app.get("/", (req, res) => {
    res.send("Hello World from express!");
    // LOAD TEMPLATE EXAMPLE
    // res.render("index", { title: "About dogs", message: "Dogs rock!" });
});

app.get("/middle", my_middleware, (req, res) => {
    res.send("Middleware for this route")
})

// example of POST route
app.post("/post", (req, res) => {
    res.send("POST request called")
})

// example of url params
app.get("/area/:width", (req, res) => {
    const width = parseInt(req.params?.width);

    //  CURRENT THREAD OPPENED ON REDDIT ABOUT THIS NOT WORKING
    (width) 
        ? res.send(`The area is ${math.area(width)}`)
        : res.send("Usage: http://<address>/area/<value>")
})

// so what if we need POST and GET for a route? Use "app.all()". This is used for loading middleware functions at a paticular path for all request methods
// this one uses "next"
app.all("/all", (req, res, next) => {
    res.send("POST+GET+PUT+DELETE request called");
    next()
})


/* 
    GROUPING ROUTES - this uses app.use and wiki.js to extend routing 
    
    now http://<address>/wiki is home 
    and http://<addredd>/wiki/about is about
*/

app.use("/wiki", wiki);


/*
     USE 
        app.use(express.static("public")) 
            to serve static files like imagees and css/js files  PUBLIC should be a directory 
    
    you can use it multiple times for multiple directories ie:              app.use(express.static("assets")) 
    to add them with a prefix instead of a base name use:                   app.use("/media", express.static("assets"))
*/


/* HANDLING ERRORS */
// this has to be called after every app.use()!!!!
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send("Something broke!")
})

/* DB */
MongoClient.connect("mongodb://localhost:27017/animals", (err, client) => {
    if (err) throw err;
    
    const db = client.db("animals");

    db.collection("mammals")
        .find()
        .toArray((err, result) => {
            if (err) throw err;
            console.log(result);
            client.close();
        })
})




// LISTEN
app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});

