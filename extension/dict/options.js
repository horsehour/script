$(document).ready(function() {
    restore_options();
    $('#goog').change(function() {
        save_options4();
    });
    $('#goog2').change(function() {
        save_options45();
    });
    $('#long_option').change(function() {
        save_options5();
    });
    $('#longhany').change(function() {
        save_options55();
    });
    $('#free').change(function() {
        save_options6();
    });
    $('#how').change(function() {
        save_options7();
    });
    $('#ling').change(function() {
        save_options8();
    });
    $('#hanysentence').change(function() {
        save_options85();
    });
    $('#https_terminate').change(function() {
        save_options35();
    });
    $('#clear_design').change(function() {
        save_options36();
    });
    $('#chat_enable').change(function() {
        save_options37();
        post_chat();
    });
    $('#chat_display').change(function() {
        save_options38();
        post_chat();
    });
    $('#chat_display_name').change(function() {
        localStorage['chat_display_name'] = $('#chat_display_name').val();
        post_chat()
        $("#ref32").show(0).delay(1500).hide(0);
    });
    $('#chat_link').change(function() {
        chatLink = $('#chat_link').val();
        httpdarab = "htt"
        localStorage['chat_link'] = chatLink
        if (typeof chatLink == 'string' && chatLink.indexOf(httpdarab + 'ps://hangouts.google.com/hangouts/') !== 0){
          $("#ref34").show(0).delay(3000).hide(0);
        } else {
          $("#ref33").show(0).delay(1500).hide(0);
        }
        post_chat()
    });
    $('#fontsize').change(function() {
        save_options9();
    });
    $('#postbutton').click(function() {
        post_ideabox();
    });
    $('#metakey').change(function() {
        save_options95();
    });
    $('#dbl').change(function() {
        save_options10();
    });
    $('#searchbox').change(function() {
        save_options11();
    });

    $('#showbutton').click(function() {
        show_words();
    });
    $('#deletebutton').click(function() {
        localStorage['words'] = '';
        $('#export').css('display', 'none');
        $('#show').text('');
    });
    $('#exportbutton').click(function() {
        show_export();
    });
});

function restore_options() {
    if (localStorage['dbl_option'] == "1") {
        $('#dbl').attr('checked', true);
    } else {
    }
    if (localStorage['searchbox_option'] == "1") {
        $('#searchbox').attr('checked', true);
    } else {
    }
    if (localStorage['https_terminate_option'] == "1") {
        $('#https_terminate').attr('checked', true);
    } else {
    }
    if (localStorage['clear_design_option'] == "0") {
        $('#clear_design').attr('checked', true);
    } else {
    }
    if (localStorage['chat_enable_option'] == "1") {
        $("#chat_span").css('opacity', 1)
        $('#chat_enable').attr('checked', true);
        $('#chat_display').removeAttr('disabled');
    } else {
        $("#chat_span").css('opacity', 0.5)
        $('#chat_display').attr('disabled', 'disabled');
    }
    if (localStorage['chat_display_option'] == "1") {
        $('#chat_display').attr('checked', true);
        $("#chat_display_name").removeAttr('disabled');
        $("#chat_link").removeAttr('disabled');
    } else {
        $("#chat_display_name").attr('disabled', 'disabled');
        $("#chat_link").attr('disabled', 'disabled');
    }
    $('#chat_display_name').val(localStorage['chat_display_name']);
    $('#chat_link').val(localStorage['chat_link']);
    if (localStorage['goog_option'] == "1") {
        $('#goog').attr('checked', true);
    } else {
    }
    if (localStorage['goog_option2'] == "1") {
        $('#goog2').attr('checked', true);
    } else {
    }
    if (localStorage['long_option'] == "1") {
        $('#long_option').attr('checked', true);
    }

    if (localStorage['free_option'] == "1") {
        $('#free').attr('checked', true);
        $("[name=phon]").removeAttr('disabled');
    } else {
        $("[name=phon]").attr('disabled', 'disabled');
    }
    if (localStorage['how_option'] == "1") {
        $('#how').attr('checked', true);
    } else {
    }
    if (localStorage['ling_option'] == "1") {
        $('#ling').attr('checked', true);
        //$("[name=linghany]").removeAttr('disabled');
    } else {
        //$("[name=linghany]").attr('disabled','disabled');
    }
    if (localStorage.getItem('fontsize')) {
    } else {
        localStorage['fontsize'] = "12";
    }
    $("#o" + localStorage['fontsize']).attr('selected', 'selected');
    if (localStorage.getItem('maxwidth')) {
    } else {
        localStorage['maxwidth'] = "300";
    }
    $('#maxwidth').val(localStorage['maxwidth']);
    if (localStorage.getItem('maxheight')) {
    } else {
        localStorage['maxheight'] = "600";
    }
    $('#maxheight').val(localStorage['maxheight']);
    $('#maxwidth').change(function() {
        var ert = Math.max(parseInt(this.value), 270).toString();
        localStorage['maxwidth'] = ert;
    });
    $('#maxheight').change(function() {
        localStorage['maxheight'] = this.value;
    });
    $('#disptime').val(str2num(localStorage['DISPTIME']) / 1000);
    $('#disptime').change(function() {
        $("#dtime").show(600);
        localStorage['DISPTIME'] = num2str(this.value * 1000);
    });
    if (localStorage['longhany']=="all"){
        $("#h11").attr('selected', 'selected');
    } else {
        $("#h" + localStorage['longhany']).attr('selected', 'selected');
    }

    if (localStorage['pronunciation_option'] == "1") {
        $("[name=pronunciation]").filter("[value=1]").prop("checked", true);
    }
    if (localStorage['pronunciation_option'] == "2") {
        $("[name=pronunciation]").filter("[value=2]").prop("checked", true);
    }
    if (localStorage['pronunciation_option'] == "3") {
        $("[name=pronunciation]").filter("[value=3]").prop("checked", true);
    }
    $("input[name='pronunciation']").change(function() {
        if ($("[name=pronunciation]").filter("[value=1]").prop('checked')) {
            localStorage['pronunciation_option'] = "1";
        }
        if ($("[name=pronunciation]").filter("[value=2]").prop('checked')) {
            localStorage['pronunciation_option'] = "2";
        }
        if ($("[name=pronunciation]").filter("[value=3]").prop('checked')) {
            localStorage['pronunciation_option'] = "3";
        }
    });
    if (localStorage['phon_option'] == "1") {
        $("[name=phon]").filter("[value=1]").prop("checked", true);
    } else {
        $("[name=phon]").filter("[value=2]").prop("checked", true);
    }
    $("input[name='phon']").change(function() {
        if ($("[name=phon]").filter("[value=1]").prop('checked')) {
            localStorage['phon_option'] = "1";
        } else {
            localStorage['phon_option'] = "3";
        }
    });

    $("input[name='linghany']").change(function() {
        if ($("[name=linghany]").filter("[value=1]").prop('checked')) {
            localStorage['lingonlyone'] = "1";
        } else {
            localStorage['lingonlyone'] = "0";
        }
    });

    // XXXXXXXXXXXXXXXXXXXXXXXXX
    if (localStorage['hanysentence']=="0" || localStorage['hanysentence']=="1"){}
    else {
        $("#y" + localStorage['hanysentence']).attr('selected', 'selected');
    }

    $("#"+localStorage['metakey']).attr('selected', 'selected');

    post_ideabox();

}

function save_options35() {
    if ($("#https_terminate").prop('checked')) {
        localStorage["https_terminate_option"] = "1";
    } else {
        localStorage["https_terminate_option"] = "0";
    }
}

function save_options36() {
    if ($("#clear_design").prop('checked')) {
        localStorage["clear_design_option"] = "0";
    } else {
        localStorage["clear_design_option"] = "1";
    }
}

function save_options37() {
    if ($("#chat_enable").prop('checked')) {
        localStorage["chat_enable_option"] = "1";
        $("#chat_display").removeAttr('disabled');
        $("#chat_span").css('opacity', 1)
        if ($("#chat_display").prop('checked')){
          $("#chat_display_name").removeAttr('disabled');
          $("#chat_link").removeAttr('disabled');
        }
    } else {
        localStorage["chat_enable_option"] = "0";
        $("#chat_display").attr('disabled', 'disabled');
        $("#chat_span").css('opacity', 0.5)
        $("#chat_display_name").attr('disabled', 'disabled');
        $("#chat_link").attr('disabled', 'disabled');
    }
}

function save_options38() {
    if ($("#chat_display").prop('checked')) {
        localStorage["chat_display_option"] = "1";
        $("#chat_display_name").removeAttr('disabled');
        $("#chat_link").removeAttr('disabled');
    } else {
        localStorage["chat_display_option"] = "0";
        $("#chat_display_name").attr('disabled', 'disabled');
        $("#chat_link").attr('disabled', 'disabled');
    }
}

function save_options4() {
    aaa(localStorage["goog_option"]);
    if ($("#goog").prop('checked'))
        localStorage["goog_option"] = "1";
    else
        localStorage["goog_option"] = "0";
    aaa(localStorage["goog_option"]);
}

function save_options45() {
    aaa(localStorage["goog_option2"]);
    if ($("#goog2").prop('checked'))
        localStorage["goog_option2"] = "1";
    else
        localStorage["goog_option2"] = "0";
    aaa(localStorage["goog_option2"]);
}

function save_options5() {
    aaa(localStorage["long_option"]);
    if ($("#long_option").prop('checked')) {
        localStorage["long_option"] = "1";
    } else {
        localStorage["long_option"] = "0";
    }
    aaa(localStorage["long_option"]);
}

function save_options55() {
    var ertek = document.getElementById('longhany').options[document.getElementById('longhany').selectedIndex].value;
    localStorage['longhany'] = ertek.toString();
}


function save_options6() {
    if ($("#free").prop('checked')) {
        localStorage["free_option"] = "1";
        $("[name=phon]").removeAttr('disabled');
    } else {
        localStorage["free_option"] = "0";
        $("[name=phon]").attr('disabled', 'disabled');
    }
}

function save_options7() {
    if ($("#how").prop('checked'))
        localStorage["how_option"] = "1";
    else
        localStorage["how_option"] = "0";
}

function save_options8() {
    if ($("#ling").prop('checked')) {
        localStorage["ling_option"] = "1";
        //$("[name=linghany]").removeAttr('disabled');
    } else {
        localStorage["ling_option"] = "0";
        //$("[name=linghany]").attr('disabled','disabled');
    }
}

function save_options85() {
    var ertek = document.getElementById('hanysentence').options[document.getElementById('hanysentence').selectedIndex].value;
    localStorage['hanysentence'] = ertek.toString();
}

function save_options9() {
    var ertek = document.getElementById('fontsize').options[document.getElementById('fontsize').selectedIndex].value;
    localStorage['fontsize'] = ertek.toString();
}

function save_options95() {
    var ertek = document.getElementById('metakey').options[document.getElementById('metakey').selectedIndex].value;
    localStorage['metakey'] = ertek.toString();
    $("#ref15").show(100);
}

function save_options10() {
    if ($("#dbl").prop('checked')) {
        localStorage["dbl_option"] = "1";
    } else {
        localStorage["dbl_option"] = "0";
    }
    $("#ref").show(100);
}

function save_options11() {
    if ($("#searchbox").prop('checked')) {
        localStorage["searchbox_option"] = "1";
    } else {
        localStorage["searchbox_option"] = "0";
    }
    $("#ref2").show(0).delay(1500).hide(0);
}

function show_words() {
    if (localStorage['words'] === null) {
        $("#show").text("");
    } else {
        szavak = (localStorage['words']).split(',');
        str = szavak.join('<br />');
        $("#show").html(str);
    }
}

function show_export() {
    $('#exp').text(localStorage['words']);
    $('#export').removeAttr('style');
}

function sel(be) {
    if ($('#csekk' + be).prop('checked')) {
        csekk[parseInt(be)] = "1";
    } else {
        csekk[parseInt(be)] = "0";
    }
    ;
    ujstr = '';
    for ( i = 0; i < csekk.length; i++) {
        if (csekk[i] == "1") {
            if (ujstr == '') {
                ujstr += szavak[i];
            } else {
                ujstr += ',' + szavak[i];
            }
        }
    }
    localStorage['words'] = ujstr;
}

function post_ideabox() {
    httpdarab = 'ht';
    $.get(httpdarab + 'tp://skalar.darkware.hu/nyelvlecke/ideals.php', {
        comments : $('#ideabox').val(),
        userID : localStorage['userID'],
        app_version : localStorage['app_version'],
        chrome_version : localStorage['chrome_version']
    }, function(data) {
        $('#ideabox').val('');
        $('#ideamessage').html(data);
        aaa(data);
        localStorage['chatcontent'] = data;
    });
}
function post_chat() {
    httpdarab = 'htt';
    if ($("#chat_enable").prop('checked') && $("#chat_display").prop('checked')) {
      operation = 'insert'
    } else {
      operation = 'delete'
    }
    displayName = localStorage['chat_display_name']
    if (displayName === null || displayName === undefined || displayName.length < 2){
      operation = 'delete'
    }
    chatLink = localStorage['chat_link']
    if (chatLink === null || chatLink === undefined || chatLink.indexOf(httpdarab + 'ps://hangouts.google.com/hangouts/') !== 0){
      operation = 'delete'
    }
    $.get(httpdarab + 'p://skalar.darkware.hu/nyelvlecke/chat.php', {
        operation   : operation,
        userID      : localStorage['userID'],
        displayName : displayName,
        chatLink    : chatLink,
    }, function(data) {
      //aaa(data)
      true
    });
    return true
}