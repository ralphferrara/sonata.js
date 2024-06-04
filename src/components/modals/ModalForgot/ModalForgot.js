/*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
//|| True Components JS
//|| Modal Register
//||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      $.init('AuthForgot', class {

            init() {
                  console.log("Loaded AuthForgot");
            }

            onError(data) {
                  console.log('AUTH FORGOT ERROR');
                  console.log(data);
                  $("ModalSnackBar").create(data.errors);
            };

            onSuccess(data) {
                  $("ModalSnackBar").create(`[[CODE_SENT]]`);
                  $('#modalForgot').hide();
                  $('AuthVerification').modal(data);
            };

      }); 
