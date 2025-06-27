#!/usr/bin/env node
const path = require('path');
const fs = require('fs');

// This is the entry point for the command-line tool.
// It resolves the path to the main server logic to ensure it works correctly
// when installed globally or linked.

// Find the project root by looking for package.json
function findProjectRoot(startDir) {
    let dir = startDir;
    while (dir !== path.parse(dir).root) {
        if (fs.existsSync(path.join(dir, 'package.json'))) {
            return dir;
        }
        dir = path.dirname(dir);
    }
    throw new Error('Could not find project root with package.json');
}

try {
    const projectRoot = findProjectRoot(__dirname);
    const pkg = require(path.join(projectRoot, 'package.json'));
    const mainFile = pkg.main;

    if (!mainFile) {
        throw new Error('`main` field not specified in package.json');
    }

    require(path.join(projectRoot, mainFile));

} catch (e) {
    console.error("Failed to start the server:", e);
    process.exit(1);
} 