//*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
//|| SCM :: Utils :: Validation
//|| Validate Logins
//||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
      //|| Util Class
      //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      import app                      from "../../sonata/app.js";
      import Recordset                from "../../sonata/utils/recordset.js"; 

      /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
      //|| Util Class
      //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      export default class AbstractLoginsCreate {

            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Check if Email Exists in Database
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

            static async existsEmail(email : string) : Promise<number | null> {
                  app.log('AbstractLoginsCreate : existsEmail()', 'info');
                  return new Promise(async (resolve) => {
                        const sql     = app.query("sql/logins/logins.exists.email.sql");
                        const results = await app.db("main").query(sql, [ email ]) as Recordset;                        
                        if (results.count > 0 && results.rows && results.rows[0] && results.rows[0].id_login) return resolve(results.rows[0].id_login as number); else return resolve(null);
                  });
            }

            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Check if PhoneExists in Database
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

            static async existsPhone(phone : string) : Promise<number | null> {
                  app.log('AbstractLoginsCreate : existsPhone()', 'info');
                  return new Promise(async (resolve) => {
                        const sql     = app.query("sql/logins/logins.exists.phone.sql");
                        const results = await app.db("main").query(sql, [ phone ]) as Recordset;
                        if (results.count > 0) return resolve(results.rows[0].id_login as number); else return resolve(null);
                  });
            }


            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Lookup Login
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

            static async lookupLogin(idLogin:number) : Promise<{ id_user : number, username : string, status : string } | null> {
                  app.log('AbstractLoginsCreate : lookupLogin()', 'info');
                  return new Promise(async (resolve) => {
                        const sql     = app.query("sql/logins/logins.lookup.users.sql");
                        const results = await app.db("main").query(sql, [ idLogin ]) as Recordset;
                        console.log("RESULTS");
                        console.log(results);
                        if (results.count > 0) {
                              const userData = {
                                    "id_user"  : results.rows[0].fid_user,
                                    "username" : results.rows[0].user_username,
                                    "status"   : results.rows[0].user_status
                              };
                              return resolve(userData); 
                        }
                        return resolve(null);
                  });
            }            

            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Create a Login Record with Phone Number
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

            static async createLoginsByPhone(id : number, phone:string) : Promise<number | null> {
                  app.log('AbstractLoginsCreate : createLoginsPhone()', 'info');
                  return new Promise(async (resolve) => {
                        const sql     = app.query("sql/logins/logins.create.phone.sql");
                        const results = await app.db("main").query(sql, [ id, phone ]) as Recordset;
                        if (typeof results.insert === "number" ) return resolve(results.insert);
                        return resolve(null);
                  });
            }

            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Create a Login Record with Email
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

            static async createLoginsByEmail(id : number, email : string) : Promise<number | null> {
                  app.log('AbstractLoginsCreate : createLoginsEmail()', 'info');
                  return new Promise(async (resolve) => {
                        const sql     = app.query("sql/logins/logins.create.email.sql");
                        const results = await app.db("main").query(sql, [ id, email ]) as Recordset;
                        if (typeof results.insert === "number" ) return resolve(results.insert);
                        return resolve(null);
                  });
            }


      }
