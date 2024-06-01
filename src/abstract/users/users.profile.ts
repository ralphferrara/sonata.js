//*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
//|| SCM :: Utils :: Validation
//|| Profile Complete
//||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
      //|| Util Class
      //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      import app                          from "../../sonata/app.js";
      import Recordset                    from "../../sonata/utils/recordset"; 
      import { MembersProfileComplete }   from "../.interfaces.js";

      /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
      //|| Util Class
      //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      export default class AbstractUsersProfile {

            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Get the Profile Complete Data
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

            static async getProfileData(id_user : number) : Promise<MembersProfileComplete | null> {
                  app.log('AbstractUsersProfile : getProfileData()', 'info');
                  return new Promise(async (resolve) => {
                        const sql     = app.query("sql/users/select.profile.complete.sql");
                        const results = await app.db("main").query(sql, [ id_user ]) as Recordset;
                        if (results.count > 0) {
                              const userDOB = new Date(results.rows[0].user_dob);
                              const formattedDOB = userDOB.toISOString().split('T')[0];                              
                              let respValues : MembersProfileComplete = { 
                                    id_user           : (results.rows[0].id_user === null)            ? -1 : results.rows[0].id_user,
                                    fid_media_profile : (results.rows[0].fid_media_profile === null)  ? -1 : results.rows[0].fid_media_profile,
                                    fid_media_cover   : (results.rows[0].fid_media_cover === null)    ? -1 : results.rows[0].fid_media_cover,
                                    user_username     : results.rows[0].user_username,
                                    user_dob          : formattedDOB,
                                    user_gender       : results.rows[0].user_gender
                              };
                              return resolve(respValues);                              
                         } else return resolve(null);
                  });
            }

            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Set the Profile Data
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

            static async setProfileData(respValues : MembersProfileComplete) : Promise<boolean> {
                  app.log('AbstractUsersProfile : setProfileData()', 'info');
                  return new Promise(async (resolve) => {
                        const sql     = app.query("sql/users/update.profile.complete.sql");
                        const results = await app.db("main").query(sql, [                               
                              respValues.user_gender,
                              respValues.user_username,
                              respValues.user_dob,
                              respValues.id_user
                         ]) as Recordset;
                         console.log(results.sql());
                         if (results.affected > 0) return resolve(true); else return resolve(false);
                  });
            }            

            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| EOC
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      }
