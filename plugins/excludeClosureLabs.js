exports.handlers = {
    beforeParse(e) {
        if(e.source.includes("goog.labs")) {
            e.source = '';
        }
    }
}
