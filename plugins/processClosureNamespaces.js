const path = require("path");
const moduleRegex = /goog\.module\(\'([\w.]+)\'\)/;
const provideRegex = /goog\.provide\(\'([\w.]+)\'\)/;

exports.handlers = {
    beforeParse(e) {
        let match = null;

        if(match = moduleRegex.exec(e.source) || provideRegex.exec(e.source)) {
            let ns = match[1];
            e.source += "\n/** @namespace " + ns + " */\n"
        }
    }
}
