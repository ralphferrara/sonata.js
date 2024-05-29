(function(global) {
      // Define the framework constructor
      var Lib = function(selector) {
          return new Lib.fn.init(selector);
      };
  
      // To keep track of loaded scripts
      var loadedScripts = {};
      var pluginPaths = {};
  
      // Prototype with basic functions
      Lib.fn = Lib.prototype = {
          constructor: Lib,
  
          // Initialization
          init: function(selector) {
              if (!selector) {
                  return this;
              }
  
              if (typeof selector === 'string') {
                  this.elements = document.querySelectorAll(selector);
              } else if (selector.nodeType) {
                  this.elements = [selector];
              } else if (selector instanceof NodeList || Array.isArray(selector)) {
                  this.elements = selector;
              }
  
              return this;
          },
  
          // Iterate over elements
          each: function(callback) {
              [].forEach.call(this.elements, callback);
              return this;
          },
  
          // Add a class
          addClass: function(className) {
              return this.each(function(el) {
                  el.classList.add(className);
              });
          },
  
          // Remove a class
          removeClass: function(className) {
              return this.each(function(el) {
                  el.classList.remove(className);
              });
          },
  
          // Append HTML content
          append: function(content) {
              return this.each(function(el) {
                  if (typeof content === 'string') {
                      el.insertAdjacentHTML('beforeend', content);
                  } else if (content.nodeType) {
                      el.appendChild(content);
                  }
              });
          },
  
          // Prepend HTML content
          prepend: function(content) {
              return this.each(function(el) {
                  if (typeof content === 'string') {
                      el.insertAdjacentHTML('afterbegin', content);
                  } else if (content.nodeType) {
                      el.insertBefore(content, el.firstChild);
                  }
              });
          },
  
          // Hide elements
          hide: function() {
              return this.each(function(el) {
                  el.style.display = 'none';
              });
          },
  
          // Show elements
          show: function() {
              return this.each(function(el) {
                  el.style.display = '';
              });
          },
  
          // Get or set attributes
          attr: function(name, value) {
              if (value === undefined) {
                  return this.elements[0] ? this.elements[0].getAttribute(name) : null;
              } else {
                  return this.each(function(el) {
                      el.setAttribute(name, value);
                  });
              }
          },
  
          // Remove attributes
          removeAttr: function(name) {
              return this.each(function(el) {
                  el.removeAttribute(name);
              });
          },
  
          // Add event listener
          on: function(event, handler) {
              return this.each(function(el) {
                  el.addEventListener(event, handler);
              });
          },
  
          // Remove event listener
          off: function(event, handler) {
              return this.each(function(el) {
                  el.removeEventListener(event, handler);
              });
          }
      };
  
      // Method to dynamically load a script if not already loaded
      Lib.require = function(script, callback) {
          if (loadedScripts[script]) {
              if (callback) callback();
          } else {
              var scriptElement = document.createElement('script');
              scriptElement.src = script;
              scriptElement.onload = function() {
                  loadedScripts[script] = true;
                  if (callback) callback();
              };
              document.head.appendChild(scriptElement);
          }
      };
  
      // Method to register plugin paths
      Lib.register = function(pluginName, scriptPath) {
          pluginPaths[pluginName] = scriptPath;
      };
  
      // Method to dynamically use a plugin
      Lib.plug = function(pluginName, callback) {
          var script = pluginPaths[pluginName];
          if (script) {
              Lib.require(script, callback);
          } else {
              console.error('Plugin not registered:', pluginName);
          }
      };
  
      // Make the init function inherit from Lib.fn
      Lib.fn.init.prototype = Lib.fn;
  
      // Expose the framework to the global object
      global.$ = Lib;
  
  })(window);
  