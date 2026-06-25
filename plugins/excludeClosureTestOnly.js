exports.handlers = {
    beforeParse(e) {
        if(e.source.includes("goog.setTestOnly")) {
            e.source = '';
        }
    }
}
