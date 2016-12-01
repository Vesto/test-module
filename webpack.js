var webpack = require("webpack");

// webpack(
//     {
//         // entry: ["./dist/index.js", "./dist/force_exports.js"], // Load force exports to export quark to the module too
//         entry: {
//             app: "./dist/Delegate.js"
//         },
//         output: {
//             filename: "build2.js",
//             libraryTarget: "umd",
//             library: "test_module"
//         },
//         externals: {
//             "quark": "quark"
//         }
//     }, function() {
//
//     }
// );

webpack(
    {
        entry: {
            app: "./dist/Delegate.js", // Need to be configured
            vendor: ["quark"]
        },
        output: {
            filename: "build.js",
            libraryTarget: "umd",
            library: "test_module" // Need to be configured
        },
        externals: {

        }
    }, function() {
        console.log("Complete.");
    }
);
