/*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
//|| True Components JS
//|| Field DOB
//||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      $.init('FieldDOB', class {

            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Init
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

            init() {
                  console.log("Loaded FieldDOB");   
                  $('.FieldDOB .FieldDOBDate').each(function() {
                        const myID = $(this).attr('id');
                        $('FieldDOB').addEvents(myID);
                        $('FieldDOB').update(myID);
                  });
            }


            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Create
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

            addEvents(myID) {             
                  $('.FieldDOB .FieldDOBDay').off('change').on('change', function() { $('FieldDOB').update(myID, $(this).val()); });
                  $('.FieldDOB .FieldDOBMonth').off('change').on('change', function() { $('FieldDOB').update(myID, undefined, $(this).val()); });
                  $('.FieldDOB .FieldDOBYear').off('change').on('change', function() { $('FieldDOB').update(myID, undefined, undefined, $(this).val()); });      
            }

            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Generate Years
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

            setYear(myField, year) { 
                  myField.empty();
                  var currentYear = new Date().getFullYear();
                  for (var y = currentYear; y >= currentYear - 110; y--) {
                        myField.append($('<option></option>').val(y).html(y));
                  }            
                  myField.val(year);
            }

            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Generate and Set Days 
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

            setDay(myField, day, month, year) { 
                  myField.empty();
                  const daysInMonth = month === 2 ? (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? 29 : 28) : [4, 6, 9, 11].includes(month) ? 30 : 31;
                  for (let day = 1; day <= daysInMonth; day++) {
                        myField.append($('<option></option>').val(day).html(day));
                  }      
                  myField.val(day);   
            }      

            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Generate and Set Months
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

            setMonth(myField, month) { 
                  myField.val(month)
            }      

            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Update
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

            update(myID, upDay, upMonth, upYear) {
                  const dateInput = $('#' + myID).val();
                  const date    = new Date(dateInput);
                  const day     = (upDay !== undefined)   ? upDay   : date.getDate() + 1;
                  const month   = (upMonth !== undefined) ? upMonth : date.getMonth() + 1;
                  const year    = (upYear !== undefined)  ? upYear  : date.getFullYear();
                  if (upDay === undefined)   $('FieldDOB').setDay($('.FieldDOBDay[data-parentId="' + myID + '"]'), day, month, year);
                  if (upMonth === undefined) $('FieldDOB').setMonth($('.FieldDOBMonth[data-parentId="' + myID + '"]'), month);
                  if (upYear === undefined)  $('FieldDOB').setYear($('.FieldDOBYear[data-parentId="' + myID + '"]'), year);
                  const formattedMonth = month.toString().padStart(2, '0');
                  const formattedDay = day.toString().padStart(2, '0');
                  const newDateValue = `${year}-${formattedMonth}-${formattedDay}`;
                  $('#' + myID).val(newDateValue);            
            }
            
            


      });