const webpack = require("webpack");
const path = require("path");

module.exports = {
    entry: "/util/util.js",
    output: {
        filename: "util.min.js",
        path: __dirname +"/lib"
    },
    devtool: "cheap-source-map"
};
