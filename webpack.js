var webpack = require("webpack");

var compiler = webpack( // TODO: Somehow force include `quark`. It doesn't include it at all if not used.
    {
        entry: './src/Delegate.ts',
        output: { // Output to a bundle using UMD
            libraryTarget: "umd",
            library: "app",
            filename: 'bundle.js'
        },
        devtool: 'source-map', // Generate sourcemaps
        resolve: { // Extend module resolutions to include more file types
            extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
        },
        externals: {
            "quark-native": "quark-native" // Use this because Quark exposes QK objects to `quark-native` object
        },
        plugins: [ // Minify the JS code
            // new webpack.optimize.UglifyJsPlugin()
        ],
        module: { // Use a module to load TypeScript
            loaders: [
                { test: /\.ts$/, loader: 'ts-loader' }, // Load TS files with ts-loader
                { test: require.resolve("quark"), loader: "expose-loader?quark" }, // Export quark with expose-loader
            ]
        }
    }
);

new webpack.Compiler.Watching(compiler, undefined, function(err, stats) {
    var date = new Date();
    var prefix = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + " ";
    if (err) {
        console.log(prefix + "Error:", err);
    } else if (stats.hasErrors()) {
        console.log(prefix + "Stats errors:", stats.compilation.errors);
    } else if (stats.hasWarnings()) {
        console.log(prefix + "Stats warnings:", stats.compilation.errors);
    } else {
        console.log(prefix + "Compile complete.")
    }
});

