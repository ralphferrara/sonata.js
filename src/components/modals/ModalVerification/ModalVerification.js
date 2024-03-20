$.init('AuthVerification', class { 
        modal(data) {
              $.modal('modalVerification','verification',{'csrf' : true});
              var keys = Object.keys(data);
              for (var i = 0; i < keys.length; i++) {
                    $('#code').append('<input type="text" name="' + keys[i] + '" value="' + data[keys[i]] + '" /><br>');
              }
        };

        onError(result)  { 
              console.log('AUTH Verify ERROR');
              console.log(result.data); 
              $('snackbar').show(result.data.errors);
        };

        onSuccess() {
              console.log('AUTH Verify SUCCESS');
              $('snackbar').show('Your account has been verified.');
              $('#modalRegister').hide();
        };
        
  });