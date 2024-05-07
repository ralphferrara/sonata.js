//*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
//|| SCM :: Utils :: Validation
//|| Profile Complete
//||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
      //|| Util Class
      //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      import app                          from "../../../sonata/app.js";
      import Recordset                    from "../../../sonata/utils/recordset"; 
      import { MembersProfileComplete }   from "../../.interfaces.js";

      /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
      //|| Util Class
      //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      export default class AbstractMembersProfileComplete {

            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Check if Email Exists in Database
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

            static async profileData(id_user : number) : Promise<MembersProfileComplete | null> {
                  app.log('AbstractMembersProfileComplete : profileData()', 'info');
                  return new Promise(async (resolve) => {
                        const sql     = app.query("sql/users/users.profile.complete.sql");
                        const results = await app.db("main").query(sql, [ id_user ]) as Recordset;
                        if (results.count > 0) {
                              const userDOB = new Date(results.rows[0].user_dob);
                              const formattedDOB = userDOB.toISOString().split('T')[0];                              
                              let respValues : MembersProfileComplete = { 
                                    id_user           : results.rows[0].id_user,
                                    fid_media_profile : results.rows[0].fid_media_profile,
                                    fid_media_cover   : results.rows[0].fid_media_cover,
                                    user_username     : results.rows[0].user_username,
                                    user_dob          : formattedDOB,
                                    user_gender       : results.rows[0].user_gender
                              };
                              return resolve(respValues);                              
                         } else return resolve(null);
                  });
            }

      }
