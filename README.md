# create-flow-pkg
Create a Facebook Flow ready skeleton library or application with Babel

## What this does
This is a skeleton project generator that will populate your new project with babel, eslint, jest, gulp and flow.

This will get you ready to start writing Flow enabled javascript in minutes.

This also sets up some package deployment task to move dist/ down to ./, so your import statements for sub files
do not need dist/ (Only for Libraries)

A script for `yarn run node <script>` is provided that automatically runs a script with the transpilers such as babel.


## Usage:
In a new folder:
```bash
git init
git remote add origin git@github.com:your/repo.git
npm init
create-flow-pkg initlib
# or 
create-flow-pkg initapp
```

  - `initlib` for libraries (Used by other libraries or apps), 
  - `initapp` for applications (Standalone programs / CLI scripts)

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
  - Browser ready configs (eslint, babel)
