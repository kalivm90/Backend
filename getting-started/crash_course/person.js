// Module wrappers
// (function (exports, require, module, __filename, __dirname) {

// })

console.log(`dirname: ${__dirname},  filename: ${__filename}`);

class Person {
    constructor(name, age) {
        this.name = name 
        this.age = age
    }

    greeting() {
        console.log(`Hello ${this.name}, ${this.age}`)
    }
}

const person = {
    name: "Jill",
    age: 30,
}

module.exports = Person