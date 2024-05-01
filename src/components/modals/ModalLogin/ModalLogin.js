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
            $('snackbar').show(data.message);
            document.cookie = `loginJWT=${data.loginJWT}; path=/`;
            setInterval(() => {
                  window.location.href = '/members/profile/complete/';
            }, 1000);
      };

});