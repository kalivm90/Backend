const fs = require("fs");

const returnHTML = (filename, response, MIME="text/html") => {
    fs.readFile(filename, (err, data) => {
        if (err) {
            response.writeHead(500, {"Content-Type": "text/plain"});
            return response.end("Internal Server Error")
        }

        response.writeHead(200, {"Content-Type": MIME});
        response.write(data)
        return response.end();
    })
}

module.exports = returnHTML;