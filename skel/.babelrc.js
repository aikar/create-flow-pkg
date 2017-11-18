const pkg = require("./package.json");
const engines = pkg.engines;
const semver = require("semver");
let minNode = 6;
const isBrowser = pkg.browser;

// If supporting browsers, very unlikely to also want to target node 8
if (!isBrowser && engines && engines.node) {
    if (semver.satisfies("8.0.0", engines.node) && !semver.satisfies("6.0.0", engines.node)) {
        minNode = 8;
    }
}
const targets = {
  node: minNode,
};

const browsers = [
  ">1%",
  "last 2 versions",
  "Firefox ESR",
  "ie 11",
  "not ie < 11" // I really hope you don't allow this masochistic situation in your life
];


if (isBrowser) {
  targets.browsers = browsers;
}

module.exports = {
    babelrc: false,
    presets: [
        ["env", {
            loose: true,
            modules: "commonjs",
            useBuiltIns: "entry",
            include: [],
            exclude: minNode >= 8  && !!isBrowser ? ["transform-async-to-generator", "transform-regenerator"] : [],
            targets: targets,
            uglify: !global.isDevNode && !!isBrowser
        }],
    ],
    plugins: [
        "transform-flow-strip-types",
        "transform-export-extensions",
        "syntax-dynamic-import",
        "transform-class-properties",
        "transform-object-rest-spread",
        "syntax-trailing-function-commas",
        "transform-exponentiation-operator",
    ]
};
