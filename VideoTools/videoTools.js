
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


router.put(
  `/reverseFolder/:folderName`,
  async (req, res) => {

    try {
      
      const directoryName = req.params.folderName;
      const directoryPath = "../raw_data/"+directoryName+"/";
      const newDirectoryName = directoryName + "-reversed";
      const newDirectoryPath = "../raw_data/"+newDirectoryName+"/";

      const arr = [];
      const dir = await fs.promises.opendir(directoryPath)
      for await (const file of dir)
        arr.unshift(file.name);

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

        // console.log(photoNum, i);
        fs.readFile(directoryPath+name, (err, data) => {
          // console.log(data.buffer);
          const b = Buffer.from(data.buffer);
          fs.writeFile(newDirectoryPath+photoNum+name, b, () => {
            // console.log("wrote " + name);
          })
        })

      });  
      res.send("done")

    } catch (error) {
      res.send(err.message)
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

