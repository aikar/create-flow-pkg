const cp = require("child_process");
const execSync = cp.execSync;
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

function updatePackageJson(isLib = false, isBrowser = false) {
    let file = getPkgFile();
    const pkg = getPkg();
    const filename = pkg.name + ".js";

    pkg.main = isLib ? filename : "dist/" + filename;

    if (!pkg.engines || !pkg.engines.node) {
        pkg.engines = pkg.engines || {};
        pkg.engines.node = ">= 6";
    }

    pkg.browser = isBrowser;

    if (!pkg.scripts) {
        pkg.scripts = {};
    }

    pkg.scripts.build = "gulp build";
    pkg.scripts.test = "jest";

    pkg.files = [
        "dist", "LICENSE", "README.md"
    ];

    pkg.scripts.lint = "gulp validate";
    pkg.scripts.validate = "gulp validate";
    pkg.scripts.node = "cross-env NODE_ENV=development build/devnode.js";
    pkg.scripts.prepack = "npm run build";

    if (isLib) {
        pkg.scripts.start = "npm run test";
        pkg.scripts.postpack = "build/postpack.sh";
    } else {
        pkg.scripts.start = "cross-env NODE_ENV=development build/devnode.js src/" + filename;

    }
    pkg.scripts.example = "cross-env NODE_ENV=development build/devnode.js example/" + filename;
    pkg.scripts.distexample = "npm run build && cross-env NODE_ENV=development build/devnode.js example/" + filename + " --use-dist";

    pkg.scripts.prepublishOnly = "mkdir -p dist/ && touch dist/.npmignore";


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
    cp.execSync("yarn add -D " + Object.entries(getDevDeps()).map(([pkg, ver]) => pkg + "@" + ver).join(" "), {stdio:[0,1,2]});
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
    // write index.js stub
    fs.writeFileSync(path.join("src", "index.js"), `module.exports = require("./"${filejs});\n`);
}
