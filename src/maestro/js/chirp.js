//*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
//|| Maestro.js :: Public Library
//|| CHIRP Class -> Handles data processing to services
//||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      $.init('chirp', class {

            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Constructor!
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/    

            passThru = null;

            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Constructor!
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/    

            constructor() { }

            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Constructor!
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/    

            send(url, data, options) {
                  console.log("--------------| CHIRP SEND | --------------");
                  console.log(url);
                  console.log(data); 
                  /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
                  //|| Set The Request Data
                  //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/    
                  var route        = new URL(url, window.location.origin).pathname;  // Strips query string and uses only the pathname
                  var data         = data;
                  var obj          = null;
                  var method       = 'POST';
                  /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
                  //|| Handle Options
                  //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/    
                  if (typeof(options) == 'object') { 
                        method            = (typeof(options.method) !== 'undefined') ? options.method : $.data('config').routes[route].method;  
                        obj               = (typeof(options.obj)    !== 'undefined') ? options.obj    : null;
                        this.passThru     = (typeof(options.passThru) !== 'undefined') ? options.passThru : null;
                  }
                  /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
                  //|| Get the Object
                  //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/    
                  if (obj === null) {
                        /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
                        //|| Check for Route
                        //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/    
                        var routes = $.data('config').routes;
                        if (typeof(routes[route]) == 'undefined')             return $("ModalSnackBar").create("ROUTE-NF:  ["+route+"]");
                        var name         = $.data('config').routes[route].name;
                        if (typeof($._data.requires[name]) === 'undefined')   return $("ModalSnackBar").create("ROUTE-OBJ-NF: ["+name+"]");
                        var obj          = $._data.requires[name];
                  }
                  /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
                  //|| Get processing / Old browser support
                  //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/    
                  var xhr = new XMLHttpRequest();
                  xhr.open(method, url, true);
                  /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
                  //|| Handle Form Data
                  //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/    
                  if (data instanceof FormData) {                        
                        xhr.setRequestHeader('Accept', 'application/json');
                  } else {
                        xhr.setRequestHeader('Content-Type', 'application/json');
                        data = JSON.stringify(data); 
                  }
                  /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
                  //|| Headers
                  //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/    
                  if ($('meta[name="csrf-token"]').length > 0) xhr.setRequestHeader('CSRF-Token',  $('meta[name="csrf-token"]').attr('content'));
                  /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
                  //|| Success
                  //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/    
                  xhr.onload = function() {   
                        var status   = xhr.status;
                        var response = xhr.responseText;
                        try { 
                              console.log(response);
                              response = (typeof(response) == 'object') ? response : JSON.parse(response);                                
                              var respData = response || { message: error.message };
                        } catch(e) {
                              $("ModalSnackBar").create("BAD-JSON: ["+url +"|"+ xhr.status + "]");
                              console.log(response);
                              console.log(e);
                              return false;
                        }
                        return $('chirp').route(route, status, respData, obj);                        
                  };
                  /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
                  //|| Error
                  //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/    
                  xhr.onerror = function() {
                        $("ModalSnackBar").create("ERROR-COMM: ["+name +"|"+ xhr.status + "]");
                  };
                  /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
                  //|| Send
                  //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/    
                  return xhr.send(data);
            }

            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Route
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

            route(route, code, data, obj) {
                  if (typeof(obj.onSuccess) != 'function')                   return alert("Configuration Error: Success Method  ["+route+"] object not found");
                  if (typeof(obj.onError)   != 'function')                   return alert("Configuration Error: Error Method    ["+route+"] object not found");            
                  if (code == 200) obj.onSuccess(data); else obj.onError(data);
            }

            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| CSRF
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

            csrf() {
                  return $('chirp').send('/maestro/csrf', {});
            }

            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Create
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/
            
            handleForm(myForm) { 
                  var route  = $(myForm).attr('action');
                  var postData = new FormData(myForm);
                  /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
                  //|| Disable Form
                  //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/
                  $(myForm).find('input,select,button').each(function() {                        
                        //$(this).attr('disabled', true);
                  });
                  /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
                  //|| Get Route
                  //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/
                  return $('chirp').send(route, postData);
            }
            
            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| EOC
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/
      
      });

      /*=====================================================================================================================||
      || Load the Configuration
      ||=====================================================================================================================|| */      

      $('chirp').send('/maestro/config', {}, { 'method' : 'POST', 'obj' : $('Config') } );
