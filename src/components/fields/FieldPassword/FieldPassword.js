$.init('FieldPassword', class {

      init() {
            console.log("Loaded FieldPassword");
            $('.FieldPassword .togglePasswordShow').click(function() {
                  var passwordInput = $(this).parent().parent().find('.passwordInput');
                  var type = passwordInput.attr('type') === 'password' ? 'text' : 'password';
                  passwordInput.attr('type', type);
                  $(this).toggleClass('fa-eye fa-eye-slash');
            });            
      }
      
});

