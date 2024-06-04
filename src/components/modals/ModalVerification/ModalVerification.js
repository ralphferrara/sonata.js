/*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
//|| True Components JS
//|| Modal Register
//||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      $.init('AuthVerification', class { 
            
            modal(data) {
                  console.log(data);
                  $('#verificationToken').remove();
                  $('#verificationType').remove();
                  $('#verificationCode').append('<input type="hidden" name="token" id="verificationToken" value="'+data.token+'" />');
                  $('#verificationCode').append('<input type="hidden" name="area" id="verficationArea" value="'+data.area+'" />');
                  $("#modalVerification").show();
            };

            onError(data)  { 
                  console.log('AUTH Verify ERROR');
                  console.log(data); 
                  $("ModalSnackBar").create(data.error.message);
            };

            onSuccess(data) {
                  console.log('AUTH Verify SUCCESS');
                  console.log(data);
                  $("ModalSnackBar").create(`[[VERIFICATION_SUCCESS]]`);
                  $('#modalVerification').hide();
                  window.location.href = '/auth/verified?jwtVerified=' + data.jwtVerified;
            };

      });