/*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
//|| Sonata.js :: Utils :: Log
//|| Manipulate 
//||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
      //|| FMPEG
      //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/    

      import { exec }                                 from 'child_process';
      import * as ffmpeg                              from "fluent-ffmpeg";
      import { spawn }                                from "child_process";
      import sharp                                    from 'sharp';

      /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
      //|| App
      //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/    

      import app                                      from "../app.js";

      /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
      //|| Media
      //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/    

      import Media                                    from "../utils/media.js";
      import { MediaVideoItem, ResizedVideo }         from "./.interfaces.js";
      import { fileTypeFromBuffer }                   from 'file-type';     

      /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
      //|| Media
      //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/    

      export default class MediaVideo implements MediaVideoItem {

            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Var
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/    

            public id               : number;
            public buffer           : Buffer;
            public screenshot       : Buffer;               
            public filename         : string;
            public ext              : string; 
            public width            : number;
            public height           : number; 
            public duration         : number;  
            public orientation      : "L" | "P" | "S";      
            public meta             : Record<string, string>;
            public status           : "OK" | "PENDING" | "CORRUPT" | "TOOBIG" | "TOOSMALL" | "UNSUPPORTED";
            public sizes            : ResizedVideo[];

            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Constructor 
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/    

            constructor(id, videoData: Buffer, filename: string) {
                  this.id                 = id;
                  this.buffer             = videoData;
                  this.duration           = 0;
                  this.filename           = app.path(filename).base();
                  this.ext                = app.path(filename).ext().toLowerCase(); // Extract file extension
                  this.status             = "PENDING";
                  this.sizes              = [];
            }

            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Init
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/    

            public async init(): Promise<boolean> {
                  app.log("MediaVideo :: init()", "info");
                  /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
                  //|| Verify Extension
                  //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/    
                  if (!app("config", "media").allowedVideos.includes(this.ext)) {
                        this.status = "UNSUPPORTED";
                        return false;
                  }
                  /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
                  //|| Check File Type from File
                  //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/    
                  const actualFileType    = await fileTypeFromBuffer(this.buffer);
                  if (!actualFileType || !actualFileType.mime.startsWith('video/')) {
                        this.status = "UNSUPPORTED";
                        return false;
                  }
                  /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
                  //|| Get the Meta Data
                  //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/    
                  //await this.extractMeta();
                  /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
                  //|| Get Screenshot
                  //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/    
                  //await this.takeScreenShot();
                  /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
                  //|| Get the Meta Data
                  //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/    
                  this.status = 'OK';
                  app.log("MediaImage :: init()", "success");
                  return true;
            }

            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Meta
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/    

            public async extractMeta(): Promise<void> {
                  app.log("MediaVideo :: extractMeta()", "info");
                  return new Promise<void>((resolve, reject) => {
                        // Extract metadata using fluent-ffmpeg
                        ffmpeg.ffprobe(this.buffer, (err, metadata) => {
                              if (err) {
                                    console.error("Error extracting metadata:", err);
                                    reject(err);
                                    return;
                              }
                              console.log("Metadata:", metadata);
                              this.meta  = {
                                    'bitrate' : metadata.format.bit_rate,
                                    'format' : metadata.format.format_name
                               }            
                              resolve();
                        });
                  });
            }          

            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Screenshot
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/    

            public async takeScreenShot(): Promise<void> {
                  app.log("MediaVideo :: takeScreenShot()", "info");
                  return new Promise<void>((resolve, reject) => {
                        const command = `ffmpeg -ss ${Math.floor(this.duration / 2)} -i input.mp4 -frames:v 1 -vf "scale=720:-1" -f image2pipe -vcodec png -`;
                        exec(command, { encoding: 'buffer' }, (error, stdout, stderr) => {
                            if (error) {
                                console.error('Error taking screenshot:', error);
                                reject(error);
                            } else {
                                // Convert the PNG screenshot to WebP format using Sharp
                                sharp(stdout)
                                    .toFormat('webp')
                                    .toBuffer()
                                    .then((webpBuffer) => {
                                        // Store the WebP screenshot in the this.screenshot property
                                        this.screenshot = webpBuffer;
                                        console.log('Screenshot taken successfully.');
                                        resolve();
                                    })
                                    .catch((err) => {
                                        console.error('Error converting screenshot to WebP:', err);
                                        reject(err);
                                    });
                            }
                        });
                    });
            }       

            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Resize based on the longest side
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/    

            async resize(maxSize: number) : Promise<boolean> {
                  app.log("MediaVideo :: resize()", "info");
          
                  return new Promise((resolve, reject) => {
                      // Use FFmpeg to convert and resize the video
                      const ffmpeg = spawn("ffmpeg", [
                          "-i", "pipe:0",
                          "-c:a", "aac", "-b:a", "128k",
                          "-vf", "scale=2560:1440", "output_1440p.mp4",
                          "-c:a", "aac", "-b:a", "128k",
                          "-vf", "scale=1280:720", "output_720p.mp4"
                      ]);
          
                      let video1440p: Buffer = Buffer.alloc(0);
                      let video720p: Buffer = Buffer.alloc(0);
          
                      ffmpeg.stdout.on("data", (data: Buffer) => {
                          // Collect output data
                          // FFmpeg outputs logs to stdout, so we should not include it in the final video data
                          const strData = data.toString();
                          if (!strData.includes("frame=")) {
                              if (strData.includes("output_1440p.mp4")) {
                                  video1440p = Buffer.concat([video1440p, data]);
                              } else if (strData.includes("output_720p.mp4")) {
                                  video720p = Buffer.concat([video720p, data]);
                              }
                          }
                      });
          
                      ffmpeg.stderr.on("data", (data: Buffer) => {
                          // Log FFmpeg stderr output
                          console.error(`FFmpeg stderr: ${data}`);
                      });
          
                      ffmpeg.on("close", (code: number) => {
                          if (code === 0) {
                              // FFmpeg conversion and resizing successful
                              this.sizes.push({
                                  name: "output_1440p.mp4",
                                  size: 1440,
                                  buffer: video1440p,
                                  width : 1440,
                                  height : 120
                              });
                              this.sizes.push({
                                  name: "output_720p.mp4",
                                  size: 720,
                                  buffer: video720p,
                                  width : 1440,
                                  height : 120
                              });
                              this.status = "OK";
                              app.log("MediaVideo :: convertAndResize()", "success");
                              resolve(true);
                          } else {
                              // FFmpeg encountered an error
                              this.status = "CORRUPT";
                              app.log("MediaVideo :: convertAndResize()", "error");
                              reject(false);
                          }
                      });
          
                      // Pipe video data to FFmpeg stdin
                      ffmpeg.stdin.write(this.buffer);
                      ffmpeg.stdin.end();
                  });
              }

            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Save to Cloud
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/    

            async saveToCloud(cloudName : string) : Promise<boolean> {
                  app.log("MediaVideo :: saveToCloud("+cloudName+")", "info");
                  let files = await this.sizes.map( (size) => {
                        return {
                              path        : size.name,
                              data        : size.buffer
                        }
                  });
                  files.push({
                        path        : Media.filename("image", this.id, 0, true),
                        data        : this.buffer
                  });
                  await app.cloud(cloudName).write(app("config", "media").bucket, files);                  
                  return true;
            }


            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| EOC
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/    
            
      }      