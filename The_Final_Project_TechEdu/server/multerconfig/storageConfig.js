const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === 'course_profile') {
            cb(null, 'uploads/images');
        } else if (file.fieldname === 'course_video') {
            cb(null, 'uploads/videos');
        }
    },
    filename: (req, file, cb) => {
        cb(null,file.fieldname ==='course_profile'? 
           'image-' + Date.now()+ '-' + path.basename(file.originalname):
           'video-' + Date.now() + '-' + path.basename(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = {
            'course_profile': ['image/jpeg', 'image/png'],
            'course_video': ['video/mp4']
        };
        if (!allowedTypes[file.fieldname].includes(file.mimetype)) {
            return cb(new Error(`Invalid file type for ${file.fieldname}.`));
        }
        cb(null, true);
    }
}).fields([
    { name: 'course_profile', maxCount: 1 },
    { name: 'course_video', maxCount: 1 }
]);

module.exports = {
    upload
};


























// const multer = require('multer');


// // storage image config
// const storageImage = multer.diskStorage({
    
//     destination:(req,file,callback)=>{
//         callback(null,"./imageuploads")
//     },
    
//     filename:(req,file,callback)=>{
//         const filename = `image-${Date.now()}.${file.originalname}`
//         callback(null,filename)
//     }
// });

// // storage video config
// const storageVideo = multer.diskStorage({
//     destination: function(req, file, callback){
//         callback(null, './videouploads')
//     },
//     filename:function(req, file, callback){
//         const filename = `video-${Date.now()}.${file.originalname}`

//         callback(null,filename)
//     }
// });



// // filter image
// const filefilter = (req,file,callback)=>{
//     if(file.mimetype==="image/png" ||"image/jpg"||"image/jpeg") {
//         callback(null,true)
//     }else {
//         callback(null,false)
//         return callback(new Error("Only .png .jpg & .jpeg files are supported or Formatted  Allowed"));
//     }
// }

// // filter video
// const fileFilterVideo = (req, file, callback) => {
//     if(file.mimetype === 'video/mp4'){
//         callback(null,true);
//     }else{
//         callback(null,false)
//        return callback(new Error( 'Unsupported File Format'))
//     }
// };


// const uploadImage = multer({
//     storage: storageImage,
//     filefilter: filefilter,
// }).single('course_profile');


// const uploadVideo = multer({
//     storage: storageVideo,
//     fileFilter: fileFilterVideo
// }).single('course_video');


// module.exports = {
//     uploadImage,
//     uploadVideo
// };



