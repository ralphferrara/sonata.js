$.init('AuthRegister', class {

      init() {
            console.log("Loaded AuthRegister");
      }

      onError(data) {
            console.log('AUTH REGISTER ERROR');
            console.log(data);
            $("ModalSnackBar").create(data.errors);
      };

      onSuccess(data) {
            $("ModalSnackBar").create(`[[YOUR_ACCOUNT_HAS_BEEN_CREATED]]`);
            $('#modalRegister').hide();
            $('AuthVerification').modal(data);
      };

});