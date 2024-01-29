const jsdom = require('jsdom');
const {JSDOM} = jsdom;
const {document} = (new JSDOM('<!doctype html><html><body></body></html>')).window;
global.document = document;
const window = document.defaultView;
const $ = require('jquery')(window);
const crypto = require('crypto');
var args = process.argv.splice(2);
// var urlencode = require('urlencode');
(function($) {
	$.base64 = (function($) {
    var _PADCHAR = "="
      , _ALPHA = "LVoJPiCN2R8G90yg+hmFHuacZ1OWMnrsSTXkYpUq/3dlbfKwv6xztjI7DeBE45QA"
      , _VERSION = "1.0";
    function _getbyte64(s, i) {
        var idx = _ALPHA.indexOf(s.charAt(i));
        if (idx === -1) {
            throw "Cannot decode base64"
        }
        return idx
    }
    function _setAlpha(s) {
        _ALPHA = s;
    }
    function _decode(s) {
        var pads = 0, i, b10, imax = s.length, x = [];
        s = String(s);
        if (imax === 0) {
            return s
        }
        if (imax % 4 !== 0) {
            throw "Cannot decode base64"
        }
        if (s.charAt(imax - 1) === _PADCHAR) {
            pads = 1;
            if (s.charAt(imax - 2) === _PADCHAR) {
                pads = 2
            }
            imax -= 4
        }
        for (i = 0; i < imax; i += 4) {
            b10 = (_getbyte64(s, i) << 18) | (_getbyte64(s, i + 1) << 12) | (_getbyte64(s, i + 2) << 6) | _getbyte64(s, i + 3);
            x.push(String.fromCharCode(b10 >> 16, (b10 >> 8) & 255, b10 & 255))
        }
        switch (pads) {
        case 1:
            b10 = (_getbyte64(s, i) << 18) | (_getbyte64(s, i + 1) << 12) | (_getbyte64(s, i + 2) << 6);
            x.push(String.fromCharCode(b10 >> 16, (b10 >> 8) & 255));
            break;
        case 2:
            b10 = (_getbyte64(s, i) << 18) | (_getbyte64(s, i + 1) << 12);
            x.push(String.fromCharCode(b10 >> 16));
            break
        }
        return x.join("")
    }
    function _getbyte(s, i) {
        var x = s.charCodeAt(i);
        if (x > 255) {
            throw "INVALID_CHARACTER_ERR: DOM Exception 5"
        }
        return x
    }
    function _encode(s) {
        if (arguments.length !== 1) {
            throw "SyntaxError: exactly one argument required"
        }
        s = String(s);
        var i, b10, x = [], imax = s.length - s.length % 3;
        if (s.length === 0) {
            return s
        }
        for (i = 0; i < imax; i += 3) {
            b10 = (_getbyte(s, i) << 16) | (_getbyte(s, i + 1) << 8) | _getbyte(s, i + 2);
            x.push(_ALPHA.charAt(b10 >> 18));
            x.push(_ALPHA.charAt((b10 >> 12) & 63));
            x.push(_ALPHA.charAt((b10 >> 6) & 63));
            x.push(_ALPHA.charAt(b10 & 63))
        }
        switch (s.length - imax) {
        case 1:
            b10 = _getbyte(s, i) << 16;
            x.push(_ALPHA.charAt(b10 >> 18) + _ALPHA.charAt((b10 >> 12) & 63) + _PADCHAR + _PADCHAR);
            break;
        case 2:
            b10 = (_getbyte(s, i) << 16) | (_getbyte(s, i + 1) << 8);
            x.push(_ALPHA.charAt(b10 >> 18) + _ALPHA.charAt((b10 >> 12) & 63) + _ALPHA.charAt((b10 >> 6) & 63) + _PADCHAR);
            break
        }
        return x.join("")
    }
    return {
        decode: _decode,
        encode: _encode,
        setAlpha: _setAlpha,
        VERSION: _VERSION
    }
}($));
var enc = "s" + "run" + "_bx1", n = 200, type = 1;
var token=args[0],
username=args[1],
password=args[2],
ip=args[3],
ac_id="1";
// console.log(json({
//     username: username,
//     password: password,
//     ip: ip,
//     acid: ac_id,
//     enc_ver: enc
// }));
i = info({
    username: username,
    password: password,
    ip: ip,
    acid: ac_id,
    enc_ver: enc
}, token),
hmd5 = pwd(password, token);
var chkstr = token + username;
chkstr += token + hmd5;
chkstr += token + ac_id;
chkstr += token + ip;
chkstr += token + n;
chkstr += token + type;
chkstr += token + i;
var os = {device : "Windows+10",platform:"Windows"};
var params = {
    action: "login",
    username: username,
    password: "{MD5}" + hmd5,
    ac_id: ac_id,
    ip: ip,
    chksum: chksum(chkstr),
    info: i,
    n: n,
    type: type,
    os: os.device,
    name: os.platform,
    double_stack: "0",
    _:Date.now()
};
params.info=encodeURIComponent(params.info);
params.username=encodeURIComponent(params.username);
params.password=encodeURIComponent(params.password);
params.chksum=encodeURIComponent(params.chksum);
console.log(JSON.stringify(params));
// var djhlogin = function(response)
// {console.log(response);}
// $.get("http://aaa.uestc.edu.cn" + "/cgi-bin/srun_portal", params, function(data){
// console.log("Data: " + data)})
// console.log(JSON.stringify(params))
    function xEncode(str, key) {
        if (str == "") {
            return "";
        }
        var v = s(str, true),
            k = s(key, false);
        if (k.length < 4) {
            k.length = 4;
        }
        var n = v.length - 1,
            z = v[n],
            y = v[0],
            c = 0x86014019 | 0x183639A0,
            m,
            e,
            p,
            q = Math.floor(6 + 52 / (n + 1)),
            d = 0;
        while (0 < q--) {
            d = d + c & (0x8CE0D9BF | 0x731F2640);
            e = d >>> 2 & 3;
            for (p = 0; p < n; p++) {
                y = v[p + 1];
                m = z >>> 5 ^ y << 2;
                m += (y >>> 3 ^ z << 4) ^ (d ^ y);
                m += k[(p & 3) ^ e] ^ z;
                z = v[p] = v[p] + m & (0xEFB8D130 | 0x10472ECF);
            }
            y = v[0];
            m = z >>> 5 ^ y << 2;
            m += (y >>> 3 ^ z << 4) ^ (d ^ y);
            m += k[(p & 3) ^ e] ^ z;
            z = v[n] = v[n] + m & (0xBB390742 | 0x44C6F8BD);
        }
        return l(v, false);
    }

    function s(a, b) {
        var c = a.length, v = [];
        for (var i = 0; i < c; i += 4) {
            v[i >> 2] = a.charCodeAt(i) | a.charCodeAt(i + 1) << 8 | a.charCodeAt(i + 2) << 16 | a.charCodeAt(i + 3) << 24;
        }
        if (b) {
            v[v.length] = c;
        }
        return v;
    }

    function l(a, b) {
        var d = a.length, c = (d - 1) << 2;
        if (b) {
            var m = a[d - 1];
            if ((m < c - 3) || (m > c))
                return null;
            c = m;
        }
        for (var i = 0; i < d; i++) {
            a[i] = String.fromCharCode(a[i] & 0xff, a[i] >>> 8 & 0xff, a[i] >>> 16 & 0xff, a[i] >>> 24 & 0xff);
        }
        if (b) {
            return a.join('').substring(0, c);
        } else {
            return a.join('');
        }
    }
    /*
    function getChallenge(url, data, callback) {
        return $.get(url + "/cgi-bin/get_challenge", data, callback, "jsonp");
    }
	*/
    function json(d) {
        return JSON.stringify(d);
    }

    function info(d, k) {
    	// var buff = xEncode(json(d), k);
        // return "{SRBX1}" +  buff.toString('base64');
        return "{SRBX1}" + $.base64.encode(xEncode(json(d), k));
    }

    function pwd(d, k) {
        return md5(d, k);
    }

	/**
	 * Returns an MD5 hash for the given `content`.
	 *
	 * @param {String} content
	 *
	 * @returns {String}
	 */
	function md5(content,token) {  
	  return crypto.createHmac('md5',token).update(content).digest('hex')
	}
    function chksum(d) {
        return sha1(d);
    }
    function sha1(content) {  
	  return crypto.createHash('sha1').update(content).digest('hex')
	}

    /*
     * SRUN Portal Auth CGI
     */
     /*
    function srunPortal(url, data, callback) {
        return $.get(url + "/cgi-bin/srun_portal", data, callback, "jsonp");
    }
    function formatError(error) {
    var str = "";
    str = error.replace(/(_|, | |^)\S/g, function (s) {
        s = s.replace(/(_|, | )/, "");
        return s.toUpperCase();
    });
    return str.replace(/\./g, "");
}
*/
/*
 * GET Error
 */
 /*
function error(code, error, msg) {
    if (typeof(code) == "number" || code == "") {
        if (typeof msg != "undefined" && msg != "") {
            return formatError(msg); //Format Error
        }
        return formatError(error); //Format Error
    }
    if (code == "E2901") {
        return msg;
    }
    return code;
}
*/
})($);