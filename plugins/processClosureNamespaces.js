const path = require("path");
const fileToNamespace = {};
const moduleRegex = /goog\.module\(\'([\w.]+)\'\)/;
const provideRegex = /goog\.provide\(\'([\w.]+)\'\)/;

function isTopLevel(doclet) {
    if(!doclet.name) return false;
    switch(doclet.kind) {
    case "function":
    case "class":
        return true;
    default:
        return false;
    }
}

exports.handlers = {
    beforeParse(e) {
        let match = null;

        if(match = moduleRegex.exec(e.source) || provideRegex.exec(e.source)) {
            let ns = match[1];
            e.source += "\n/** @namespace " + ns + " */\n"
            fileToNamespace[path.basename(e.filename)] = ns;
        }
    },

    newDoclet(e) {
        let doclet = e.doclet,
            ns     = fileToNamespace[doclet.meta.filename];

        if(isTopLevel(doclet)) {
            doclet.memberof = ns;
        }
    }
}
