const path = require("path");
const legacyNamespaces = {};
const moduleRegex = /goog\.module\(\'([\w.]+)\'\)/;

function isDefinition(doclet) {
    if(!doclet.name) return false;
    switch(doclet.kind) {
    case "function":
    case "class":
    case "method":
        return true;
    default:
        return false;
    }
}

exports.handlers = {
    beforeParse(e) {
        let match = null;

        if(match = moduleRegex.exec(e.source)) {
            if(e.source.includes("goog.module.declareLegacyNamespace()")) {
                legacyNamespaces[path.basename(e.filename)] = {provides: match[1]};
            }
        }
    },

    newDoclet(e) {
        let doclet = e.doclet,
            nsInfo = legacyNamespaces[doclet.meta.filename];

        if(null == nsInfo) return;

        if(isDefinition(doclet)) {
            doclet.longname = nsInfo.provides + "." + doclet.name;
        }
    }
}
