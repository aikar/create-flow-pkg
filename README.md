# create-flow-pkg
Create a Facebook Flow ready skeleton library or application with Babel

## What this does
This is a skeleton project generator that will populate your new project with babel, eslint, jest, gulp and flow.

This will get you ready to start writing Flow enabled javascript in minutes.

This also sets up some package deployment task to move dist/ down to ./, so your import statements for sub files
do not need dist/ (Only for Libraries)

A script for `yarn run node <script>` is provided that automatically runs a script with the transpilers such as babel.
## Install:
```sh
sudo npm i create-react-pkg -g
```

## Usage:
In a new folder:
```sh
git init
git remote add origin git@github.com:your/repo.git
npm init
create-flow-pkg initlib
# or 
create-flow-pkg initapp
```

  - `initlib` for libraries (Used by other libraries or apps), 
  - `initapp` for applications (Standalone programs / CLI scripts)
## Requires yarn for now
Currently expects yarn to be installed. Will add interactive setup to choose yarn vs npm later.

```sh
sudp npm i yarn -g
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
  - Browser ready configs (eslint, babel)
  - Upgrade existing install (init commands are destructive, do not use it on existing code base)
