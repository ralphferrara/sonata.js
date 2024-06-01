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
                  $("ModalSnackBar").create(`[[YOUR_ACCOUNT_HAS_BEEN_CREATED]]`);
                  $('#modalForgot').hide();
                  $('AuthVerification').modal(data);
            };

      }); 
