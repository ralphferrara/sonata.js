/*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
//|| True Components JS
//|| Modal Login
//||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      $.init('AuthLogin', class {

            init() {
                  console.log("Loaded AuthLogin");
            }

            onError(data) {
                  console.log(data);
                  $("ModalSnackBar").create(data.errors);
            };

            onSuccess(data) {
                  console.log('AUTH LOGIN SUCCESS');
                  $("ModalSnackBar").create(data.message);
                  setInterval(() => {
                        window.location.href = '/members/profile/complete/';
                  }, 1000);
            };

      });