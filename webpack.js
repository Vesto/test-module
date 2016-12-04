var webpack = require("webpack");

webpack(
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
        plugins: [ // Minify the JS code
            // new webpack.optimize.UglifyJsPlugin()
            // new webpack.ProvidePlugin({
            //     quark: "quark"
            // })
        ],
        module: { // Use a module to load TypeScript
            loaders: [
                { test: /\.ts$/, loader: 'ts-loader' }, // Load TS files with ts-loader
                { test: require.resolve("quark"), loader: "expose-loader?quark" } // Export quark with expose-loader
            ]
        }
    }, function(err, stats) {
        var date = new Date();
        var prefix = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + " ";
        if (err) {
            console.log(prefix + "Error:", error);
        } else if (stats.hasErrors()) {
            console.log(prefix + "Stats errors:", stats.errors);
        } else if (stats.hasWarnings()) {
            console.log(prefix + "Stats warnings:", stats.warnings);
        } else {
            console.log(prefix + "Compile complete.")
        }
    }
);
