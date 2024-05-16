/*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
//|| Sonata.js :: Utils :: Log
//|| Manipulate 
//||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

/*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
//|| FMPEG
//||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/    

import * as fs                                        from 'fs';
import ffmpeg                                         from 'fluent-ffmpeg';
import sharp                                          from 'sharp';
import { Readable }                                   from 'stream';
import { promisify }                                  from 'util';
import { unlink }                                     from 'fs/promises';      

/*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
//|| App
//||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/    

import app                                      from "../app.js";

/*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
//|| Media
//||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/    

import Media                                    from "../utils/media.js";
import { MediaVideoItem, MediaVideoMeta  }      from "./.interfaces.js";
import { ResizedVideo  }                        from "./.interfaces.js";

import { fileTypeFromBuffer }                   from 'file-type';     

/*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
//|| Media
//||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/    

const writeFileAsync = promisify(fs.writeFile);

/*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
//|| Media
//||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/    

export default class MediaVideo implements MediaVideoItem {

      /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||    
      //|| Var
      //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/    

      public id               : number;
      public buffer           : Buffer;
      public filename         : string;
      public ext              : string; 
      public width            : number;
      public height           : number; 
      public duration         : number;  
      public orientation      : "L" | "P" | "S";      
      public meta             : MediaVideoMeta;
      public status           : "OK" | "PENDING" | "CORRUPT" | "TOOBIG" | "TOOSMALL" | "UNSUPPORTED";
      public sizes            : ResizedVideo[];

      /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||    
      //|| Constructor 
      //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/    

      constructor(id : number, videoData: Buffer, filename: string) {
            this.id                 = id;
            this.buffer             = videoData;
            this.duration           = 0;
            this.filename           = app.path(filename).base();
            this.ext                = app.path(filename).ext().toLowerCase();
            this.status             = "PENDING";
            this.sizes              = [];
            this.meta               = {
                  bitrate     : '',
                  format      : '',
                  duration    : 0,
                  size        : 0,
                  width       : 0,
                  height      : 0,
                  orientation : 'L'
            };
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
            await this.extractMeta();
            app.log("MediaVideo :: extractMeta()", "success");          
            console.log(this.meta);
            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||    
            //|| Get the Meta Data
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/    
            this.status = 'OK';
            return true;
      }

      /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||    
      //|| Meta
      //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/    

      public async extractMeta(): Promise<void> {
            app.log("MediaVideo :: extractMeta()", "info");

            return new Promise<void>((resolve, reject) => {
                  const readableStream = new Readable();
                  readableStream.push(this.buffer);
                  readableStream.push(null);

                  ffmpeg(readableStream).ffprobe((err, metadata) => {
                        if (err) {
                              console.error("Error extracting metadata:", err);
                              reject(err);
                              return;
                        }

                        const videoStream = metadata.streams.find(stream => stream.codec_type === 'video');
                        if (!videoStream) {
                              reject(new Error('No video stream found'));
                              return;
                        }

                        this.meta = {
                              bitrate     : metadata.format.bit_rate?.toString() || 'N/A',
                              format      : metadata.format.format_name,
                              duration    : parseFloat(metadata.format.duration) || 0,
                              size        : this.buffer.length,
                              width       : videoStream.width,
                              height      : videoStream.height,
                              orientation : videoStream.width > videoStream.height ? "L" : (videoStream.width < videoStream.height ? "P" : "S")
                        };

                        console.log("Parsed Metadata:", this.meta);

                        resolve();
                  });
            });
      }

      /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||    
      //|| Convert to MP4
      //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/    

      public async original(): Promise<void> {
            app.log("MediaVideo :: original()", "info");

            const tempFilePath = `/tmp/temp-video-${app.random.uuid()}.mp4`;
            const outputFilePath = `/tmp/output-${app.random.uuid()}.mp4`;

            try {
                  // Write buffer to a temporary file
                  await writeFileAsync(tempFilePath, this.buffer);

                  return new Promise<void>((resolve, reject) => {
                        ffmpeg(tempFilePath)
                              .output(outputFilePath)
                              .videoCodec('libx264')
                              .audioCodec('aac')
                              .on('end', async () => {
                                    try {
                                          const data = await fs.promises.readFile(outputFilePath);
                                          this.sizes.push({
                                                path   : Media.filename("originalVideo", this.id, 0),
                                                type   : "video",
                                                size   : 0,
                                                buffer : data
                                          });
                                          await unlink(outputFilePath); // Clean up the output file
                                          resolve();
                                    } catch (error) {
                                          reject(error);
                                    } finally {
                                          // Ensure the temporary video file is removed
                                          await unlink(tempFilePath);
                                    }
                              })
                              .on('error', async (err) => {
                                    console.error("Error converting video to MP4:", err);
                                    reject(err);
                                    await unlink(tempFilePath); // Clean up the temporary video file
                              })
                              .run();
                  });
            } catch (error) {
                  console.error("Error handling video buffer:", error);
                  throw error;
            }
      }

      /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||    
      //|| Screenshot
      //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/    

      public async takeScreenShot(size: number): Promise<void> {
            app.log("MediaVideo :: takeScreenShot()", "info");

            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||    
            //|| Generate a Unique Temp File Path
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/    
            const tempFilePath = `/tmp/temp-video-${app.random.uuid()}.mp4`;
            const screenshotFilename = `screenshot-${app.random.uuid()}.png`;

            try {
                  /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||    
                  //|| Write Buffer to Temporary File
                  //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/    
                  await writeFileAsync(tempFilePath, this.buffer);

                  return new Promise<void>((resolve, reject) => {
                        ffmpeg(tempFilePath)
                              .screenshots({
                                    count             : 1,
                                    folder            : '/tmp',
                                    filename          : screenshotFilename,
                                    size: `${size}x?`,
                                    timemarks: ['1'] // Provide a fixed timemark at the start of the video
                              })
                              .on('end', async () => {
                                    try {
                                          const screenshotPath = `/tmp/${screenshotFilename}`;
                                          const data = await sharp(screenshotPath).toFormat('webp').toBuffer();
                                          this.sizes.push({
                                                path        : Media.filename("screenshot", this.id, size),
                                                type        : "screenshot",
                                                size        : size,
                                                buffer      : data
                                          });
                                          await unlink(screenshotPath); // Clean up the screenshot file
                                          resolve();
                                    } catch (error) {
                                          reject(error);
                                    } finally {
                                          // Ensure the temporary video file is removed
                                          await unlink(tempFilePath);
                                    }
                              })
                              .on('error', async (err) => {
                                    console.error("Error taking screenshot:", err);
                                    reject(err);
                                    await unlink(tempFilePath); // Clean up the temporary video file
                              });
                  });
            } catch (error) {
                  console.error("Error handling video buffer:", error);
                  throw error;
            }
      }

      /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||    
      //|| Generate Preview GIF
      //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/    

      public async preview(size : number): Promise<void> {
            app.log("MediaVideo :: previewGIF()", "info");
      
            const tempFilePath = `/tmp/temp-video-${app.random.uuid()}.mp4`;
            const previewFilename = `/tmp/preview-${app.random.uuid()}.gif`;
      
            try {
                  // Write buffer to a temporary file
                  await writeFileAsync(tempFilePath, this.buffer);
      
                  const duration = this.meta.duration;
                  const interval = duration / 10;
      
                  return new Promise<void>((resolve, reject) => {
                        ffmpeg(tempFilePath)
                              .output(previewFilename)
                              .outputOptions([
                                    `-vf fps=1/${interval},scale=${size}:-1:flags=lanczos`,
                                    `-frames:v 10`
                              ])
                              .on('end', async () => {
                                    try {
                                          const data = await fs.promises.readFile(previewFilename);
                                          this.sizes.push({
                                                path   : Media.filename("preview", this.id, size),
                                                type   : "preview",
                                                size   : size,
                                                buffer : data
                                          });
                                          await unlink(previewFilename); // Clean up the preview file
                                          resolve();
                                    } catch (error) {
                                          reject(error);
                                    } finally {
                                          // Ensure the temporary video file is removed
                                          await unlink(tempFilePath);
                                    }
                              })
                              .on('error', async (err) => {
                                    console.error("Error creating preview GIF:", err);
                                    reject(err);
                                    await unlink(tempFilePath); // Clean up the temporary video file
                              })
                              .run();
                  });
            } catch (error) {
                  console.error("Error handling video buffer:", error);
                  throw error;
            }
      }
           

      /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||    
      //|| Resize based on the longest side
      //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/    

      public async resize(size: number): Promise<boolean> {
            app.log("MediaVideo :: resize()", "info");

            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||    
            //|| Generate a Unique Temp File Path
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/    
            const tempFilePath = `/tmp/temp-video-${app.random.uuid()}.mp4`;
            const outputFilename = `output_${size}p-${app.random.uuid()}.mp4`;

            try {
                  // Write buffer to a temporary file
                  await writeFileAsync(tempFilePath, this.buffer);

                  return new Promise<boolean>((resolve, reject) => {
                        ffmpeg(tempFilePath)
                              .output(outputFilename)
                              .videoCodec('libx264')
                              .size(`${size}x?`) // '?' will maintain aspect ratio based on width
                              .on('end', async () => {
                                    app.log(`Video resized to ${size} successfully.`, "success");
                                    const data = await fs.promises.readFile(outputFilename);
                                    this.sizes.push({
                                          path   : Media.filename("video", this.id, size),
                                          type   : "video",
                                          size   : size,
                                          buffer : data
                                    });
                                    await unlink(outputFilename); // Clean up the resized video file
                                    resolve(true);
                              })
                              .on('error', async (err) => {
                                    app.log(`Error resizing video to ${size}: ${err}`, "error");
                                    await unlink(outputFilename); // Clean up the resized video file
                                    reject(err);
                              })
                              .run();
                  });
            } catch (err) {
                  app.log("One or more resizing operations failed.", "error");
                  console.error(err);

                  // Clean up the temporary video file in case of error
                  await unlink(tempFilePath).catch(() => {});

                  return false;
            }
      }

      /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||    
      //|| Save to Cloud
      //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/    

      async saveToCloud(cloudName: string): Promise<boolean> {
            app.log("MediaVideo :: saveToCloud(" + cloudName + ")", "info");
            
            // Log each size's path and buffer length
            let files = this.sizes.map((size) => {
                  console.log(cloudName + " : " + size.path + " : " + size.buffer.byteLength + " bytes");
                  return {
                        path: size.path,
                        data: size.buffer
                  };
            });
      
            await app.cloud(cloudName).write(app("config", "media").bucket, files);
            return true;
      }
      

      /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||    
      //|| EOC
      //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/    
}
