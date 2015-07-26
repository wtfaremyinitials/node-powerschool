var crypto = require('crypto');

var md5 = function(val) {
    var m = crypto.createHash('md5');
    m.update(val);
    return m.digest('hex');
};

var ha1 = function() {
    return md5('pearson:Protected:m0bApP5');
};

var ha2 = function(method, uri) {
    return md5(method + ':' + uri);
};

var response = function(nonce, cnonce, method, uri) {
    return md5(ha1() + ':' + nonce + ':' + '00000001' + ':' + cnonce + ':' + 'auth' + ':' + ha2(method, uri));
};

module.exports = function(nonce, method, uri) {
	var cnonce = md5(Math.random()+'');
    return {
        response: response(nonce, cnonce, method, uri),
        cnonce: cnonce
    };
};