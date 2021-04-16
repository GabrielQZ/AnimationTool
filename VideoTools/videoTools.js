
const router = require("express").Router();

const Jimp = require("jimp");
const fs = require("fs");
const Multer = require("multer");

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 8 * 1024 * 1024,
    files: 1,
  },
});

const videoshow = require('videoshow')

router.put(
  `/createVideo`,
  async (req, res) => {
    const {videoOptions, finalVideoPath, images, delayTime} = req.body;

    //DATA EXAMPLES
      // const delayTime = 1
      // const finalVideoPath = '/whatever_path_works_for_you'

      // // setup videoshow options
      // const videoOptions = {
      //   fps: 24,
      //   transition: false,
      //   videoBitrate: 1024 ,
      //   videoCodec: 'libx264', 
      //   size: '640x640',
      //   outputOptions: ['-pix_fmt yuv420p'],
      //   format: 'mp4' 
      // }

      // // array of images to make the 'videoshow' from
      // const images = [
      //   {path: path1, loop: delayTime}, 
      //   {path: path2, loop: delayTime}, 
      //   ...etc  
      // ]    

    videoshow(images, videoOptions)
    .save(finalVideoPath)
    .on('start', function (command) { 
      console.log('encoding ' + finalVideoPath + ' with command ' + command) 
    })
    .on('error', function (err, stdout, stderr) {
      return Promise.reject(new Error(err)) 
    })
    .on('end', function (output) {
      res.send('done');
    })
  }
)

router.put(
  `/reverseFolder/:folderName`,
  async (req, res) => {

    try {
      
      const directoryName = req.params.folderName;
      const directoryPath = process.cwd() + "\\raw_data\\"+directoryName+"\\";
      const newDirectoryName = directoryName + "-reversed";
      const newDirectoryPath = "./raw_data/"+newDirectoryName+"/";
      
      // console.log(newDirectoryPath);

      const arr = [];
      const dir = await fs.promises.opendir(directoryPath)
      for await (const file of dir)
        arr.unshift(file.name);

      // console.log(arr);

      // arr.sort((a,b) => a-b);


      // arr.splice(1,arr.length-1);
      // console.log(newDirectoryPath+arr[0]);

      const arrLenStr = arr.length.toString().length;
      
      arr.forEach((name, i) => {
        // console.log(name);

        // const thou = Math.floor(i / 1000);
        // const hun = Math.floor((i - thou*1000) / 100);
        // const ten = Math.floor((i - hun*100) / 10);
        // const one = Math.floor((i - ten*10) / 1);

        const photoNum = "0".repeat(arrLenStr - i.toString().length) + i;

        // console.log(newDirectoryPath+photoNum+name.replace('png', 'txt'));
        // fs.writeFile(newDirectoryPath+photoNum+name.replace('png', 'txt'), "test", 'utf8')
        // console.log(photoNum, i);
        try {
            
            const data =  fs.readFileSync(directoryPath+name)
            // const b = Buffer.from(data.buffer);
            // console.log(b);

            fs.writeFileSync(newDirectoryPath+photoNum+name, b, 'base64')
            
        } catch (error) {
          console.log(error);
        }

        // fs.readFileSync(directoryPath+name, (err, data) => {
        //   // console.log(data.buffer);
        //   // console.log(newDirectoryPath+photoNum+name);
        //   const b = Buffer.from(data.buffer);
        //   // console.log(b);
        //   fs.writeFile(newDirectoryPath+photoNum+name, b, 'base64',() => {
        //     // console.log("wrote " + name);
        //   })
        // })


        console.log(read);
      });  
      // res.send("done")

    } catch (error) {
      res.send(error.message)
    }
  }

)


module.exports = router;


// // @route		PUT api/biz/imgUpload/:id
// // @desc		upload an image to the given id
// // @access	public
// router.put(
//   "/imgUpload/:id",
//   bizLoader,
//   multer.single("image"),
//   imgUpload.asyncUploadToGCS,
//   async (req, res) => {
//     console.log("made it thorugh");
//     if (!req.file) {
//       console.error("error no photo");
//       return res.json(400).json({ photo: "No photo uploaded" });
//     }

//     if (req.file.cloudStorageError) {
//       console.error("Error", req.file.cloudStorageError);
//       return res.json(500).json(req.file.cloudStorageError);
//     }

//     const { urls } = req.file;

//     const biz = await Biz.findOneAndUpdate(
//       { _id: req.params.id },
//       {
//         photos: [urls.large],
//         stdPhotos: [urls.standard],
//         thumbPhotos: [urls.thumb],
//       },
//       {
//         new: true,
//         projection: projections.imgUpload,
//       }
//     );

//     res.json(biz);
//   }
// );

