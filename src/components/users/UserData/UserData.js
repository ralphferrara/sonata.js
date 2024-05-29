
/*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
//|| True Components JS
//|| User Data
//||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      $.init('UserData', class { 

            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Init : User Data
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

            init() {
                  console.log("Loaded UserData");
                  this.loadCookie();
                  if ($.data('userData') === false || JSON.stringify($.data('userData')) === '{}' || $.data('userData') === undefined) return this.call("fetch", {});
                  this.populate();
            }

            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Load Cookie
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

            loadCookie() { 
                  const jwt = $.cookie('userJWT');
                  if (jwt) {
                      const userData = $.decodeJWT(jwt);
                      $.data('userData', userData);
                  }                    
                  this.debug(false);                  
            }

            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Debug
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

            debug(debugShow = false) { 
                  const userData = $.data('userData');
                  var myHTML = '';
                  for (const key in userData) myHTML += `<tr><td>${key}</td><td> ${userData[key]}</td></tr>`;
                  myHTML += "<tr><td style='width:40%' colspan=2><button onclick='$(\"UserData\").call(\"fetch\", {});'>Fetch</button>";
                  myHTML += `<tr><td colspan=2><button onclick='$(\"UserData\").call(\"setMediaProfile\",   {idMedia:243});'>Set Media Profile</button></td></tr>`;
                  myHTML += "<tr><td colspan=2><button onclick='$(\"UserData\").call(\"setMediaCover\",     {idMedia:251});'>Set Media Cover</button></td></tr>";
                  myHTML += "<tr><td colspan=2><button onclick='$(\"UserData\").call(\"clearMediaProfile\", {});'>Clear Media Profile</button></td></tr>";
                  myHTML += "<tr><td colspan=2><button onclick='$(\"UserData\").call(\"clearMediaCover\", {});'>Clear Media Cover</button></td></tr>";
                  $('div#userDataDebug .dataHere').html('<table>' + myHTML + '</table>');
                  $('div#userDataDebug').toggle(debugShow);
            }

            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Call Service
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

            call(myService, myData = {}) {
                  var myURL = null;
                  switch( myService ) {
                        case "fetch"                  : myURL = "/users/data.fetch";                              break;
                        case "setMediaProfile"        : myURL = "/users/set.media?area=profile";                  break;
                        case "setMediaCover"          : myURL = "/users/set.media?area=cover";                    break;
                        case "clearMediaProfile"      : myURL = "/users/set.media?area=profile&clear=true";       break;
                        case "clearMediaCover"        : myURL = "/users/set.media?area=profile&clear=true";       break;
                  }
                  myData['service'] = myService;
                  $('chirp').send(myURL, myData, { 'method' : 'POST', 'obj' : $('UserData') } );
            }

            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Data
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

            data(key, value) {
                  const userData = $.data('userData');
                  if (userData === false || JSON.stringify(userData) === '{}' || userData === undefined) return;
                  if (value !== undefined) {
                        userData[key] = value;
                        $.data('userData', userData);
                        return;
                  }
                  return userData[key];
            }            

            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Populate
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

            populate() {
                  console.log("UserData::Populate()");
                  /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
                  //|| Populate
                  //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/
                  $("UserData").loadCookie();
                  const userData = $.data('userData');                  
                  /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
                  //|| Populate Cover
                  //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/
                  console.log("Setting UploadCover to ["+userData['fid_media_cover']+"] : " + userData['cover.720']);
                  $("div[data-user='cover.300']").css('background-image', `url(${userData['cover.300']})`);
                  $("div[data-user='cover.720']").css('background-image', `url(${userData['cover.720']})`);
                  /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
                  //|| Populate Profile
                  //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/
                  console.log("Setting UploadProfile to ["+userData['fid_media_profile']+"] : " + userData['profile.300']);
                  $("img[data-user='profile.300']").attr("src", userData['profile.300']);
                  $("img[data-user='profile.720']").attr("src", userData['profile.720']);
            }

            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| On Success
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

            onSuccess(data) {
                  console.log("UserData::onSuccess()");
                  console.log(data);
                  switch(data.service) {
                        case "fetch"  : 
                              console.log("UserData::onSuccess()::fetch");
                              break;
                  }
                  console.log(data);
                  $('UserData').populate();
            }

            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| On Error
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

            onError(data) {
                  console.log(data);
            }

            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| EOC
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      });
