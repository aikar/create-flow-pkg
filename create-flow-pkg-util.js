const execSync = require("child_process").execSync;
const path = require("path");
const cmdExists = require("command-exists").sync;
const escape = require("shell-escape");
const fs = require("fs");

module.exports = {
    installDevDeps,
    checkYarn,
    cpSkeleton,
    updatePackageJson,
    getPkg,
};

function exec(arg, label=arg) {
    const result = execSync(arg).toString();
    result.split("\n").forEach((line) => {
        line = line && line.trim();
        if (!line) {return;}
        console.log('[' + label + '] ' + line);
    });
}

function getPkg() {
    return require(getPkgFile());
}

function getPkgFile() {
    return path.resolve(process.cwd(), "./package.json");
}

function updatePackageJson(isLib = false) {
    let file = getPkgFile();
    const pkg = getPkg();

    pkg.main = isLib ? pkg.name + ".js" : "dist/" + pkg.name + ".js";

    if (!pkg.engines || !pkg.engines.node) {
        pkg.engines = pkg.engines || {};
        pkg.engines.node = ">= 6";
    }

    if (!pkg.scripts) {
        pkg.scripts = {};
    }

    if (!pkg.scripts.build) {
        pkg.scripts.build = "gulp build";
    }

    if (!pkg.scripts.test) {
        pkg.scripts.test = "jest";
    }

    if (!pkg.scripts.lint) {
        pkg.scripts.lint = "gulp lint";
    }

    if (!pkg.scripts.lint) {
        pkg.scripts.lint = "gulp lint";
    }

    if (!pkg.scripts.node) {
        pkg.scripts.node = "cross-env NODE_ENV=development build/devnode.js";
    }

    if (!pkg.scripts.start) {
        pkg.scripts.start = "cross-env NODE_ENV=development build/devnode.js src/" + pkg.name + ".js";
    }

    if (!isLib && !pkg.scripts.prepublishOnly) {
        pkg.scripts.prepublishOnly = "mkdir -p dist/ && touch dist/.npmignore";
    }

    if (isLib && !pkg.scripts.postpack) {
        pkg.scripts.postpack = "build/postpack.sh";
    }

    fs.writeFileSync(file, JSON.stringify(pkg, null, 2));
}

function getDevDeps() {
    return require("./package").devDependencies;
}

function checkYarn() {
    if (!cmdExists("yarn")) {
        console.error("Please install yarn. sudo npm install yarn -g");
        process.exit(1);
    }
}

function installDevDeps() {
    exec("yarn add -D " + Object.entries(getDevDeps()).map(([pkg, ver]) => pkg + "@" + ver).join(" "), "install dev deps");
}
function cpSkeleton() {
    const pkg = getPkg();
    const name = pkg.name;
    const skelDir = path.resolve(__dirname, "skel");
    const files = fs.readdirSync(skelDir);
    for (const file of files) {
        exec(`cp -ar ${escape([path.resolve(skelDir, file), "."])}`, `copying ${file}`);
    }
    exec("mkdir -p .cache ; echo '*' > .cache/.gitignore", "prepare .cache");

    const filejs = name + ".js";
    const targetSrc = path.join("src", filejs);
    if (!fs.existsSync(targetSrc)) {
        fs.renameSync(path.join("src", "skel.js"), targetSrc);
    }
    const targetExample = path.join("example", filejs);
    if (!fs.existsSync(targetExample))  {
        fs.renameSync(path.join("example", "skel.js"), targetExample);
    }
}
