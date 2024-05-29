
$.init('NavPublic', class {

      init() {
            console.log('Loaded NavPublic');
      }
      
      onError(data) {
            console.log('AUTH REGISTER ERROR');
            console.log(data);
            $("ModalSnackBar").create(data.errors);
      };

      onSuccess(data) {
            console.log('AUTH REGISTER SUCCESS');
            console.log(data);
            $("ModalSnackBar").create(`[[YOUR_ACCOUNT_HAS_BEEN_CREATED]]`);
            $('#modalRegister').hide();
            $('AuthVerification').modal(data);
      };

});