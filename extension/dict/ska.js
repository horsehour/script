// EZ NEM MINDIG KELL, LE KELLENE VIZSGÁLNI VAN-E MÁR
(function($) {
    $.html_tag_remover = function(theTarget, theString) {
        var s = $("<div/>").append($(theTarget, wrap_div(theString)).remove().end()).html();
        return $(s).html();
    };
})(jQuery);

//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////

function wrap_div(html) {
    return '<div id=wrap_div_id>' + html + "</div>";
}

//str = html_tag_remove("<div>ez <a>egy</a> string</div>","a"); --> str =  "<div>ez  string</div>"
function html_tag_remove(strhtml, strtag) {
    if (strtag) {
        igaz = 1;
        while (igaz) {
            kif = new RegExp('<' + strtag, 'i');
            out = strhtml.match(kif);
            if (out) {
                posele = strhtml.indexOf(out);
            } else {
                posele = -1;
            }
            kif = new RegExp('</' + strtag + '>', 'i');
            out = strhtml.match(kif);
            if (out) {
                posveg = strhtml.indexOf(out);
            } else {
                posveg = -1;
            }
            if (posele >= 0 && posveg >= 0 && posveg > posele) {
                strhtml = strhtml.substring(0, posele) + strhtml.substring(posveg + 3 + strtag.length);
            } else {
                igaz = 0;
            }
        }
        return strhtml;
    }
}

//str = html_singletag_remove("<div>ez<img src='cucc.jpg' />string</div>","a"); --> str =  "<div>ezstring</div>"
function html_singletag_remove(strhtml, strtag) {
    if (strtag) {
        igaz = 1;
        while (igaz) {
            kif = new RegExp('<' + strtag, 'i');
            out = strhtml.match(kif);
            if (out) {
                posele = strhtml.indexOf(out);
            } else {
                posele = -1;
            }
            kif = new RegExp('>', 'i');
            out = strhtml.match(kif);
            if (out) {
                posveg = strhtml.indexOf(out, posele);
            } else {
                posveg = -1;
            }
            if (posele >= 0 && posveg >= 0 && posveg > posele) {
                strhtml = strhtml.substring(0, posele) + strhtml.substring(posveg + 1);
            } else {
                igaz = 0;
            }
        }
        return strhtml;
    }
}

// //////////////////////////////////////////////////////////////////
// var theString = "A string <span>with a span in it</span><b>ujj</b><span
// id='kk'>jj</span>";
// var theResult = $.html_tag_remover("#kkk", theString);
// alert(theResult);
// //////////////////////////////////////////////////////////////////

// str = "minta szöveg";
// kif = /mi(n)t/i;
// out=str.match(kif);
// out is an array: [mint,n]

// hol = "saska".indexOf('ko'); --> -1 position of substring
// hol = "saska".indexOf('ka'); --> 3

// str="saska".substring(0,2)); --> sa substring(from,to-1)!!!

/*
 hol = strpos(miben, mit);
 hol = strpos(miben, mit, start);
 */
function strpos(miben, mit, start) {
    if (start == undefined) {
        start = 0;
    }
    if (start < 0) {
        start = 0;
    }
    if (length(miben) != 0 && length(mit) != 0 && start < length(miben)) {
        return miben.indexOf(mit, start);
    } else {
        return -1;
    }
}

/*
 str = substr(str, start);
 str = substr(str, start, end);
 */
function substr(miben, start, end) {
    if (length(miben) == 0) {
        return "";
    }
    if (start < 0) {
        start = 0;
    }
    if (end == undefined) {
        end = length(miben) - 1;
    }
    if (start >= length(miben) || end < start) {
        return "";
    }
    if (end > length(miben) - 1) {
        end = length(miben) - 1;
    }
    return miben.substring(start, end + 1);
}

// //////////////////////////////////////////////////////////////////
// milett = miben.replace(mit,mire); csak az elsot csereli le!!!
// //////////////////////////////////////////////////////////////////
// replaceAll("sas sas  sas", "\\s+", ",")  --> "sas,sas,sas"
// Don't forget escape!! "eagle(sas)" --> "eagle\\\(sas\\\)"
function replaceAll(inWhat, what, toWhat) {
    if (inWhat) {
        return inWhat.replace(new RegExp(what, 'g'), toWhat);
    } else {
        return inWhat;
    }
}

// //////////////////////////////////////////////////////////////////
// array1 = ['alma','körte','szilva'];
// array2 = array1.slice(); // array2 = array1
// var array3 = array_delete(array1,'end'); // array3 = ['alma','körte']
// var array3 = array_delete(array1,1); // array3 = ['alma','szilva']
// //////////////////////////////////////////////////////////////////
function array_delete(miben_array, index) {
    if (index == 'end') {
        var index = miben_array.length - 1;
    }
    var out = miben_array.slice();
    out.splice(index);
    return out;
}

// //////////////////////////////////////////////////////////////////
// array1 = [1,2,3,4];
// array2 = ["alma","korte"];
// uj=array_merge(array1,array2,1); // uj = [1,"alma","korte",2,3,4]
// //////////////////////////////////////////////////////////////////
function array_merge(array1, array2, hova) {
    if (hova == 'end') {
        var hova = array1.length;
    }
    var out = array1.slice();
    if (array2.length < 1) {
        return out;
    }
    out.splice(hova, 0, array2);
    return out;
}

// kitöröl egy elemet egy array-ből index alapján
//arr = ["alma","korte","szilva"];
//index = 1;
//arr.splice(index,1);
//arr --> ["alma","szilva"]

// //////////////////////////////////////////////////////////////////
// array1=["1","2"];
// uj=array1.slice().reverse(); // uj = ["2","1"]
// //////////////////////////////////////////////////////////////////

// //////////////////////////////////////////////////////////////////
// regi = ["c","b","a"];
// uj = regi.slice().sort(); // uj = ["a","b","c"]
// //////////////////////////////////////////////////////////////////

// filter, hányadik elem kell (zero-based)
// szov = $('div:eq(1)').text(); // szov = "masodik"
// szov = $('div').eq(-1).text(); // szov="masodik", visszafele az első
// //////////////////////////////////////////////////////////////////

// $('div[id="sec"]'); // filter egzaktul
// $('a[href^="http"]') // filter, ami illeszkedik az elejére, azaz külső
// hivatkozás
// $('div').each(function(){$(this).attr('class','divcss')}); // beállítja
// minden div class-ját

function getEverything(obj) {
    var keys = [];
    for (var key in obj) {
        keys.push(key);
    }
    alert(key);
    return key;
}

// mystring=$('<div>').append(MYOBJECT.clone()).remove().html(); // convert
// jquery object to html string

// var gyum = "alma,korte,szilva".split(',');
// alert(gyum[1]); // = korte

// var szam=5;
// var string = szam.toString(); // convert int to string

function int2str(num) {
    return num.toString();
}

function num2str(num) {
    return num.toString();
}

function str2int(str) {
    return parseInt(str);
}

function str2num(str) {
    return parseInt(str);
}

// array1 = ["1","2","3"];
// alert(array1.length); // count/length of array element hossz

// DOM loaded and accessable
/*
* $(document).ready(function() { //TODO });
*/

// take a tag from a html string
function html_parser(str, tag) {
    var kif = new RegExp("<" + tag + "[^>]*>([^]*)</" + tag + ">", "i");
    out = str.match(kif);
    return out;
    // out[0] = 'tagOUT'
    // out[1] = 'tagINNER'
}

function aaa(str) {
    if (length(str) == 0) {
        str = "empty(string)";
    }
    console.log(str);
}

function aaaa(str) {
    if (length(str) == 0) {
        str = "empty(string)";
    }
    chrome.extension.getBackgroundPage().console.log(str);
}

function count(arr) {
    if (arr) {
        return arr.length;
    } else {
        return 0;
    }
}

function numel(arr) {
    if (arr) {
        return arr.length;
    } else {
        return 0;
    }
}

// Checks is an element in an array or not
// $.inArray(value, array);

function alertcss(text, title) {
    title = ( typeof title === "undefined") ? "alert" : title;
    new Messi(text, {
        title : title,
        titleClass : 'messi-info',
        autoclose : '250000',
        modal : true,
        center : true,
        buttons : [{
            id : 0,
            label : 'OK',
            val : 'X'
        }]
    });
    $('.btn').focus();
}

function max(arr) {
    return Math.max.apply(Math, arr);
};
function min(arr) {
    return Math.min.apply(Math, arr);
};

// random number between 1 and n
function random(n) {
    return Math.floor((Math.random() * n) + 1);
}

// out = findAll("miben","mit");
function findAll(miben, mit) {
    var regex = new RegExp(mit, 'g'), result, indices = [];
    while (( result = regex.exec(miben))) {
        indices.push(result.index);
    }
    return indices;
}

function trim(str) {
    return $.trim(str);
}

function trimabc(str) {
    var regex = new RegExp('[a-zA-Z]');
    ele = regex.exec(str);
    strinverse = str.split("").reverse().join("");
    veg = regex.exec(strinverse);
    if (ele == null) {
        newstr = str;
    } else {
        newstr = str.substring(ele.index, str.length - veg.index);
    }
    var pos = newstr.indexOf("'")
    if (pos > 1){
       newstr = newstr.substring(0, pos)
    }
    return newstr;
}

// length of string or length of array
function length(item) {
    if (item == null) {
        return 0;
    } else {
        return item.length;
    }
}
// NINCS LEIMPLEMENTÁLVA A START
//megkeresi az első előfordulást regular expression position
//hol = regexppos("alma", "ls?m");  // --> hol = 1
/*
 hol = regexppos(miben, mi);
 hol = regexppos(miben, mi, start);
 hol = regexppos(miben, mi, 0, "i");
 */
function regexppos(miben, mi, start, caseSense) {
    if (start == undefined || start < 0) {
        start = 0;
    }
    if (caseSense == undefined) {
        caseSense = "";
    }
    if (length(miben) == 0 || length(mi) == 0) {
        return -1;
    }

    elomiben = substr(miben, 0, start - 1);
    aktmiben = substr(miben, start);

    var kif = new RegExp(mi, caseSense);
    out = aktmiben.match(kif);
    if (out == null || out['index'] == undefined) {
        return -1;
    }

    return out['index'] + length(elomiben);
    // out[0] = 'tagOUT'
    // out[1] = 'tagINNER'
}

/*
 datum = today();  // --> 2014-01-25
 */
function today() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    //January is 0!

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    };
    if (mm < 10) {
        mm = '0' + mm;
    };
    return yyyy + '-' + mm + '-' + dd;
}

function now() {
    var today = new Date();
    var yyyy = today.getFullYear();
    var mm = today.getMonth() + 1;
    var dd = today.getDate();
    var hh = today.getHours();
    var pp = today.getMinutes();
    var ss = today.getSeconds();
    if (mm < 10) {
        mm = '0' + mm;
    };
    if (dd < 10) {
        dd = '0' + dd;
    };
    if (hh < 10) {
        hh = '0' + hh;
    };
    if (pp < 10) {
        pp = '0' + pp;
    };
    if (ss < 10) {
        ss = '0' + ss;
    };

    return yyyy + '-' + mm + '-' + dd + ' ' + hh + ':' + pp + ':' + ss;
}

/*
 START = nowMillis();
 ...
 stopper(START);
 */
function nowMillis() {
    return Date.now();
}

function stopper(START) {
    aaa("stopper: " + num2str(Date.now() - START));
    return Date.now() - START;
}

function hediszajdx(x) {
    if (x >= 0) {
        return x;
    } else {
        return 0;
    }
}

function round(x) {
    return Math.round(x);
}

function browser() {
    if (strpos(navigator.userAgent.toLowerCase(), "chrome") > -1) {
        return "chrome";
    } else if (strpos(navigator.userAgent.toLowerCase(), "safari") > -1) {
        return "safari";
    } else if (strpos(navigator.userAgent.toLowerCase(), "firefox") > -1) {
        return "firefox";
    } else {
        return "else";
    }
}