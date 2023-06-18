http://192.168.1.89:3000

const express = require("express");
const app = express();

const path = require("path");
const port = 8080


const pagesPath = path.join(__dirname, "pages/");
const assetsPath = path.join(__dirname, "assets/styles");
const imagesPath = path.join(__dirname, "assets/images")

const logger = (req, res, next) => {
    console.log(`Path: ${req.url}, Method: ${req.method}, Code: ${res.statusCode}`)

    console.log(assetsPath)
    next();
}


app.use(logger)
app.use(express.static(assetsPath));
app.use(express.static(imagesPath));

app.get("/", (req, res) => {
    res.sendFile(pagesPath + "index.html"); 
})
app.get("/about", (req, res) => {
    res.sendFile(pagesPath + "about.html")
})
app.get("/contact-me", (req, res) => {
    res.sendFile(pagesPath + "contact-me.html")
})


app.use((req, res) => {
    res.status(404).sendFile(pagesPath + "404.html")
})
// Error handling middleware for all errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    const statusCode = err.status || 500;
    res.status(statusCode).sendFile(pagesPath + "error.html");
  });



app.listen(port, () => {
    console.log(`App running on port: ${port}`)
})






// const http = require("http");
// const url = require('url');
// const returnHTML = require("./modules/helpers");

// http.createServer((req, res) => {
//     const path = url.parse(req.url)

//     switch(path.pathname) {
//         case "/":
//             returnHTML("pages/index.html", res);
//             break;
//         case "/about":
//             returnHTML("pages/about.html", res);
//             break;
//         case "/contact-me":
//             returnHTML("pages/contact-me.html", res);
//             break;
//         // for css file
//         case "/assets/styles.css":
//             returnHTML("assets/styles.css", res, "text/css"); // Set the correct MIME type for CSS
//             break;
//         default:
//             returnHTML("pages/404.html", res);
//             break;
//     }
// }).listen(8080)
