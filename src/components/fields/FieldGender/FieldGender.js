$.init('FieldGender', class {

      init() {
            console.log("Loaded FieldGender");            
            $('.FieldGender .gender').each(function() {
                  var genderValue = $(this).attr('value');
                  $(this).val(genderValue);
            });            
      }
      
});

