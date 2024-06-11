/*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
//|| True Components JS
//|| Modal Login
//||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      $.init('AuthLogin', class {

            init() {
                  console.log("Loaded AuthLogin");
            }

            onError(data) {
                  alert("FAILED");
                  console.log(data);
                  $("ModalSnackBar").create(data.errors);
            };

            onSuccess(data) {
                  $("ModalSnackBar").create(data.message);
                  $("LoginData").loadCookie();
                  $("LoginData").redirect();
            };

      });