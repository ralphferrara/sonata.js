
$.init('NavPublic', class {

      init() {
            console.log('Loaded NavPublic');
      }
      
      onError(data) {
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