chrome.runtime.sendMessage({
    from: "fromContentScript",
    reason: "contextmenu"
}, function(response) {
    DISPTIME = str2num(response.DISPTIME);

    pageUrl = response.pageUrl;
    if (response.https_terminate_option == "1" && strpos(pageUrl, 'https') == 0) {
        //aaa("Skalkaz Dictionary terminated due to the option on https page.");
        return;
    }

    if (response.contextmenu == '1') {
        altszo = response.altszo;
        show();
    } else {
        altszo = '';
        ontongue = 0;
        searchBoxFocused = 0;
        chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
            if (request.from == "fromPopup") {
                if (request.altszo) {
                    txt = request.altszo;
                } else {
                    txt = window.getSelection().toString();
                }
                txt = $.trim(txt);
                txt = trimabc(txt);
                if (txt) {
                    sendResponse({
                        from: "fromContentScript",
                        data: txt
                    });
                }
            }
            return true;
        });

        chrome.runtime.sendMessage({
            from: "fromContentScript",
            reason: "install",
            iscounter2: "-1"
        }, function(response) {
            if (response.dbl_option == '1') {
                $("body").dblclick(function() {
                    altszo = '';
                    show();
                });
            }
            metaKey = response.metakey
            iscounter2 = response.iscounter2;
            counter2 = response.counter2;
            url0 = response.url0;
            if(pageUrl.indexOf('.pdf') == -1){
              CLOSETAG = ""
            } else {
              CLOSETAG = '<img onclick="document.getElementById(\'tongue\').style.opacity=0;" id="skacloseicon" style="cursor:pointer;display:inline;background-color: #eaeaeb;float:right;width:20px;height:20px" src="' + url0 + 'pics/close.png" />'
            }
            if ($('head').length > 0) {
                $('head').append('<link rel="stylesheet" type="text/css" href="' + url0 + 'css/divpop.css" />');
            } else {
                $('body').parent().prepend('<link rel="stylesheet" type="text/css" href="' + url0 + 'css/divpop.css" />');
            }
            if (iscounter2 == '1') {
                chrome.runtime.sendMessage({
                    from: "fromContentScript",
                    reason: "install",
                    iscounter2: "0"
                }, function(response) {});
                alertcss('You have successfully installed Skalkaz dictionary app. Can you see the new <img src="' + url0 + 'pics/logo_19.png"> icon at the top right corner? Check the option menu by right click on the icon. Have fun!', 'Welcome by Skalkaz');
            }
        });

        //var ctrlDown = false;
        //var shiftDown = false;
        //var ctrlKey = 17;
        //var shiftKey = 16;
        //var Key1 = 65;
        akttimer = null;

        $("body").keydown(function(event) {
            if (searchBoxFocused == 0 && metaKey == 'ctrlKey' && !(event && event[metaKey])) {
                $('#tongue').fadeOut();
            }

        });
        $(document).click(function(event) {
            if (metaKey == 'ctrlKey' && event && event[metaKey]) {
                try{
                    var sel, word = "";
                    sel = window.getSelection()
                    if(sel.toString()){
                        //aaa(sel.toString())
                        sel = $.trim(sel.toString());
                        altszo = trimabc(sel);
                        word = altszo
                    } else{
                        var selectedRange = sel.getRangeAt(0);
                        sel.collapseToStart();
                        sel.modify("move", "backward", "word");
                        sel.modify("extend", "forward", "word");
                        word = sel.toString();
                        // Restore selection
                        sel.removeAllRanges();
                        sel.addRange(selectedRange);
                        altszo = word
                    }
                    show()
                }
                catch (err){
                    true
                    //aaa(err)
                }
            } else {
                if (ontongue == 1) {
                    $('#tongue').fadeOut(0);
                    bezar = 1;
                    searchBoxFocused = 0;
                } else {
                    ontongue = 1;
                }
            }
        });

    }
});

function show() {
    bezar = 0;
    searchBoxFocused = 0;
    oxkeyword = '';
    oxready_flag = 0;
    chrome.runtime.sendMessage({
        from: "fromContentScript",
        reason: "parameters",
        altszo: altszo
    }, function(response) {
        if(response === undefined){
          return
        }
        url0 = response.url0;
        fontsize = response.fontsize;
        maxwidth = response.maxwidth;
        maxheight = response.maxheight;
        goog_option = response.goog_option;
        goog_option2 = response.goog_option2;
        free_option = response.free_option;
        long_option = response.long_option;
        longhany = response.longhany;
        ling_option = response.ling_option;
        hanysentence = response.hanysentence;
        how_option = response.how_option;
        pronunciation_option = response.pronunciation_option
        phon_option = response.phon_option;
        searchbox_option = response.searchbox_option;
        clear_design_option = response.clear_design_option;
        words = response.words;
        szo = response.szo;
        if (clear_design_option === '0' || pageUrl.indexOf('.pdf') >= 0){
          OPTIONTAG = '<a target="_blank" href="' + url0 + 'options.html" style="display:inline"><img style="display:inline;background-color: #eaeaeb;float:right;width:20px;height:20px" title="option" src="' + url0 + 'pics/option.png" /></a>'
        } else {
          OPTIONTAG = ''
        }
        isZiteboard = false;
        if(szo.toLowerCase() == 'ziteboard'){
          isZiteboard = true
        }

        $('#tongue').remove();
        $('body').append('<div id="tongue"></div>');
        $('#tongue').html('');
        $('#tongue').fadeOut(0);
        str = '';
        //str+='<a target="_blank" href="'+url0+'options.html" style="display:inline"><img style="display:inline;background-color: #eaeaeb;float:right;width:20px;height:20px" title="option" src="'+url0+'pics/option.png" /></a>'
        if (searchbox_option == "1") {
            str += '<div id="div0" class="tonguediv2" style="padding:0px"><input id="ska_search" style="height:20px;max-width:180px;margin-top:5px;margin-bottom:5px" type="text"></div>';
        }
        if (goog_option == '1') {
            str += '<div id="div1" class="tonguediv2"><font color="red" style="opacity:0.5">translating...</font></div>';
        } else {
            str += '<div id="div1" class="tonguediv2"><font color="red"></font></div>';
        }
        str += '<div id="div3" class="tonguediv2"></div>';
        str += '<div id="div2" class="tonguediv2"></div>';
        str += '<div id="div4" class="tonguediv2" style="max-height:200px;"></div>';
        str += '<div id="div5" class="tonguediv2" style="width:auto;text-align:center;"></div>';
        str += '<div id="div6" class="tonguediv2" style="width:auto;"></div>';
        str += '<div class="tonguediv2" id="skanews" style="display:none"><input style="margin-top:8px;margin-left:4px;" type="button" value="Got it!" id="hide"></input><br /></div>';
        str += '<br /><div style="text-align:left;background-color:#eaeaeb;margin-bottom:5px">';
        if(clear_design_option === "0"){
          str += '<a id="ska_ety" style="background-color:#eaeaeb;" href="http://www.etymonline.com/" title="Online Etymology Dictionary" target="_blank"><img src="' + url0 + 'pics/etymology.png" style="width:20px;height:20px" /></a>';
          str += '<a id="ska_heritage" style="background-color:#eaeaeb;" href="http://ahdictionary.com/word/search.html?q=" title="The American Heritage Dictionary of English Language" target="_blank"><img src="' + url0 + 'pics/heritage.png" style="width:20px;height:20px" /></a>';
          str += '<a id="ska_ziteboard" style="background-color:#eaeaeb;" href="https://ziteboard.com" title="Platform for English learners and teachers." target="_blank"><img src="' + url0 + 'pics/ziteboard_dictionary.png" style="height: 20px !important;" /></a>';
        }
        str += '</div>';
        $('#tongue').append(str);

        $('#hide').click(function() {
            $('#skanews').hide();
            chrome.runtime.sendMessage({
                from: "fromContentScript",
                reason: "news",
                kellnews: '0'
            }, function(response) {});
        });

        $("#ska_search").focus(function() {
            searchBoxFocused = 1;
        });
        $("#ska_search").keyup(function(e) {
            if (e.keyCode == 13) {
                altszo = $("#ska_search").val();
                show();
            }
        });

        chrome.runtime.sendMessage({
            from: "fromContentScript",
            reason: "news"
        }, function(response) {
            newscontent = response.newscontent;
            kellnews = response.kellnews;
            data = response.data;
            if (data && (newscontent != data || kellnews == '1')) {
                chrome.runtime.sendMessage({
                    from: "fromContentScript",
                    reason: "news",
                    kellnews: '1',
                    newscontent: data
                }, function(response2) {});
                $('#skanews').prepend(data);
                $('#skanews').show();
            }
        });
        chrome.runtime.sendMessage({
            from: "fromContentScript",
            reason: "chat"
        }, function(response) {
          data = response.data
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


        $('#tongue *').css('font-size', fontsize.toString() + "px");
        $('#tongue').css('max-width', maxwidth.toString() + "px");
        $('#tongue').css('min-width', "270px");
        $('#tongue').css('max-height', maxheight.toString() + "px");
        //$('#tongue  #div3').css({'padding-top':'4px','padding-bottom':'4px'});
        //$('#divoption').css({'witdh':'auto'});
        $("#tongue").click(function() {
            ontongue = 0;
            if (akttimer !== null) {
                clearInterval(akttimer);
            }
            akttimer = setTimeout(function() {
                $('#tongue').fadeOut("slow");
                bezar = 1;
            }, DISPTIME);
        });
        $("#tongue").scroll(function() {
            ontongue = 0;
            if (akttimer !== null) {
                clearInterval(akttimer);
            }
            akttimer = setTimeout(function() {
                $('#tongue').fadeOut("slow");
                bezar = 1;
                searchBoxFocused = 0;
            }, DISPTIME);
        });

        //szo = window.getSelection().toString();

        if (szo == '') {
            if (words) {
                szavak = words.split(',');
                szavak = szavak.split(' ')[0]
                var randomnumber = Math.floor(Math.random() * szavak.length);
                szo = szavak[randomnumber];
            } else {
                szo = "empty";
            }
        }

        // header start
        if (searchbox_option == "1") {
            $('#div0').append(CLOSETAG + OPTIONTAG);
        } else {
            $('#div1').append(CLOSETAG + OPTIONTAG);
        }
        if (akttimer !== null) {
            clearInterval(akttimer);
        }
        akttimer = setTimeout(function() {
            $('#tongue').fadeOut("slow");
        }, DISPTIME);
        $('#tongue *').css('font-size', fontsize.toString() + "px");
        // header end

        //etymology start
        $('#ska_ety').attr('href', "http://www.etymonline.com/index.php?search=" + szo);
        //etymology end

        //heritage start
        $('#ska_heritage').attr('href', "http://ahdictionary.com/word/search.html?q=" + szo);
        //heritage end

        // oxford start
        if (free_option == '1' && isZiteboard == false) {
            chrome.runtime.sendMessage({
                from: "fromContentScript",
                reason: 'oxford1',
                szo: szo
            }, function(response) {
                data = response.data;
                urloxf = response.url;
                hole = strpos(data, '<div id="entryContent"');
                //holv = strpos(data, "<!-- End of DIV entry-->", hole) - 1;
                holv = strpos(data, 'class="clear"', hole) - 1;
                data = substr(data, hole, holv) + "</div></div>";
                oxready_flag = 1;

                hole = strpos(data, '<h2');
                holv = strpos(data, '</h2>', hole) - 1;
                filteredData = substr(data, hole, holv);
                oxkeyword = $('h2', data).text();
                //aaa('Oxford keyword: ' + oxkeyword);

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
                    if (words) {
                        szavak = words.split(',');
                        hols = $.inArray(item, szavak);
                        if (hols == -1) {
                            words = words + "," + item;
                        }
                    } else {
                        words = item;
                    }
                    chrome.runtime.sendMessage({
                        from: "fromContentScript",
                        reason: 'words',
                        data: words
                    }, function(response) {});
                    $('#div3').css('padding', '3px 5px 3px 5px');
                    $("#div3").html("<span style='vertical-align:middle'><b><a class='link' href='" + urloxf + "' target='_blank'>" + szos + ":</a></b> <i>" + mi + "</i></span>");
                } else {
                    if ($('.result-list', data).length) {
                        newrel = $('.result-list li:eq(0) a', data).attr('href');
                        //aaa(newrel);
                        chrome.runtime.sendMessage({
                            from: "fromContentScript",
                            reason: 'oxford2',
                            newrel: newrel
                        }, function(response) {
                            data = response.data;
                            hole = strpos(data, '<div id="entryContent"');
                            //holv = strpos(data, "<!-- End of DIV entry-->", hole) - 1;
                            holv = strpos(data, 'class="clear"', hole) - 1;
                            data = substr(data, hole, holv) + "</div></div>";
                            mi = $('.ei-g:eq(0) span:eq(' + phon_option + ')', data).text();
                            szos = $('h2', data).text();
                            item = szos + ': ' + mi
                            chrome.runtime.sendMessage({
                                from: "fromContentScript",
                                reason: 'oxfordsound',
                                szo: szos.toLowerCase()
                            });
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

                $('#tongue *').css('font-size', fontsize.toString() + "px");
                $('#tongue').css('overflow', 'auto');
            });
        } else if (isZiteboard == false){
            $("#div3").html('');
        }
        // oxford end

        // long start
        if (isZiteboard == true) {
          style = ""
          urllon = "https://ziteboard.com"
          longszo = 'ziteboard'
          wordClass = ' (noun) '
          ft = '<ol><li><span><i><span style="color: blue"></span><span id="p008-000352953" class="DEF"><span>						</span>a lightweight zoomable online whiteboard tool</span></i></span></li></br><li><span><i><span style="color: blue"></span><span id="p008-000352961" class="DEF"><span>						</span>a sketch, drawing made with Ziteboard</span></i></span></li></br></ol>'
          $("#div2").html("<b><a href='"+urllon+"' sas='sos' class='link' style=" + style + " target='_blank'>" + longszo + "</a></b> " + wordClass + "</br></br>" + ft);
          src = "<ul><li>Check out this fukin' ziteboard!</li><li>The math coach invited his student for a ziteboard session.</li><li>Let's make a ziteboard sketch about the system design.</li></ul>"
          $('#div4').css('padding', '3px 5px 3px 5px');
          $("#div4").html(src);
          if (bezar == 0) {
              $('#tongue').fadeIn("slow");
          }
          $('#tongue').css('overflow', 'auto');


          urloxf = "https://ziteboard.com"
          szos = "ziteboard"
          mi = "zaɪtbɔːd"
          $('#div3').css('padding', '3px 5px 3px 5px');
          $("#div3").html("<span style='vertical-align:middle'><b><a class='link' href='" + urloxf + "' target='_blank'>" + szos + ":</a></b> <i>" + mi + "</i></span>");
          $('#div3').append(' <img id="play" style="width:12px; height=12px; vertical-align:middle" src="' + url0 + 'pics/play.png" />');
          $('#div3').append(' <img id="play2" style="width:12px; height=12px; vertical-align:middle" src="' + url0 + 'pics/play.png" />');
          $('#div3').append(' <img id="play3" style="width:12px; height=12px;  vertical-align:middle" src="' + url0 + 'pics/play.png" />');
          $("#play").click(function() {
              chrome.runtime.sendMessage({
                  from: "fromContentScript",
                  reason: 'pronounce/ziteboard/1'
              }, function(response) {
                  //NOTHING TO DO
              });
          });
          $("#play2").click(function() {
              chrome.runtime.sendMessage({
                  from: "fromContentScript",
                  reason: 'pronounce/ziteboard/2'
              }, function(response) {
                  //NOTHING TO DO
              });
          });
          $("#play3").click(function() {
              chrome.runtime.sendMessage({
                  from: "fromContentScript",
                  reason: 'pronounce/ziteboard/3'
              }, function(response) {
                  //NOTHING TO DO
              });
          });

          if (how_option == '1') {
              chrome.runtime.sendMessage({
                  from: "fromContentScript",
                  reason: 'pronounce/ziteboard/' + how_option
              }, function(response) {
                  //NOTHING TO DO
              });
          }

          $('#tongue *').css('font-size', fontsize.toString() + "px");
          $('#tongue').css('overflow', 'auto');
        }
        if (long_option == '1' && isZiteboard == false) {
            chrome.runtime.sendMessage({
                from: "fromContentScript",
                reason: 'long1',
                szo: szo
            }, function(response) {
                data = response.data;
                urllon = response.url
                filteredData = $('span[class="dictentry"]:eq(0)', data)
                hanydef = $('span[class="DEF"]', filteredData).length
                hanycross = $('a[class="crossRef"]:eq(0)', filteredData).length
                if(hanydef == 0){
                  if(hanycross == 0){
                    $('#div2').css('padding', '3px 5px 3px 5px');
                    $("#div2").html("no result");
                  } else {
                    crosslink = $('a[class="crossRef"]:eq(0)', filteredData).attr('href')
                    chrome.runtime.sendMessage({
                        from: "fromContentScript",
                        reason: 'long2',
                        link: crosslink
                    }, function(response) {
                      data = response.data;
                      urllon = response.urllon
                      display_long_result();
                    })
                  }
                } else {
                    display_long_result();
                }

                function display_long_result() {
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
                      //console.log("error")
                      hanyblock = 0
                    } else if (hany1 > hany2){
                      blocks = $('span[class="Sense"]', filteredData)
                      hanyblock = hany1
                    } else {
                      blocks = $('span[class="newline Sense"]', filteredData)
                      hanyblock = hany2
                    }
                    if (longhany == "all") {
                        hany = hanyblock
                    } else {
                        hany = min([hanyblock, str2num(longhany)]);
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
                    if (  (ling_option == '1') && ($('span[class="asset_intro"]', filteredData).length > 0)  ) {
                        examples = $('span[class="cexa1g1 exa"]', filteredData);
                        src = '';
                        for (i = 0; i < str2num(hanysentence); i++) {
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
                            if (bezar == 0) {
                                $('#tongue').fadeIn("slow");
                            }
                        }
                        $('#tongue').css('overflow', 'auto');

                    } else {
                        $("#div4").html('');
                    }
                    // example sentences end

                    if (bezar == 0) {
                        $('#tongue').fadeIn('slow');
                    }

                    $('#tongue *').css('font-size', fontsize.toString() + "px");
                    $('#tongue').css('overflow', 'auto');
                }

                $('#tongue *').css('font-size', fontsize.toString() + "px");
                $('#tongue').css('overflow', 'auto');
            });
        } else if(isZiteboard == false) {
            $("#div2").html('');
        }
        // long end

        // google trans start
        if(goog_option == '1'){
            chrome.runtime.sendMessage({
                from: "fromContentScript",
                reason: 'google',
                szo: szo
            }, function(response) {
                data = response.data;
                data = data.replace("x-webkit-speech", "");
                urlgoo = response.url;
                hols = strpos(data, "gt-lang-sugg-message");
                hols = strpos(data, "gt-lang-sugg-message", hols + 10);
                hol = strpos(data, "<option SELECTED value=en", hols);
                if (hol == -1) {
                    forditas = $('#result_box', data).text()
                    //kif = /backgroundColor='#fff'">([^<]*)<\/span>/;
                    //out = data.match(kif);
                    if (forditas) {
                        $('#div1').css('padding', '3px 5px 3px 5px');
                        if(goog_option2 == '1'){
                            $('#div1').html("<b><a class='link' href='" + urlgoo + "' target='_blank'>" + szo + ":</a></b> <i id='reveal'><a style='cursor:pointer' title='"+forditas+"'>???</a></i>");
                            if (searchbox_option == "1") {
                            } else {
                                $('#div1').append(CLOSETAG + OPTIONTAG);
                            }
                            $("#reveal").click({word:forditas},function(event){
                                revword = event.data.word
                                $('#reveal').html(revword)
                            })
                        } else {
                            $('#div1').html("<b><a class='link' href='" + urlgoo + "' target='_blank'>" + szo + ":</a></b> <i>" + forditas + "</i>");
                            if (searchbox_option == "1") {
                            } else {

                                $('#div1').append(CLOSETAG + OPTIONTAG);
                            }
                        }
                    } else {
                        $('#div1').html("<b><a class='link' href='" + urlgoo + "' target='_blank'>" + szo + ":</a></b> <i></i>");
                        if (searchbox_option == "1") {
                        } else {
                            $('#div1').append(CLOSETAG + OPTIONTAG);
                        }
                    }
                } else {
                    $('#div1').html("<span style='color:red'>Warning!</span> Google Translator tries to translate to English. Visit the <a style='text-decoration:underline;' href='http://translate.google.com/?q=you+have+to+set+from+english+to+your+native+language' target='_blank'>web site</a> and set the destination language.");
                    if (searchbox_option == "1") {
                    } else {
                        $('#div1').append(CLOSETAG + OPTIONTAG);
                    }
                }
                if (forditas && bezar == 0) {
                    $('#tongue').fadeIn("slow");
                }
            });
        }
        // google trans end

        //automaric pronunciation start
        // originally it was howjsay start, but now how to pronounce (= which dictionary)
        if (how_option == '1' && isZiteboard == false) {
            if(pronunciation_option == '1'){
              chrome.runtime.sendMessage({
                  from: "fromContentScript",
                  reason: 'howjsay',
                  szo: szo.toLowerCase()
              }, function(response) {
                  // nothing to do
              });
            }
            if(pronunciation_option == '2'){
              chrome.runtime.sendMessage({
                  from: "fromContentScript",
                  reason: 'merriam',
                  szo: szo.toLowerCase()
              }, function(response) {
                  // nothing to do
              });
            }
            if(pronunciation_option == '3'){
              chrome.runtime.sendMessage({
                  from: "fromContentScript",
                  reason: 'oxfordsound',
                  automatic: true,
                  szo: szo.toLowerCase()
              }, function(response) {
                  // nothing to do
              });
            }
        }
        //automatic pronunciation end
    });
}
