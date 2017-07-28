var express = require('express');
var app = express();
var renderer = require('./renderer');

app.get(/^\/pages(.*)\.html$/, function(req, res) {
    var html = renderer.page(req.path, {
        url: req.path
    });
    res.end(html);
});

var server = app.listen(3000, function() {
    console.log('Listening on port 3000');
});
