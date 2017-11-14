# create-flow-pkg
Create a Facebook Flow ready skeleton library or application with Babel

# What this does
This is a skeleton project generator that will populate your new project with babel, eslint, jest, gulp and flow.

This will get you ready to start writing Flow enabled javascript in minutes.

This also sets up some package deployment task to move dist/ down to ./, so your import statements for sub files
do not need dist/ (Only for Libraries)

A script for yarn run node <script> is provided that automatically runs a script with the transpilers such as babel.


# Usage:
In a folder that has already been npm init, create-flow-pkg initlib

# Default node version
Default babel config targets node 6. If you add 
```javascript
  "engines": {
    "node": ">= 8.0.0"
  }
```
To your package.json, it will reduce the amount of transforms and only transform modules to commonjs

A few other transforms are avail