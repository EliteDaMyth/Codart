const esprima = require("esprima");
const escodegen = require("escodegen");
const fs = require("fs");
const util = require('util');

let code = fs.readFileSync("./index.js").toString();

let parsedCode = esprima.parseModule(code);
let generatedCode = escodegen.generate(parsedCode, { format: { compact: true, semicolons: false } });
let generatedCodeTokens = esprima.tokenize(generatedCode, { loc: true })

//console.log(util.inspect(generatedCodeTokens, false, 100, true))
console.log(generatedCode)

const noSpaceKeywords = ["if", "else", "for", "switch", "case", "break", "while", "this"];
let b = "";
for (i = 0; i < generatedCodeTokens.length; i++) {
    let token = generatedCodeTokens[i]
    if (token.type == "Keyword" && !noSpaceKeywords.includes(token.value)) {
        b += token.value;
        b += " ";
    } else {
        b += token.value
    }
}
console.log(b)