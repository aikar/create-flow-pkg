# create-flow-pkg
Create a Facebook Flow ready skeleton library or application with Babel

## What this does
This is a skeleton project generator that will populate your new project with babel, eslint, jest, gulp and flow.

This will get you ready to start writing Flow enabled javascript in minutes.

This also sets up some package deployment task to move dist/ down to ./, so your import statements for sub files
do not need dist/ (Only for Libraries)

Provides the following `npm run <script>` commands:

  - `npm run node <src/file.js>` - Runs with babel-register to compile on the fly
  - `npm run lint` - Runs eslint/flow checking
  - `npm run start` - Starts main for apps, or example for libraries
  - `npm run example` - Runs example (for libraries)
  - `npm run distexample` - Runs example using the dist/ compiled files (for testing production version)
  - `npm run build` - Runs babel to compile to dist folder for production readyness
  - `npm run test` - Runs Jest to run test suite

## Requirements
Currently only tested in Linux(Ubuntu/Mint) but should work in any POSIX environment,
Windows users, run inside of Git Bash or WSL.

## Install:
```sh
sudo npm i create-flow-pkg -g
```

## Usage:
In a new folder:
```sh
git init
git remote add origin git@github.com:your/repo.git
npm init
# for libraries designed for node only (no browsers)
create-flow-pkg initlib
# for libraries that also support browsers
create-flow-pkg initlib --browser
# for a node only app
create-flow-pkg initapp
```

  - `initlib` for libraries (Used by other libraries or apps),
    - Use `--browser` to activate more transforms 
  - `initapp` for applications (Standalone programs / CLI scripts)
## Requires yarn for now
Currently expects yarn to be installed. Will add interactive setup to choose yarn vs npm later.

```sh
sudo npm i yarn -g
```

## Default node version
Default babel config targets node 6. Edit package.json to change this 
```javascript
  "engines": {
    "node": ">= 8.0.0"
  }
```
If you target 8, it will reduce the amount of transforms and only transform modules to commonjs

A few other transforms are avail

## TODO: 
  - Interactive setup asking to use yarn or npm
  - Upgrade existing install (init commands are destructive, do not use it on existing code base)
