//*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
//|| Maestro.js :: Public Library
//|| Maestro Class -> Loads Zepto and Global, adds basic functionality to Zepto
//||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
      //|| Actually load Zepto
      //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/      
      console.log("Zepto loaded successfully");
      $.fn.fadeOut = function(duration, callback) {
            const interval    = 200;           
            const steps       = Math.ceil(duration / interval);
            function fadeStep(step) {
                  this.css('opacity', 1 - step * (1 - 0) / steps);          
                  if (step < steps) {
                        setTimeout(() => fadeStep.call(this, step + 1), interval);
                  } else {
                        this.css('display', 'none');
                        if (callback) callback();
                  }
            }          
            this.each(function() { fadeStep.call($(this), 0); });
            return this;
      };      
      /*=====================================================================================================================||
      || Cookie Function
      ||=====================================================================================================================|| */
      $.cookie = (name, value, options) => {
            if (typeof value !== 'undefined') {
                  options = options || {};
                  let cookieString = `${name}=${encodeURIComponent(value)}`;                  
                  if (options.expires) {
                        let date;
                        if (typeof options.expires === 'number') {
                              date = new Date();
                              date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
                        } else {
                              date = options.expires;
                        }
                        cookieString += `; expires=${date.toUTCString()}`;
                  }
                  if (options.path)       cookieString += `; path=${options.path}`;
                  if (options.domain)     cookieString += `; domain=${options.domain}`;
                  if (options.secure)     cookieString += `; secure`;
                  if (options.sameSite)   cookieString += `; SameSite=${options.sameSite}`;
                  if (options.httpOnly)   cookieString += `; HttpOnly`;
                  document.cookie =       cookieString;
            } else {
                  const cookieValue = document.cookie.split('; ').find(row => row.startsWith(`${name}=`));
                  return cookieValue ? decodeURIComponent(cookieValue.split('=')[1]) : null;
            }
      };
      /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
      //|| Decode JWT
      //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/
      $.decodeJWT = (token) => {
            const payload = token.split('.')[1];
            const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
            return JSON.parse(decoded);
      };
      /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
      //|| Additional Zepto Var
      //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/
      $._data     = {'requires' : {}, 'config' : {}};
      /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
      //|| Additional Zepto Functions
      //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/
      $.getScript = (url, callback) => {
            if (document.querySelector(`script[src="${url}"]`)) return callback && callback();
            const s = document.createElement('script');
            s.async = 1;
            s.onload = s.onreadystatechange = (e) => {
                  if (!e.type || /loaded|complete/.test(s.readyState)) {
                        s.onload = s.onreadystatechange = null;
                        document.head.removeChild(s);
                        callback && callback();
                  }
            };
            s.src = url;
            document.head.appendChild(s);
      };
      /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
      //|| Additional Zepto Functions
      //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/
      $.data      = (key, val) => {  if (val === undefined) return $._data[key]; else $._data[key] = val;  }
      /*=====================================================================================================================||
      || Basic Shortscript Functions
      ||=====================================================================================================================|| */
      $.isset   = (ar, v, ie) => { var e = (typeof(ie) == 'undefined') ? null : ie; return (typeof(ar[v]) == 'undefined') ? e : ar[v]; };
      $.default = (sysDef, userDef) => {
            if (typeof(userDef) == 'undefined') return sysDef;
            var k = Object.keys(sysDef); 
            for(var i=0;i<k.length;i++) if (typeof(userDef[k[i]])=='undefined') userDef[k[i]]=sysDef[k[i]];
            return userDef; 
      };
      /*=====================================================================================================================||
      || Math Functions
      ||=====================================================================================================================|| */
      $.random = (min,max) => { return Math.floor(Math.random() * (typeof(max) == 'number') ? max : 999999 + (typeof(min) == 'number') ? min : 0); }
      $.guid   = () => { return 'xxxxx-xxxxx-xxxxx-xxxxx'.replace(/[xy]/g, (c) => { var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8); return v.toString(16); }); }
      /*=====================================================================================================================||
      || Modal
      ||=====================================================================================================================|| */
      $.modal = (id,cls,options) => {
            console.log("Opening Modal: " + id);
            if ($('#'+id).length == 0) return $("ModalSnackBar").create('MODAL-NF: ' + id);
            if (typeof(options) == 'undefined') options = {};
            if (typeof(options.csrf) != 'undefined') $('chirp').csrf();
            $('#'+id).addClass('active').css('display', 'block');
            $('#'+id).css('opacity', 1);            
            $('#'+id).find('.close').on('click', () => { $('#'+id).hide(); } );
      };
      /*=====================================================================================================================||
      || Components
      ||=====================================================================================================================|| */
      $.random = (min,max) => { return Math.floor(Math.random() * (typeof(max) == 'number') ? max : 999999 + (typeof(min) == 'number') ? min : 0); }
      /*=====================================================================================================================||
      || Is Loaded
      ||=====================================================================================================================|| */
      $.isLoaded = (c) => { return (typeof($._data.requires[c]) !== 'undefined'); }
      /*=====================================================================================================================||
      || Initialize Maestro
      ||=====================================================================================================================|| */
      $.init    = function(c,o)       {
            $._data.requires[c]  = new o;
            if (typeof($._data.requires[c].init) == 'function') $._data.requires[c].init();
      };          
      /*=====================================================================================================================||
      || Add the Maestro Classes to Zepto Calls
      ||=====================================================================================================================|| */
      (function ($) {
            var originalInit = $.zepto.init;
            $.zepto.init = function (selector, context) {
                  if (typeof($._data.requires[selector]) !== 'undefined') return $._data.requires[selector];          
                  var result = originalInit.call(this, selector, context);
            return result;
            };
      })(Zepto);