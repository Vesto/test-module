var browserify = require("browserify");
var tsify = require("tsify");
var fs = require("fs");

const buildFile = fs.createWriteStream("build.js");

browserify({
    standalone: "test_module", // Enable access in global scope
    debug: true // Enable sourcemap
})
    .add("src/Delegate.ts") // Compile this file
    .plugin(tsify) // Use TypeScript
    .bundle() // Create the bundle
    .on("error", function (error) { console.error(error.toString()); }) // Catch error
    .pipe(buildFile); // Write to a file
