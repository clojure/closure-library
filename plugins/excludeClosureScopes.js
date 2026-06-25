exports.handlers = {
    beforeParse(e) {
        if(e.source.includes("goog.scope")) {
            e.source = '';
        }
    }
}
