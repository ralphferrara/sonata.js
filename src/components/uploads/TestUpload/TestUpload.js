
$.init('UploadMedia', class {

      init() {
            console.log('Loaded UploadMedia');
      }
      
      onError(data) {
            console.log('UploadMedia ERROR');
            console.log(data);
      };

      onSuccess(data) {
            console.log('UploadMedia SUCCESS');
            console.log(data);
      };

});