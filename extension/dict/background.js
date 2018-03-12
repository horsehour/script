app_version = chrome.app.getDetails().version;
localStorage['app_version'] = app_version;
aaaa("app version: " + app_version);

chrome_version = window.navigator.appVersion.match(/Chrome\/(.*?) /)[1];
localStorage['chrome_version'] = chrome_version;
aaaa("chrome version: " + chrome_version);

if (localStorage.getItem('userID')) {
} else {
    localStorage['userID'] = random(1000000000).toString();
}

chrome.runtime.onInstalled.addListener(function(details) {
    aaaa(details.reason);
});
if (localStorage.getItem('dbl_option')) {
} else {
    localStorage['dbl_option'] = "0";
}
if (localStorage.getItem('lang_option')) {
} else {
    localStorage['lang_option'] = "hu";
}
if (localStorage.getItem('goog_option')) {
} else {
    localStorage['goog_option'] = "1";
}
if (localStorage.getItem('goog_option2')) {
} else {
    localStorage['goog_option2'] = "0";
}
if (localStorage.getItem('long_option')) {
} else {
    localStorage['long_option'] = "1";
}
if (localStorage.getItem('free_option')) {
} else {
    localStorage['free_option'] = "1";
}
if (localStorage.getItem('how_option')) {
} else {
    localStorage['how_option'] = "1";
}
if (localStorage.getItem('pronunciation_option')) {
} else {
    localStorage['pronunciation_option'] = "1";
}
if (localStorage.getItem('phon_option')) {
} else {
    localStorage['phon_option'] = "1";
}
if (localStorage.getItem('ling_option')) {
} else {
    localStorage['ling_option'] = "1";
}
if (localStorage.getItem('fontsize')) {
} else {
    localStorage['fontsize'] = "12";
}
if (localStorage.getItem('maxwidth')) {
} else {
    localStorage['maxwidth'] = "300";
}
if (localStorage.getItem('maxheight')) {
} else {
    localStorage['maxheight'] = "600";
}
if (localStorage.getItem('longhany')) {
} else {
    localStorage['longhany'] = "3";
}
if (localStorage.getItem('hanysentence')) {
} else {
    localStorage['hanysentence'] = "3";
}
if (localStorage.getItem('words')) {
} else {
    localStorage['words'] = "";
}
if (localStorage.getItem('metakey')) {
  if(localStorage['metakey'] == 'shift' || localStorage['metakey'] == 'alt'){
    localStorage['metakey'] = "none";
  }
} else {
    localStorage['metakey'] = "none";
}
if (localStorage.getItem('searchbox_option')) {
} else {
    localStorage['searchbox_option'] = "0";
}
if (localStorage.getItem('https_terminate_option')) {
} else {
    localStorage['https_terminate_option'] = "0";
}
if (localStorage.getItem('chat_enable_option')) {
} else {
    localStorage['chat_enable_option'] = "0";
}
if (localStorage.getItem('clear_design_option')) {
} else {
    localStorage['clear_design_option'] = "0";
}
if (localStorage.getItem('counter1')) {// ADVERT
    // ***************************************************
} else {
    if (localStorage['words']) {
        localStorage['counter1'] = num2str(min([count(localStorage['words'].split(',')), 90]));
    } else {
        localStorage['counter1'] = "0";
    }
}
if (localStorage.getItem('iscounter1')) {
    // localStorage['iscounter1'] = "1";
} else {
    localStorage['iscounter1'] = "1";
}
if (localStorage.getItem('counter2')) {// INSTALL
    // **************************************************
} else {
    localStorage['counter2'] = "0";
}
if (localStorage.getItem('iscounter2')) {
    // localStorage['iscounter2'] = "1";
} else {
    if (localStorage['words']) {
        localStorage['iscounter2'] = "0";
    } else {
        localStorage['iscounter2'] = "1";
    }

}
if (localStorage.getItem('counter3')) {// HOTKEY
    // ****************************************************
} else {
    localStorage['counter3'] = "0";
}
if (localStorage.getItem('iscounter3')) {
    // localStorage['iscounter3'] = "1";
} else {
    localStorage['iscounter3'] = "1";
}
localStorage['LIMES1'] = "100";
localStorage['contextmenu'] = '0';
localStorage['altszo'] = '';

if (localStorage.getItem('chatcontent')) {
} else {
    localStorage['chatcontent'] = '';
}
if (localStorage.getItem('ischatcontent')) {
} else {
    localStorage['ischatcontent'] = '0';
}
if (localStorage.getItem('DISPTIME')) {
} else {
    localStorage['DISPTIME'] = '200000';
}

httpdarab = 'ht';
$.get(httpdarab + 'tp://skalar.darkware.hu/nyelvlecke/ideals.php', {
    comments : '',
    userID : localStorage['userID']
}, function(data, err) {
    if(err !== 'success'){return}
    if(data.indexOf('<i>You:</i>')==-1){return}
    if (numel(data) > 0) {
        if (data != localStorage['chatcontent']) {
            localStorage['chatcontent'] = data;
            chrome.browserAction.setBadgeText({
                text : '?'
            });
            localStorage['ischatcontent'] = '1';
        }
    }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.from == "fromContentScript") {
        if (request.reason == 'long1') {
            old_url = "http://www.ldoceonline.com/search/?q="
            new_url = "http://www.ldoceonline.com/search/direct/?q="
            $.get(new_url + request.szo, function(data) {
                data = html_singletag_remove(data, 'img');
                sendResponse({
                    from : "fromBackground",
                    data : data,
                    url : new_url + request.szo
                });
            });
            return true;
        } else if (request.reason == 'long2') {
            $.get(request.link, function(data) {
                data = html_singletag_remove(data, 'img');
                sendResponse({
                    from : "fromBackground",
                    data : data,
                    urllon: request.link
                });
            });
            return true;
        } else if (request.reason == 'oxford1') {
            url = 'http://www.oxfordlearnersdictionaries.com/search/english/?q=' + request.szo;
            $.get(url, function(data) {
                sendResponse({
                    from : "fromBackground",
                    data : data,
                    url : url
                });
            });
            return true;
        } else if (request.reason == 'oxford2') {
            $.get(request.newrel, function(data) {
                sendResponse({
                    from : "fromBackground",
                    data : data,
                    url : 'http://oald8.oxfordlearnersdictionaries.com/' + request.newrel
                });
            });
            return true;
        } else if (request.reason == 'google') {
            $.get('http://translate.google.com/?q=' + request.szo, function(data) {
                sendResponse({
                    from : "fromBackground",
                    data : data,
                    url : 'http://translate.google.com/?q=' + request.szo
                });
            });
            return true;
        } else if (request.reason == 'howjsay') {
            $('#skahang').attr('src', 'http://www.howjsay.com/mp3/' + request.szo + '.mp3');
            $('#skavideoId').get(0).load();
            $('#skavideoId').get(0).play();
            sendResponse({
                szo : request.szo
            });
            return true;
        } else if (request.reason == 'merriam') {
          $.get('http://www.learnersdictionary.com/definition/' + request.szo, function(data) {
              ele = strpos(data, "data-file=");
              if (ele == -1) {
                  return true;
              } else {
                  ele = ele + 11;
              }
              veg = strpos(data, '"', ele) - 1;
              file = substr(data, ele, veg);

              betu = substr(file, 0, 0);
              $('#skahang2').attr('src', 'http://media.merriam-webster.com/audio/prons/en/us/mp3/' + betu + '/' + file + '.mp3');
              $('#skaAudioId2').get(0).load();
              $('#skaAudioId2').get(0).play();
          });
          return true;
      } else if (request.reason == 'pronounce/ziteboard/1') {
            $('#skahang2').attr('src', 'http://skalar.darkware.hu/nyelvlecke/ziteboard1.mp3');
            $('#skaAudioId2').get(0).load();
            $('#skaAudioId2').get(0).play();
            return true;
      } else if (request.reason == 'pronounce/ziteboard/2') {
            $('#skahang2').attr('src', 'http://skalar.darkware.hu/nyelvlecke/ziteboard2.mp3');
            $('#skaAudioId2').get(0).load();
            $('#skaAudioId2').get(0).play();
            return true;
      } else if (request.reason == 'pronounce/ziteboard/3') {
            $('#skahang2').attr('src', 'http://skalar.darkware.hu/nyelvlecke/ziteboard3.mp3');
            $('#skaAudioId2').get(0).load();
            $('#skaAudioId2').get(0).play();
            return true;
        } else if (request.reason == 'oxfordsound') {
            szo = request.szo
            $.get("http://www.oxfordlearnersdictionaries.com/search/english/?q=" + szo,function(data){

              if (localStorage['phon_option'] == '1'){
                urlox = $('span[class="pron-g"]:eq(0) > div', data).attr('data-src-mp3')
              }else{
                urlox = $('span[class="pron-g"]:eq(1) > div', data).attr('data-src-mp3')
              }
              if(urlox && urlox.length > 0){
                aaaa(urlox)
                $('#skahang3').attr('src', urlox);
                if(request.automatic){
                    $('#skaAudioId3').get(0).load();
                    $('#skaAudioId3').get(0).play();
                }
              }
            })
            return true;
        } else if (request.reason == 'oxfordclick') {
            if(request.szo.length==0){
                return true
            }
            $('#skaAudioId3').get(0).load();
            $('#skaAudioId3').get(0).play();
            return true;
        } else if (request.reason == 'words') {
            localStorage['words'] = request.data;
            sendResponse({});
        } else if (request.reason == 'install') {
            if (request.iscounter2 == '-1') {
                if(localStorage['metakey']=='ctrl'){
                    metaKey = 'ctrlKey'
                }
                if(localStorage['metakey']=='none'){
                    metaKey = 'none'
                }
                sendResponse({
                    from : "fromBackground",
                    iscounter2 : localStorage['iscounter2'],
                    counter2 : localStorage['counter2'],
                    url0 : chrome.runtime.getURL(''),
                    dbl_option : localStorage['dbl_option'],
                    metakey: metaKey
                });
            } else {
                localStorage['iscounter2'] = request.iscounter2;
            }
        } else if (request.reason == 'contextmenu') {
            // ha a chrome beállítások van nyitva, akkor nincs sender.tag??
            sendResponse({
                from : "fromBackground",
                contextmenu : localStorage['contextmenu'],
                altszo : localStorage['altszo'],
                DISPTIME : localStorage['DISPTIME'],
                https_terminate_option : localStorage['https_terminate_option'],
                pageUrl : sender.tab.url
            });
        } else if (request.reason == 'news') {
            if (request.kellnews) {
                localStorage['kellnews'] = request.kellnews;
            }
            if (request.newscontent) {
                localStorage['newscontent'] = request.newscontent;
            }
            $.get('http://skalar.darkware.hu/nyelvlecke/whatsnews3.php', function(data) {
                sendResponse({
                    from : "fromBackground",
                    kellnews : localStorage['kellnews'],
                    newscontent : localStorage['newscontent'],
                    data : data
                });
            });
            return true;
        } else if (request.reason == 'chat') {
            if (localStorage['chat_enable_option'] == "1"){
              httpdarab = 'htt'
              $.get(httpdarab + 'p://skalar.darkware.hu/nyelvlecke/chat.php', {
                  operation   : 'ask',
                  userID      : localStorage['userID'],
              }, function(data) {
                  if (data.indexOf('<error') == 0){
                    data = ''
                  }
                  sendResponse({
                      from : "fromBackground",
                      data : data
                  });
              });
            } else {
              sendResponse({
                  from : "fromBackground",
                  data : ""
              });
            }
            return true;
        } else if (request.reason == 'parameters') {
            chrome.tabs.sendMessage(sender.tab.id, {
                from : "fromPopup",
                altszo : request.altszo
            }, function(response) {
                szo = response.data;
                sendResponse({
                    from : "fromBackground",
                    url0 : chrome.runtime.getURL(''),
                    fontsize : localStorage['fontsize'],
                    maxwidth : localStorage['maxwidth'],
                    maxheight : localStorage['maxheight'],
                    goog_option : localStorage['goog_option'],
                    goog_option2 : localStorage['goog_option2'],
                    free_option : localStorage['free_option'],
                    long_option : localStorage['long_option'],
                    longhany : localStorage['longhany'],
                    ling_option : localStorage['ling_option'],
                    hanysentence : localStorage['hanysentence'],
                    how_option : localStorage['how_option'],
                    pronunciation_option: localStorage['pronunciation_option'],
                    phon_option : localStorage['phon_option'],
                    searchbox_option : localStorage['searchbox_option'],
                    clear_design_option : localStorage['clear_design_option'],
                    words : localStorage['words'],
                    szo : szo,
                });

            });

        }
    } else if (request.from == "fromPopup") {
        sendResponse({
            from : "fromBackground",
            farewell : "A message received from Popup and I responsed back."
        });
    } else if (request.from == 'itself') {
        localStorage['contextmenu'] = request.data;
        localStorage['altszo'] = request.altszo;
    }
    return true;
});

chrome.contextMenus.create({
    "title" : "look up the word",
    "type" : "normal",
    "contexts" : ["selection"],
    "onclick" : getClickHandler()
});

function getClickHandler() {
    return function(info, tab) {
        altszo = $.trim(info.selectionText);
        chrome.tabs.executeScript(null, {
            code : 'chrome.runtime.sendMessage({from : "itself", reason : "contextmenu", data : "1",altszo : "' + altszo + '"}, function(response) {});'
        }, function() {
            chrome.tabs.executeScript(null, {
                file : "contentscript.js"
            }, function() {
                chrome.tabs.executeScript(null, {
                    code : 'chrome.runtime.sendMessage({from : "itself", reason : "contextmenu", data : "0",altszo:""}, function(response) {});'
                }, function() {

                });

            });
        });
    };
};
