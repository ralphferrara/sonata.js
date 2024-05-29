(function(global) {
      // Define the validation plugin
      var Validate = {
          isValidEmail: function(value) {
              var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              return emailPattern.test(value);
          },
  
          isValidPhone: function(value) {
              var phonePattern = /^\+?[1-9]\d{1,14}$/;
              return phonePattern.test(value);
          },
  
          isValidPassword: function(value) {
              var passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
              return passwordPattern.test(value);
          },
  
          isValidString: function(value) {
              return typeof value === 'string';
          },
  
          isValidInteger: function(value) {
              var integerPattern = /^-?\d+$/;
              return integerPattern.test(value);
          },
  
          isValidURL: function(value) {
              var urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
              return urlPattern.test(value);
          },
  
          isValidDate: function(value) {
              var datePattern = /^\d{4}-\d{2}-\d{2}$/;
              return datePattern.test(value);
          },
  
          isValidTime: function(value) {
              var timePattern = /^([01]\d|2[0-3]):?([0-5]\d)$/;
              return timePattern.test(value);
          },
  
          isValidCreditCard: function(value) {
              var creditCardPattern = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9]{2})[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
              return creditCardPattern.test(value);
          },
  
          isValidPostalCode: function(value) {
              var postalCodePattern = /^[A-Za-z\d\s\-]{3,10}$/;
              return postalCodePattern.test(value);
          }
      };
  
      // Attach validation methods to the Lib.fn prototype
      Object.keys(Validate).forEach(function(key) {
          Lib.fn[key] = function() {
              return this.elements[0] ? Validate[key](this.elements[0].value) : false;
          };
      });
  
      global.Lib = global.Lib || {};
      global.Lib.validate = Validate;
  })(window);
  