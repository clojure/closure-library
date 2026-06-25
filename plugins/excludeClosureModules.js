exports.handlers = {
    beforeParse(e) {
        if(e.source.includes("goog.module")) {
            e.source = '';
        }
    }
}
