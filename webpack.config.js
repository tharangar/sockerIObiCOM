module.exports = {

    entry: "./app/index.tsx",

    output: {

        filename: "bundle.js",

        path: __dirname + "/public/js"

    },

    devtool: "source-map",

    resolve: {

        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]

    },

  
     module: {
        rules: [
           { test: /\.css$/, use: 'css-loader' },
           { test: /\.tsx?$/, loader: "ts-loader" },
           { test: /\.ts$/, use: 'ts-loader' }
         ]
     }


};
