const noSpaceKeywords = ["if", "else", "for", "switch", "case", "break", "while", "this"];

function getCharsTillNextSpace(text) {
    let count = 0;
    for (character of text) {
        if (character != " " && character != "\n") {
            count++
        } else {
            return count;
        }
    }
}

function getCharsTillNextNonSpace(text) {
    let count = 0;
    for (character of text) {
        if (character == "") {
            count++
        } else {
            return count;
        }
    }
}

function needsSpaceAfter(token) {
    return token.type == "Keyword" && !noSpaceKeywords.includes(token.value)
}

module.exports = {
    getCharsTillNextSpace,
    getCharsTillNextNonSpace,
    needsSpaceAfter
}