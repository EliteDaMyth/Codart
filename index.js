const esprima = require("esprima");
const escodegen = require("escodegen");
const fs = require("fs");
const util = require('util');
const { getCharsTillNextNonSpace, getCharsTillNextSpace, needsSpaceAfter } = require("./helpers");

let code = fs.readFileSync("./index.js").toString();

let parsedCode = esprima.parseModule(code);
let generatedCode = escodegen.generate(parsedCode, { format: { compact: true, semicolons: false } });
let generatedCodeTokens = esprima.tokenize(generatedCode, { loc: true })

let asciiTemplate = fs.readFileSync("./ascii.txt").toString();
let asciiLength = asciiTemplate.split("\n").length
let asciiWidth = asciiTemplate.split("\n")[0].length

const noSpaceKeywords = ["if", "else", "for", "switch", "case", "break", "while", "this"];

let finalCode = "";
let position = 0;

function insert(i) {
    let token = generatedCodeTokens[i]
    console.log(getCharsTillNextSpace(asciiTemplate.slice(position)))
    if (asciiTemplate[position] == "#") {
        let charsTillSpace = getCharsTillNextSpace(asciiTemplate.slice(position))
        if (charsTillSpace > token.value.length) {
            finalCode += token.value;
            position += token.value.length;
            if (needsSpaceAfter(token)) {
                if (charsTillSpace - token.value.length > 0) {
                    finalCode += " "
                }
                position += 1
            }
        } else if (charsTillSpace >= 4) {
            finalCode += "/**/";
            position += 4;
            insert(i)
        } else {
            
        }
    }
}
insert(0)
console.log(finalCode)
/*for (i = 0; i < generatedCodeTokens.length; i++) {
    let token = generatedCodeTokens[i]
    if (token.type == "Keyword" && !noSpaceKeywords.includes(token.value)) {
        finalCode += token.value;
        finalCode += " ";
    } else {
        finalCode += token.value
    }
}
console.log(asciiLength, asciiWidth, asciiTemplate)*/