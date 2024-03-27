$.init('AuthRegister', class { 
        modal() {
              $.modal('modalRegister','register',{'csrf' : true});
              this.changeForm($('#tabEmail'), 'registerEmail');                  
        };

        changeForm(myLink, form) {
              $('#modalRegister form').hide();
              $('#modalRegister li').removeClass('selected');
              $(myLink).addClass('selected');
              $('#'+form).show();
        };

        onError(data)  { 
              console.log('AUTH REGISTER ERROR');
              console.log(data); 
              $('snackbar').show(data.errors);
        };

        onSuccess(data) {                  
              console.log('AUTH REGISTER SUCCESS');
              console.log(data);
              $('snackbar').show('Your account has been created. Please check your email/phone for a verification code.');
              $('#modalRegister').hide();
              $('AuthVerification').modal(data);
        };
        
  });