(function(global) {
      // Define the Device plugin
      var Device = {
          isMobile: function() {
              return /Mobi|Android/i.test(navigator.userAgent);
          },
  
          isTablet: function() {
              return /Tablet|iPad/i.test(navigator.userAgent);
          },
  
          isDesktop: function() {
              return !this.isMobile() && !this.isTablet();
          },
  
          getBrowser: function() {
              var userAgent = navigator.userAgent;
              var browserName = "Unknown";
  
              if (/chrome|crios|crmo/i.test(userAgent)) {
                  browserName = "Chrome";
              } else if (/firefox|iceweasel|fxios/i.test(userAgent)) {
                  browserName = "Firefox";
              } else if (/safari/i.test(userAgent) && !/chrome|crios|crmo/i.test(userAgent)) {
                  browserName = "Safari";
              } else if (/msie|trident/i.test(userAgent)) {
                  browserName = "Internet Explorer";
              } else if (/edge|edg/i.test(userAgent)) {
                  browserName = "Edge";
              } else if (/opera|opr\//i.test(userAgent)) {
                  browserName = "Opera";
              }
  
              return browserName;
          },
  
          getScreenSize: function() {
              return {
                  width: window.innerWidth,
                  height: window.innerHeight
              };
          },
  
          hasFrontCamera: async function() {
              return await this._hasCamera('user');
          },
  
          hasBackCamera: async function() {
              return await this._hasCamera('environment');
          },
  
          _hasCamera: async function(facingMode) {
              if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
                  return false;
              }
  
              const devices = await navigator.mediaDevices.enumerateDevices();
              return devices.some(device => device.kind === 'videoinput' && device.label.toLowerCase().includes(facingMode));
          }
      };
  
      // Attach Device methods to the Lib namespace
      global.Lib = global.Lib || {};
      global.Lib.validate = Validate;
  })(window);
  