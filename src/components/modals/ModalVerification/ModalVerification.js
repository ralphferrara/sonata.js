$.init('AuthVerification', class { 
      
      modal(data) {
            $('#verificationToken').remove();
            $('#verificationType').remove();
            $.modal('modalVerification','verification',{'csrf' : true});
            $('#verificationCode').append('<input type="hidden" name="token" id="verificationToken" value="'+data.token+'" />');
            console.log("HERE");
      };

      onError(result)  { 
            console.log('AUTH Verify ERROR');
            console.log(result.data); 
            $('snackbar').show(result.data.errors);
      };

      onSuccess() {
            console.log('AUTH Verify SUCCESS');
            $('snackbar').show('Your account has been verified.');
            $('#modalVerification').hide();
      };

});