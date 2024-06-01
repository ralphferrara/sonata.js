/*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
//|| True Components JS
//|| Modal Register
//||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      $.init('AuthVerification', class { 
            
            modal(data) {
                  $('#verificationToken').remove();
                  $('#verificationType').remove();
                  $('#verificationCode').append('<input type="hidden" name="token" id="verificationToken" value="'+data.token+'" />');
                  $("#modalVerification").show();
            };

            onError(result)  { 
                  console.log('AUTH Verify ERROR');
                  console.log(result.data); 
                  $("ModalSnackBar").create(result.data.errors);
            };

            onSuccess() {
                  console.log('AUTH Verify SUCCESS');
                  $("ModalSnackBar").create(`[[YOUR_ACCOUNT_HAS_BEEN_VERIFIED]]`);
                  $('#modalVerification').hide();
                  window.location.href = '/members/profile/complete/';
            };

      });