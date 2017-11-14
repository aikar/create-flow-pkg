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
        util.checkYarn();
        util.updatePackageJson(cmd === "initlib");
        util.installDevDeps();
        util.cpSkeleton();
        break;
    }
    default:
        console.error("Unknown command: initapp, initlib. You gave:", cmd);
        process.exit(1);
}
