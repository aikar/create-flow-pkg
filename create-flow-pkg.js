#!/usr/bin/env node

const util = require("./create-flow-pkg-util");
const cmd = process.argv[2];
let name = process.argv[3];

if (!name) {
    try {
        name = util.getPkg().name;
    } catch (e) {
        console.error(e);
        console.error("Please create package.json or specify lib/app name after " + cmd);
        process.exit(1);
        return;
    }
}

switch (cmd) {
    case "initlib":
    case "initapp": {
        console.log("Checking for yarn");
        util.checkYarn();
        const isLib = cmd === "initlib";
        console.log("Updating package.json");
        util.updatePackageJson(isLib, isLib && process.argv.indexOf("--browser") !== -1);
        console.log("Installing Dev Deps");
        util.installDevDeps();
        console.log("Copying Skeleton Files");
        util.cpSkeleton();
        console.log("Done!");
        break;
    }
    default:
        console.error("Unknown command: initapp, initlib. You gave:", cmd);
        process.exit(1);
}
