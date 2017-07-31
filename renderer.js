var swig = require('swig-templates'),

    templateDir = './templates',
    dataDir = './templates/data';

swig.setDefaults({
	cache: false
});

module.exports = {
    page: function(url, data) {
        var tmpl;

        tmpl = templateDir + url;

        // Fetch data if present
        try {
            // Look for data file of the same filepath as URL, just in the data folder
            data.page = require(dataDir + url.replace(/\.html$/, '.json'));
        } catch(e) {
            // If no data file, pass an empty object
            data.page = {};
        }
        return swig.compileFile(tmpl)(data);
    }
}
