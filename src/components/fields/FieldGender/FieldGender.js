$.init('FieldGender', class {

      init() {
            console.log("Loaded FieldPassword");            
            $('.FieldGender .gender').each(function() {
                  var genderValue = $(this).attr('value');
                  $(this).val(genderValue);
            });            
      }
      
});

