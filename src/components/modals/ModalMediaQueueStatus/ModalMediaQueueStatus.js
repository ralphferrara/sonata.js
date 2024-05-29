/*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
//|| True Components JS
//|| Media Status
//||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      $.init('ModalMediaQueueStatus', class { 

            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Var
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

            updateTimeout  = null;
            updateInterval = null;
            intervalTime   = 2500;    
            updatePending  = false;
            callURL        = '/status/media';

            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Init : Assign Event to File Change
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

            init() {
                  $.data("mmqsQueue", []);
                  $('.modalMediaQueueStatus').hide();
                  // $('ModalMediaQueueStatus').add('test.jpg', '', 'image', () => {}, () => {}, 'QUEUED');
                  // $('ModalMediaQueueStatus').add('test.jpg', '', 'image', () => {}, () => {}, 'PENDNG');
                  // $('ModalMediaQueueStatus').add('test.jpg', '', 'image', () => {}, () => {}, 'PROCES');
                  // $('ModalMediaQueueStatus').add('test.jpg', '', 'image', () => {}, () => {}, 'SUCCES');
                  // $('ModalMediaQueueStatus').add('test.jpg', '', 'image', () => {}, () => {}, 'ERROR');
            }

            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Track
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

            gsQueue(setValue){ 
                  if (setValue !== undefined) {
                        console.log("WRIRING QUEUE");
                        console.log(setValue);      
                        $.data("mmqsQueue", setValue);
                  }
                  return $.data("mmqsQueue");
            }
            
            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Track
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/
            
            add(filename, jwtStatus, mediaType, onSuccess, onError, status = 'PENDNG') {
                  var queueItem = {
                        "filename"        : filename,
                        "type"            : mediaType,
                        'jwtStatus'       : jwtStatus,
                        'status'          : status,
                        'onSuccess'       : onSuccess,
                        'onError'         : onError,
                        'created'         : new Date(),                       
                        'updated'         : new Date(),                                                
                  };
                  var myQueue = $("ModalMediaQueueStatus").gsQueue();                  
                  myQueue.push(queueItem);
                  $("ModalMediaQueueStatus").gsQueue(myQueue);
                  $("ModalMediaQueueStatus").updateList();
                  this.getStatus();
            };

            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Update List
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/
            
            updateList() {
                  var myQueue = $("ModalMediaQueueStatus").gsQueue();                  
                  var myHTML = '';
                  $('.modalMediaQueueStatus').toggle(myQueue.length > 0);
                  for (var i = 0; i < myQueue.length; i++) {
                        console.log(i + " => ");
                        console.log(myQueue[i]);
                        myHTML += $("ModalMediaQueueStatus").itemList(myQueue[i].filename, myQueue[i].type, myQueue[i].status);
                  }
                  $('div.modalMediaQueueStatus').html("<ul>" + myHTML + "</ul>");
            };

            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| List Item
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

            itemList(filename, type, status) {
                  console.log('status  => ' + status);
                  var myCode = 'ERROR';
                  switch(status) { 
                        /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
                        //|| Pending
                        //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/
                        case "PENDNG" : myCode = "PENDNG"; break;
                        case "QUEUED" : myCode = "QUEUED"; break;
                        case "PROCES" : myCode = "PROCES"; break;
                        /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
                        //|| Completed
                        //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/
                        case "SUCCES" :  
                        case "APPRA"  :  
                        case "APPRB"  :  
                        case "READY"  : myCode = "SUCCES"; break;
                        /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
                        //|| Failed
                        //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/                        
                        default       : myCode = "ERROR"; break;
                  }                 
                  console.log("CODE => " + myCode); 
                  var myTemp = '<li>' +$('#MediaQueueStatusItem-' + myCode).html() + '</li>';
                  myTemp = myTemp.replace('{{FILENAME}}',   filename);
                  myTemp = myTemp.replace('{{TYPE}}',       type);
                  myTemp = myTemp.replace('{{STATUS}}',     status);
                  return myTemp;
            } 

            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Get Status
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

            getStatus() {                  
                  var myQueue = $('ModalMediaQueueStatus').gsQueue();
                  console.log('Get Status');
                  console.log(myQueue);
                  var checkList = [];
                  for (var i = 0; i < myQueue.length; i++) {
                        checkList.push({
                              'jwtStatus'    : myQueue[i].jwtStatus,
                              'type'         : myQueue[i].type
                        });
                  }
                  if (checkList.length > 0) window.setTimeout(() => {
                        $('chirp').send($('ModalMediaQueueStatus').callURL, { 'statusQueue' : checkList }, { obj : $('ModalMediaQueueStatus') });
                  }, this.intervalTime);
            };
            
            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| On Successful Response
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

            onSuccess(data) {
                  var myQueue = $('ModalMediaQueueStatus').gsQueue();
                  console.log('On Success');
                  console.log(myQueue);
                  console.log(data.statusQueue);
                  for (var i = 0; i < data.statusQueue.length; i++) {
                        for (var j = 0; j < myQueue.length; j++) {
                              if (myQueue[j].jwtStatus == data.statusQueue[i].jwtStatus) {
                                    myQueue[j].id              = data.statusQueue[i].id;
                                    myQueue[j].status          = data.statusQueue[i].status;
                                    myQueue[j].error           = data.statusQueue[i].error;
                                    myQueue[j].mediaURL        = data.statusQueue[i].mediaURL;
                                    myQueue[j].updated         = new Date();
                              }
                        }
                  }
                  var myQueue = $('ModalMediaQueueStatus').gsQueue(myQueue);
                  console.log('THIS QUEUE');
                  console.log(myQueue);
                  for (var j = 0; j < myQueue.length; j++) {
                        console.log(myQueue[j]);
                        switch(myQueue[j].status) { 
                              /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
                              //|| Pending
                              //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/
                              case "PENDNG" : 
                              case "QUEUED" :
                              case "PROCES" : break; console.log('STILL PROCESSING');
                              /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
                              //|| Completed
                              //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/
                              case "SUCCES" : 
                              case "APPRA"  : 
                              case "APPRB"  : 
                              case "READY"  : 
                                    if (myQueue[j].onSuccess) myQueue[j].onSuccess(myQueue[j]);
                                    myQueue.splice(j, 1);
                                    $("ModalSnackBar").create(`[[MEDIA_UPLOADED_SUCCESSFULLY]]`, {'type' : 'SUCCESS'});
                                    break;
                              /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
                              //|| Failed
                              //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/                        
                              default       :
                                    if (myQueue[j].onError) myQueue[j].onError(myQueue[j]);
                                    myQueue.splice(j, 1);
                                    $("ModalSnackBar").create(`[[MEDIA_UPLOAD_FAILED]]`, {'type' : 'ERROR'}); 
                                    break;
                        }
                  }     
                  $('ModalMediaQueueStatus').gsQueue(myQueue);
                  $('ModalMediaQueueStatus').updateList(); 
                  if (myQueue.length > 0) window.setTimeout(this.getStatus, $('ModalMediaQueueStatus').updateInterval);            
            };     
                        
            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Medua Queue Status Error
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

            onError(data) {
                  $('ModalMediaQueueStatus').onSuccess(data);
            };            

            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| EOC
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      });     