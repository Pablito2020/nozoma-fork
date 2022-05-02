/* eslint-disable @typescript-eslint/no-var-requires,no-undef */

const path = require("path");
const fs = require("fs");
const yaml = require("js-yaml");
// const { BannerPlugin } = require('webpack'),

/**
 * Dynamically retrieve functions to buble from the template.yml file
 */

getEntries = () => {
    const schema = yaml.DEFAULT_SCHEMA.extend([
            new yaml.Type("!Ref", { kind: "scalar" }),
            new yaml.Type("!GetAtt", { kind: "scalar" }),
            new yaml.Type("!Join", { kind: "sequence" }),
            new yaml.Type("!If", { kind: "sequence" }),
            new yaml.Type("!Or", { kind: "sequence" }),
            new yaml.Type("!Equals", { kind: "sequence" }),
            new yaml.Type("!Sub", { kind: "scalar" }),
            new yaml.Type("!Not", { kind: "sequence" })
        ]),
        samFile = fs.readFileSync("./template.yaml", "utf8"),
        samConfig = yaml.load(samFile, { schema });
    return Object.keys(samConfig.Resources)
        .reduce((prev, next) => {
            const resource = samConfig.Resources[next];
            if (resource.Type === "AWS::Serverless::Function") {
                const functionName = resource.Properties.Handler.replace(".handler", ""),
                    handlerPath = "lambda/" + functionName + "/handler.ts";
                prev[functionName] = path.join(__dirname, handlerPath);
                console.info("Lambda name: " + functionName + ".js");
            }
            return prev;
        }, {});
};

module.exports = {
    mode: process.env.CI ? "production" : "development",
    devtool: process.env.CI ? "source-map" : "inline-source-map",
    cache: {
        type: "filesystem"
    },
    externals: [
        {
            "aws-sdk": "aws-sdk",
            "datadog-lambda-js": "datadog-lambda-js",
            "dd-trace": "dd-trace"
        }
    ],
    entry: getEntries(),
    resolve: {
        extensions: [".ts", ".js"],
        modules: ["node_modules"],
        symlinks: false,
        cacheWithContext: false,
        alias: {
            "@shared": path.resolve(__dirname, "../../../contexts/shared"),
            "@backoffice-contexts": path.resolve(__dirname, "../../../contexts/backoffice")
        }
    },
    target: "node",
    output: {
        libraryTarget: "commonjs2",
        path: path.join(__dirname, ".dist/webpack"),
        filename: "[name].js",
        devtoolModuleFilenameTemplate: "[absolute-resource-path]"
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                loader: "ts-loader",
                exclude: [/node_modules/],
                options: {
                    transpileOnly: true,
                    configFile: "tsconfig.webpack.json"
                }
            }
        ]
    }
};
