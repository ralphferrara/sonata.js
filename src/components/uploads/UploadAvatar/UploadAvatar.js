/*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
//|| True Components JS
//|| UploadAvatar
//||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      $.init('UploadAvatar', class {

            init() {
                  console.log('Loaded UploadAvatar');
            }
            
            onError(data) {
                  console.log('UploadAvatar ERROR');
                  console.log(data);
            };

            onSuccess(data) {
                  console.log('UploadAvatar SUCCESS');
                  console.log(data);
            };

      });