const express = require('express');
const router = express.Router();
const controllers = require("../controllers/coursesControllers");
const { upload } = require('../multerconfig/storageConfig');


router.post('/course/addCourse', 
    upload, 
    controllers.addCourse
);

router.get('/course/getAllCourses',controllers.getAllCourses)
router.get('/course/getCourses',controllers.getCourses)

router.get('/course/details/:id', controllers.getCourseDetails)
router.get('/courses/viewcourse/lesson/:id',controllers.getOneCourse)

router.put("/course/editCourse/:id",upload,controllers.editCourse)

router.delete("/course/deleteCourse/:id", controllers.deleteCourse)


router.put("/course/status/:id", controllers.courseStatus)

router.get("/coursesexport",controllers.courseExport)


router.post('/login',controllers.loginAdmin) 



module.exports = router;





















// const express = require("express");

// const router = express.Router();

// const controllers = require("../controllers/coursesControllers")

// const upload = require("../multerconfig/storageConfig");
// // routes
// router.post('/course/addCourse',upload.uploadImage.single("course_profile"),controllers.addCourse)

// // router.post('/course/addCourse',upload.uploadVideo.single("course_video"),controllers.addCourse)


// const express = require('express');
// const router = express.Router();
// const controllers = require("../controllers/coursesControllers")
// const { handleImageUpload, handleVideoUpload } = require('../controllers/middleware');

// router.post('/course/addCourse', 
//     handleImageUpload, 
//     handleVideoUpload, 
//     controllers.addCourse
// );


