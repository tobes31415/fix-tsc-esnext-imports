const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
if (args.length !== 1) {
    console.error("You must specify the directory to be fixed");
    return;
}

function buildFilesMap(dir, map) {
    if (!map) {
        map = {};
    }
    fs.readdirSync(dir).forEach(file => {
        const resolvedFile = path.join(dir, file);
        if (fs.statSync(resolvedFile).isDirectory()) {
            buildFilesMap(resolvedFile, map);
        } else {
            map[resolvedFile] = {
                dir, file, resolvedFile
            };
        }
    })
    return map;
}

const importMatch = /(export|import)(.*['|"])(\.+\/[^\.]*)(['|"].*)/;

function fixImports(allFiles, fileInfo) {
    const contents = fs.readFileSync(fileInfo.resolvedFile).toString().split('\n');
    const newContents = contents.map((line, index) => {
        const match = importMatch.exec(line);
        if (match) {
            const possibleFile = path.join(fileInfo.dir, match[3]) + ".js";
            let newLine;
            if (allFiles[possibleFile]) { 
                newLine = match[1] + match[2] + match[3] + ".js" + match[4];
            } else {
                newLine = match[1] + match[2] + match[3] + "/index.js" + match[4];
            }
            console.log(fileInfo.file);
            console.log(line);
            console.log(newLine);
            console.log("");
            return newLine;
        } else {
            return line;
        }
    }).join("\n");
    fs.writeFileSync(fileInfo.resolvedFile, newContents);
}

const root = path.join(process.cwd(), args[0]);
const map = buildFilesMap(root);
const allFiles = Object.values(map);
const allJsFiles = allFiles.filter(fileInfo => fileInfo.file.endsWith(".js"))
allJsFiles.forEach(fixImports.bind(null, map));

console.log("Done");