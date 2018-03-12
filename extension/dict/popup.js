$('document').ready(function() {
    $('body').css('font-size', localStorage['fontsize'].toString() + "px");
    $('body').css('max-width', localStorage['maxwidth'].toString() + "px");
    $('body').css('min-width', "270px");
    $('body').css('max-height', localStorage['maxheight'].toString() + "px");
    $('body').css('overflow', 'auto');

});
akttimer = null;
DISPTIME = 20000;

function re() {
    setTimeout(re2, 0);
    setTimeout(re2, 100);
    setTimeout(re2, 400);
    setTimeout(re2, 1000);
    setTimeout(re2, 2000);
    setTimeout(re2, 4000);
}

function re2() {
    $('#div1').hide(0).show(0);
}
if(localStorage['clear_design_option'] === '1'){
  $('#optionclose').css({display: 'none'})
  $('#ety').css({display: 'none'})
  $('#ska_heritage').css({display: 'none'})
  $('#ska_ziteboard').css({display: 'none'})
} else {
  $('#optionclose').css({display: 'inline'})
  $('#ety').css({display: 'inline'})
  $('#ska_heritage').css({display: 'inline'})
  $('#ska_ziteboard').css({display: 'inline'})
}

$('#popupclose').click(function() {
    window.close();
});
$('#hide').click(function() {
    $('#skanews').hide();
    localStorage['kellnews'] = '0';
});

$.get('http://skalar.darkware.hu/nyelvlecke/whatsnews3.php', function(data) {
    if (data && (localStorage['newscontent'] != data || localStorage['kellnews'] == '1')) {
        localStorage['newscontent'] = data;
        localStorage['kellnews'] = '1';
        $('#skanews').prepend(data);
        $('#skanews').show();
    }
});

if (localStorage['chat_enable_option'] == "1"){
  httpdarab = 'htt'
  $.get(httpdarab + 'p://skalar.darkware.hu/nyelvlecke/chat.php', {
      operation   : 'ask',
      userID      : localStorage['userID'],
  }, function(data) {
      if (data.indexOf('<error') == 0){
        data = ''
      }
      if (data == ''){
        $('#div6').html('')
        return
      }

      arr = data.split('_xxxxx_')
      chat_display_names = [];
      chat_links = [];
      for (i = 0, len = arr.length; i < len; i++) {
        cuser = arr[i];
        arr2 = cuser.split('_yyyyy_');
        chat_display_names.push(arr2[0]);
        chat_links.push(arr2[1]);
      }

      str = '<br />Chat-ready users:<br />'
      for (index = i = 0, len = chat_display_names.length; i < len; index = ++i) {
        cName = chat_display_names[index];
        cLink = chat_links[index]
        str += '<span style="font-weight: bold;color:green;">o</span> <a style="text-decoration:underline;color:green;" target="_blank" href="'+cLink+'">'+cName+'</a><br />'
      }
      $('#div6').html(str)
  });
}

chrome.tabs.query({
    active: true,
    currentWindow: true
}, function(tabs) {
    tab = tabs[0];
    hol = tab.url.indexOf('https://chrome.google.com/webstore');
    if (hol >= 0) {
        lehet = 0;
    } else {
        lehet = 1;
    }
    if (lehet == 1 && localStorage['iscounter1'] == "2") {
        most1 = 1;
        localStorage['iscounter1'] = '0';
    } else {
        most1 = 0;
    }
    if (lehet == 1 && most1 == 0 && localStorage['iscounter3'] == "2") {
        most3 = 1;
        localStorage['iscounter3'] = '0';
    } else {
        most3 = 0;
    }
    if (lehet == 1 && most1 == 0 && most3 == 0 && localStorage['ischatcontent'] == '1') {
        most4 = 1;
        localStorage['ischatcontent'] = '0';
    } else {
        most4 = 0;
    }

    function show(szo){
        if (szo == '') {
            if (localStorage['words']) {
                var words = localStorage['words'];
                szavak = words.split(',');
                szavak = szavak.split(' ')[0]
                var randomnumber = Math.floor(Math.random() * szavak.length);
                szo = szavak[randomnumber];
            } else {
                szo = "empty";
            }
        }

        //etymology start
        $('#ety').attr('href', "http://www.etymonline.com/index.php?search=" + szo);
        //etymology end

        //heritage start
        $('#ska_heritage').attr('href', "http://ahdictionary.com/word/search.html?q=" + szo);
        //heritage end


        // google translator start
        $.get("https://translate.google.com/?q=" + szo + "#en|hu|" + szo, function(data) {
            urlgoo = "http://translate.google.com/?q=" + szo + "#en|hu|" + szo;
            data = html_singletag_remove(data, 'img');
            ANGOL = $('option[value="en"]', data).html();
            celnyelv = $('div.goog-flat-menu-button-caption', data).filter(':eq(1)').html();
            aaa(ANGOL);
            aaa(celnyelv);
            hol = celnyelv.indexOf(ANGOL);

            if (hol == -1) {
                forditas = $('#result_box', data).text()
                //kif = /backgroundColor='#fff'">([^<]*)<\/span>/;
                //out = data.match(kif);
                if (forditas) {
                    $('#div1').css('padding', '3px 5px 3px 5px');
                    if(localStorage["goog_option2"] == '1'){
                        $('#div1').html("<b><a class='link' href='" + urlgoo + "' target='_blank'>" + szo + ":</a></b> <i id='reveal'><a style='cursor:pointer' title='"+out[1]+"'>???</a></i>");
                        $("#reveal").click({word:forditas},function(event){
                            revword = event.data.word
                            $('#reveal').html(revword)
                        })
                    } else {
                        $('#div1').html("<b><a class='link' href='" + urlgoo + "' target='_blank'>" + szo + ":</a></b> <i>" + forditas + "</i>");
                    }
                } else {
                    $('#div1').html("<b><a class='link' href='" + urlgoo + "' target='_blank'>" + szo + ":</a></b> <i></i>");
                }
                //$('#div1').html("<b><a class='link' href='" + urlgoo + "' target='_blank'>" + szo + ":</b> <i>" + forditas + "</i>");
            } else {
                $('#div1').html("<span style='color:red'>Warning!</span> Google Translator tries to translate to English. Visit the <a style='text-decoration:underline;' href='http://translate.google.com/?q=you+have+to+set+from+english+to+your+native+language' target='_blank'>web site</a> and set the destination language.");
            }
            setTimeout(re, 0);
            $('#tongue').fadeIn("slow");
            if (akttimer !== null) {
                clearInterval(akttimer);
            }
            akttimer = setTimeout(function() {
                $('#tongue').fadeOut("slow");
            }, DISPTIME);
        });
        // google translator end

        // long start
        if (localStorage['long_option'] == '1') {
            $.get("http://www.ldoceonline.com/search/direct/?q=" + szo, function(data) {
                data = html_singletag_remove(data, 'img');
                urllon = "http://www.ldoceonline.com/search/direct/?q=" + szo
                filteredData = $('span[class="dictentry"]:eq(0)', data)
                hanydef = $('span[class="DEF"]', filteredData).length
                hanycross = $('a[class="crossRef"]:eq(0)', filteredData).length
                if(hanydef == 0){
                  if(hanycross == 0){
                    $('#div2').css('padding', '3px 5px 3px 5px');
                    $("#div2").html("no result");
                  } else {
                    crosslink = $('a[class="crossRef"]:eq(0)', filteredData).attr('href')
                    $.get(crosslink, function(data0){
                      urllon = crosslink
                      display_long_result(data0);
                    })
                  }
                } else {
                    display_long_result(data);
                }

                function display_long_result(data) {
                    important = $('span[class="FREQ"]',data).length
                    wordClass = $('span[class="POS"]:eq(0)', data).text().trim()
                    longszo = $('h1[class="pagetitle"]', data).text()
                    if (wordClass.length > 0) {
                        wordClass = ' (' + wordClass + ')'
                    }
                    filteredData = $('span[class="dictentry"]:eq(0)', data)
                    hany1 = $('span[class="Sense"]', filteredData).length
                    hany2 = $('span[class="newline Sense"]', filteredData).length
                    if(hany1 == 0 && hany2 == 0){
                      console.log("error")
                      hanyblock = 0
                    } else if (hany1 > hany2){
                      blocks = $('span[class="Sense"]', filteredData)
                      hanyblock = hany1
                    } else {
                      blocks = $('span[class="newline Sense"]', filteredData)
                      hanyblock = hany2
                    }
                    if (localStorage['longhany'] == "all") {
                        hany = hanyblock
                    } else {
                        hany = min([hanyblock, str2num(localStorage['longhany'])]);
                    }
                    ft = "<ol>";
                    for (i = 0; i < hany; i++) {
                        def = $('span[class="DEF"]', blocks.eq(i)).text()
                        if($('span[class="DEF"]', blocks.eq(i)).length > 0){
                            ft = ft + '<li><span><i>' + def + "</i></span></li></br>";
                        }
                    }
                    ft = ft + "</ol>";
                    $('#div2').css('padding', '3px 5px 3px 5px');
                    if(important){
                        style = "'padding-right:2px;padding-left:3px;border:2px rgb(216, 16, 16) solid'"
                    }else{
                        style = "''"
                    }
                    $("#div2").html("<b><a class='link' style=" + style + " href='" + urllon + "' target='_blank'>" + longszo + "</a></b> " + wordClass + "</br></br>" + ft);

                    // example sentences start
                    if (  (localStorage['ling_option'] == '1') && ($('span[class="asset_intro"]', filteredData).length > 0)  ) {
                        examples = $('span[class="cexa1g1 exa"]', filteredData);
                        src = '';
                        for (i = 0; i < str2num(localStorage['hanysentence']); i++) {
                            newsrc = examples.eq(i).text();
                            if (newsrc) {
                                newsrc = newsrc.replace("• ", "")
                                src += '<li>' + newsrc + '</li>';
                            }
                        }
                        if (src) {
                            src = '<ul>' + src + '</ul>';
                            $('#div4').css('padding', '3px 5px 3px 5px');
                            $("#div4").html(src);

                        }
                        $('#tongue').css('overflow', 'auto');

                    } else {
                        $("#div4").html('');
                    }
                    // example sentences end


                    $('#tongue *').css('font-size', localStorage['fontsize'].toString() + "px");
                    $('#tongue').css('overflow', 'auto');

                    setTimeout(re, 0);
                    if (localStorage['iscounter1'] == '1') {
                        var akt = str2num(localStorage['counter1']) + 1;
                        if (akt >= str2num(localStorage['LIMES1'])) {
                            localStorage['iscounter1'] = "2";
                        }
                        localStorage['counter1'] = num2str(akt);
                    }
                    if (localStorage['iscounter3'] == '1') {
                        var akt = str2num(localStorage['counter3']) + 1;
                        if (akt >= 3) {
                            localStorage['iscounter3'] = "2";
                        }
                        localStorage['counter3'] = num2str(akt);
                    }
                }
            });
        } else {
            $("#div2").html('');
        }
        // long end

        // oxford start
        if (localStorage['free_option'] == '1') {
            phon_option = localStorage['phon_option'];
            url0 = chrome.runtime.getURL('');
            url = 'http://www.oxfordlearnersdictionaries.com/search/english/?q=' + szo;
            $.get(url, function(data) {
                urloxf = url
                hole = strpos(data, '<div id="entryContent"');
                //holv = strpos(data, "<!-- End of DIV entry-->", hole) - 1;
                holv = strpos(data, 'class="clear"', hole) - 1;
                data = substr(data, hole, holv) + "</div></div>";

                oxready_flag = 1;

                hole = strpos(data, '<h2');
                holv = strpos(data, '</h2>', hole) - 1;
                filteredData = substr(data, hole, holv);
                oxkeyword = $('h2', data).text();
                aaa('Oxford keyword: ' + oxkeyword);

                //phon_option: [1|3]
                if (phon_option == 1) {
                    dik = 0
                } else if (phon_option == 3) {
                    dik = 1
                }
                seged = $('.phon:eq(' + dik + ')', data)
                $('span:eq(0)', seged).remove()
                $('span[class="wrap"]', seged).remove()
                $('span[class="separator"]', seged).remove()
                mi = seged.text()

                if (mi) {
                    szos = $('h2', data).text();
                    chrome.runtime.sendMessage({
                        from: "fromContentScript",
                        reason: 'oxfordsound',
                        szo: szos.toLowerCase()
                    });
                    item = szos + ': ' + mi
                    if (localStorage['words']) {
                        szavak = (localStorage['words']).split(',');
                        hols = $.inArray(item, szavak);
                        if (hols == -1) {
                            localStorage['words'] = localStorage['words'] + "," + item;
                        }
                    } else {
                        localStorage['words'] = item;
                    }
                    $('#div3').css('padding', '3px 5px 3px 5px');
                    $("#div3").html("<span style='vertical-align:middle'><b><a class='link' href='" + urloxf + "' target='_blank'>" + szos + ":</a></b> <i>" + mi + "</i></span>");
                } else {
                    if ($('.result-list', data).length) {
                        newrel = $('.result-list li:eq(0) a', data).attr('href');
                        aaa(newrel);
                        $.get(newurl, function(data) {
                            hole = strpos(data, '<div id="entryContent"');
                            //holv = strpos(data, "<!-- End of DIV entry-->", hole) - 1;
                            holv = strpos(data, 'class="clear"', hole) - 1;
                            data = substr(data, hole, holv) + "</div></div>";
                            mi = $('.ei-g:eq(0) span:eq(' + phon_option + ')', data).text();
                            szos = $('h2', data).text();
                            chrome.runtime.sendMessage({
                                from: "fromContentScript",
                                reason: 'oxfordsound',
                                szo: szos.toLowerCase()
                            });
                            item = szos + ': ' + mi
                            if (localStorage['words']) {
                                szavak = (localStorage['words']).split(',');
                                hols = $.inArray(item, szavak);
                                if (hols == -1) {
                                    localStorage['words'] = localStorage['words'] + "," + item;
                                }
                            } else {
                                localStorage['words'] = item;
                            }
                            $('#div3').css('padding', '3px 5px 3px 5px');
                            $("#div3").html("<span style='vertical-align:middle'><b><a class='link' href='" + urloxf + "' target='_blank'>" + szos + ":</a></b> <i>" + mi + "</i></span>");
                        });
                    } else {
                        chrome.runtime.sendMessage({
                            from: "fromContentScript",
                            reason: 'oxfordsound',
                            szo: ''
                        });
                        $('#div3').css('padding', '3px 5px 3px 5px');
                        $("#div3").html('no result');
                    }

                }
                $('#div3').append(' <img id="play" style="width:12px; height=12px; vertical-align:middle" src="' + url0 + 'pics/play.png" />');
                $('#div3').append(' <img id="play2" style="width:12px; height=12px; vertical-align:middle" src="' + url0 + 'pics/play.png" />');
                $('#div3').append(' <img id="play3" style="width:12px; height=12px;  vertical-align:middle" src="' + url0 + 'pics/play.png" />');
                $("#play").click(function() {
                    chrome.runtime.sendMessage({
                        from: "fromContentScript",
                        reason: 'howjsay',
                        szo: szo.toLowerCase()
                    }, function(response) {
                        //NOTHING TO DO
                    });
                });

                $("#play2").click(function() {
                    chrome.runtime.sendMessage({
                        from: "fromContentScript",
                        reason: 'merriam',
                        szo: szo.toLowerCase()
                    }, function(response) {
                        //NOTHING TO DO
                    });
                });

                $("#play3").click(function() {
                    chrome.runtime.sendMessage({
                        from: "fromContentScript",
                        reason: 'oxfordclick',
                        szo: szo.toLowerCase()
                    }, function(response) {
                        //NOTHING TO DO
                    });
                });

                $('#tongue *').css('font-size', localStorage['fontsize'].toString() + "px");
                $('#tongue').css('overflow', 'auto');
            });
        } else {
            $("#div3").html('');
        }
        // oxford end

        //automatic pronunciation start
        // originally it was howjsay start, but now how to pronounce (= which dictionary)
        if (localStorage['how_option'] == '1') {
            if(localStorage['pronunciation_option'] == '1'){
              url = "http://www.howjsay.com/mp3/" + szo.toLowerCase() + ".mp3";
              $('#howframe').attr('src', url);
            }
            if(localStorage['pronunciation_option'] == '2'){
              chrome.runtime.sendMessage({
                  from: "fromContentScript",
                  reason: 'merriam',
                  szo: szo.toLowerCase()
              }, function(response) {
                  // nothing to do
              });
            }
            if(localStorage['pronunciation_option'] == '3'){
              chrome.runtime.sendMessage({
                  from: "fromContentScript",
                  reason: 'oxfordsound',
                  automatic: true,
                  szo: szo.toLowerCase()
              }, function(response) {
                  // nothing to do
              });
            }
        } else {}
        //automatic pronunciation end
    } // show end

    if (localStorage["searchbox_option"] == "1") {
        true
    } else {
        $("#div0").css('display', 'none')
    }

    $("#ska_search").focus();
    $("#ska_search").keyup(function(e) {
        if (e.keyCode == 13) {
            altszo = $("#ska_search").val();
            show(altszo);
        }
    });

    if (lehet == 1 && most1 == 0 && most3 == 0 && most4 == 0) {
        chrome.tabs.sendMessage(tab.id, {
            from: "fromPopup",
            tabid: tab.id
        }, function(response) {
            szo = $.trim(response.data);
            show(szo)
        });
    } else if (most1 == 1) {
        $('body').html('<div style="font-size: 14px"><div><b>Hello my dear user!</b></div> If I count properly you have used the app more than 100 times, so it\'s not one of the worst supposedly. Could you help me to share and to make more popular the app? For example post to friends on any social site you use. Most importantly rate it on the official <a style="color:rgb(27,136,235)" href="https://chrome.google.com/webstore/detail/neomigpibafpboiknmijddgnncengfnm/reviews" target="_blank">Google Web Store</a>.<br /><br />Skalkaz</div>');
    } else if (most3 == 1) {
        $('body').html('<div style="font-size: 14px;text-align:justify;text-justify:inter-word;"><div><b>Hello my dear user!</b></div> <br />Thank you to everyone who submitted an idea through the idea box (see <a target="_blank" href="options.html">options menu</a>). More suggestions are appreciated. <br /><font color="red">new feature:</font> double click on the word (see Option page)</span><br /><br />Skalkaz<br /><span style="font-size: 12px"><br />Please feel free to share my app all possible way you can just think of it.<span></div>');
    } else if (most4 == 1) {
        $('body').html('<div style="font-size: 14px"><div><b>Hello!</b></div> <br />You received a message. Check the mini chat box under the <a href="options.html" target="_blank">option page</a>. </div>');
        chrome.browserAction.setBadgeText({
            text: ''
        });
    } else {
        $('#div1').html('<font color="red">Not work on this page.</font>');
        $('#div2').html('');
        $('#div3').html('Try on any other page.');
        $('#div4').html('Ironically the chrome extension does not work on chrome web store page itself.');
    }
});
