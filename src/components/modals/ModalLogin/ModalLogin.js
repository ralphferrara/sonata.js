$.init('AuthLogin', class {

      init() {
            console.log("Loaded AuthLogin");
      }

      onError(data) {
            console.log(data);
            $('snackbar').show(data.errors);
      };

      onSuccess(data) {
            console.log('AUTH LOGIN SUCCESS');
      };

});