//*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
//|| SCM :: Abstract :: Users
//|| User Update
//||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
      //|| Util Class
      //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      import app                      from "../../sonata/app.js";
      import Recordset                from "../../sonata/utils/recordset"; 

      /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
      //|| Util Class
      //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      export default class AbstractUsersUpdate {

            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Set ID of Media Cover
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

            static async setMediaCover(idMedia : number, idUser : number) : Promise<boolean> {
                  app.log('AbstractUsersUpdate : setMediaCover()', 'info');
                  return new Promise(async (resolve) => {
                        const sql     = app.query("sql/users/users.media.cover.sql");
                        const results = await app.db("main").query(sql, [ idMedia, idUser ]) as Recordset;                        
                        console.log(results.sql());
                        if (typeof results.affected === "number" ) return resolve(results.affected > 0); else return resolve(false);
                  });
            }

            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Clear ID of Media Cover
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

            static async clearMediaCover(idUser : number) : Promise<boolean> {
                  app.log('AbstractUsersUpdate : clearMediaCover()', 'info');
                  return new Promise(async (resolve) => {
                        const sql     = app.query("sql/users/users.media.cover.clear.sql");
                        const results = await app.db("main").query(sql, [ idUser ]) as Recordset;                        
                        console.log(results.sql());
                        if (typeof results.affected === "number" ) return resolve(results.affected > 0); else return resolve(false);
                  });
            }            

            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Update fid_media_profile
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

            static async setMediaProfile(idMedia : number, idUser : number) : Promise<boolean> {
                  app.log('AbstractUsersUpdate : setMediaProfile()', 'info');
                  return new Promise(async (resolve) => {
                        const sql     = app.query("sql/users/users.media.profile.sql");
                        const results = await app.db("main").query(sql, [ idMedia, idUser ]) as Recordset;
                        if (typeof results.affected === "number" ) return resolve(results.affected > 0); else return resolve(false);
                        return resolve(null);
                  });
            }

            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Clear ID of Media Profile
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

            static async clearMediaProfile(idUser : number) : Promise<boolean> {
                  app.log('AbstractUsersUpdate : clearMediaProfile()', 'info');
                  return new Promise(async (resolve) => {
                        const sql     = app.query("sql/users/users.media.profile.clear.sql");
                        const results = await app.db("main").query(sql, [ idUser ]) as Recordset;                        
                        console.log(results.sql());
                        if (typeof results.affected === "number" ) return resolve(results.affected > 0); else return resolve(false);
                  });
            }                        

      }
