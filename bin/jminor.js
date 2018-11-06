const util = require("util");
const ts = require("typescript");
const fs = require("fs");

const args = process.argv.slice(2);

const source = fs.readFileSync(args[0], { encoding: "utf-8" });

const file = ts.createSourceFile("temp.ts", source, ts.ScriptTarget.Latest);

const entries = [];

const node = file.statements.find((node) => {
    return (node.name && node.name.escapedText === args[1]);
});

function addEntry(entry) {
    if (!~entries.indexOf(entry)) {
        entries.push(entry);
    }
}

function extractMembers(members = []) {
    members.map((member) => {
        if (ts.isIdentifier(member.name)) {
            addEntry(member.name.escapedText);
            extractMembers(member.type.members);
        }

        if (member.type.typeName) {
            console.log(member.type)
        }
    });
}

if (node) {
    // console.log(util.inspect(node.members, false, null));

    extractMembers(node.members);
}

console.log(entries);