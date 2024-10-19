const courseModel = require('../models/courseSchema');
const adminModel = require('../models/adminSchema');
const moment = require("moment");
const csv = require("fast-csv")
const fs = require("fs")

const addCourse = async (req, res) => {
    const courseProfile = req.files['course_profile'] ? req.files['course_profile'][0] : null;
    const courseVideo = req.files['course_video'] ? req.files['course_video'][0] : null;

    if (!courseProfile || !courseVideo) {
        return res.status(400).send({ message: 'File upload failed.' });
    }

    console.log("courseProfile ",courseProfile.filename)
    
    console.log("courseVideo ",courseVideo.filename)
    // console.log(req.body)


    const fileProfile = courseProfile.filename;
    const fileVideo = courseVideo.filename;

    const cname = req.body.cname
    const Iname = req.body.Iname
    const description = req.body.description
    const content = req.body.content
    const categoryCourse = req.body.categoryCourse
    const courseType = req.body.course
    const price = req.body.price
    const status = req.body.status
    const dataUpdated = null
    
    if (!cname || !Iname || !description || !content || !categoryCourse || !courseType || !price || !status || !fileProfile || !fileVideo) {
        return res.status(401).json("All inputs are required");
    }

    try {
        const precourse = await courseModel.findOne({ cname: cname });

        if (precourse) {
            return res.status(401).json("This course already exists in the database");
        } else {
            const dataCreated = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
            const courseDate = new courseModel({
                cname, Iname, description, content, categoryCourse, courseType, price, status, courseProfile: fileProfile, courseVideo: fileVideo, dataCreated,dataUpdated
            });
            await courseDate.save();
            return res.status(201).json(courseDate);
        }
    } catch (error) {
        console.error("Block Error", error);
        if (!res.headersSent) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};


// get All Courses
const getCourses = async (req, res) => {
    try {
        const coursedata = await courseModel.find();
        res.status(200).json(coursedata);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching courses', error: error.message });
    }
};


const getAllCourses=async(req,res)=>{
    const search = req.query.search || "";
    const status = req.query.status || ""
    const sort = req.query.sort || "";
    const categoryCourse = req.query.categoryCourse||"";

    const page = req.query.page || 1;

    const COURSES_PER_PAGE = 4;

    const query = {
        cname:{$regex:search,$options:"i"}
    }

    if(status!="All"){
        query.status=status
    }

    if(categoryCourse!=""){
        query.categoryCourse=categoryCourse
    }
    try {

        const skip = (page-1)*COURSES_PER_PAGE

        const count = await courseModel.countDocuments(query)

        const coursedata = await courseModel.find(query)
        .sort({dataCreated:sort ==="new" ?-1 :1})
        .limit(COURSES_PER_PAGE)
        .skip(skip)
        
        const pageCount = Math.ceil(count/COURSES_PER_PAGE)
        
        res.status(201).json({
             Pagination:{
            count,pageCount
        },
        coursedata
    })
    } catch(error) {
        res.status(401).json(error)
    }
}


const getOneCourse=async(req,res)=>{
    const {id} = req.params;

    try {
        const coursedata = await courseModel.findOne({_id:id});
        res.status(201).json(coursedata)
    } catch(error) {
        res.status(401).json(error)
    }
}

const getCourseDetails=async(req,res)=>{
    const {id} = req.params;

    try {
        const coursedata = await courseModel.findOne({_id:id});
        res.status(201).json(coursedata)
    } catch(error) {
        res.status(401).json(error)
    }
}


// Edit Course
const editCourse =async (req,res)=>{
    const {id} = req.params;
   
    const cname = req.body.cname
    const Iname = req.body.Iname
    const description = req.body.description
    const content = req.body.content
    const categoryCourse = req.body.categoryCourse
    const courseType = req.body.course
    const price = req.body.price
    const status = req.body.status
    
    const courseProfile = req.files['course_profile'] ? req.files['course_profile'][0] : null;
    const courseVideo = req.files['course_video'] ? req.files['course_video'][0] : null;
    
    const profileFile = courseProfile ? courseProfile.filename : null;
    const videoFile = courseVideo ? courseVideo.filename : null;
    
    const dataCreated = req.body.dataCreated 
    const dataUpdated = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
  
    try {
      const updatedCourse = await courseModel.findByIdAndUpdate(
        { _id: id },
        {
          cname,
          Iname,
          description,
          content,
          categoryCourse,
          courseType,
          price,
          status,
          courseProfile: profileFile,
          courseVideo: videoFile,
          dataCreated,
          dataUpdated:dataUpdated
        },
        { new: true }
      );
  
      if (!updatedCourse) {
        return res.status(404).json({ message: "Course not found" });
      }
  
      res.status(201).json(updatedCourse);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
};

// delete Course 
const deleteCourse = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedCourse = await courseModel.findByIdAndDelete({ _id: id});
        if (!deletedCourse) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.status(201).send(deletedCourse);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Change Status 
const courseStatus = async(req,res)=>{
    const {id} = req.params;
    const {data} =req.body
    try {
        const courseStatusUpdate = await courseModel.findByIdAndUpdate({_id:id}, { status: data}, { new: true });
        res.status(200).json(courseStatusUpdate);
    } catch (error) {
        res.status(401).json(error);
    }

}


const courseExport = async (req, res) => {
    try {
        const coursesdata = await courseModel.find();
        // console.log(coursesdata);
        const csvStream = csv.format({ headers: true });

        const exportDir = "public/files/export";
        if (!fs.existsSync(exportDir)) {
            fs.mkdirSync(exportDir, { recursive: true });
        }

        const writeableStream = fs.createWriteStream(`${exportDir}/courses.csv`);
        csvStream.pipe(writeableStream);

        writeableStream.on("finish", function () {
            res.json({
                downloadUrl: `http://localhost:7200/files/export/courses.csv`
            });
        });

        if (coursesdata.length > 0) {
            coursesdata.forEach((course) => {
                csvStream.write({
                    CourseName: course.cname || "_",
                    InstructorName: course.Iname || "_",
                    Description: course.description || "_",
                    Content: course.content || "_",
                    CategoryCourse: course.categoryCourse || "_",
                    CourseType: course.courseType || "_",
                    Price: course.price || "_",
                    Status: course.status || "_",
                    CourseProfile: course.courseProfile || "_",
                    CourseVideo: course.courseVideo || "_",
                    DataCreated: course.dataCreated || "_",
                    DataUpdated: course.dataUpdated || "_"
                });
            });
        }

        csvStream.end();

    } catch (error) {
        res.status(401).json(error);
    }
};


const loginAdmin = async(req, res) => {
    const {email,password} = req.body;

    if(!email || !password) {
        res.status(422).json({error:"Fill all the details"})
    }

    try {
        const adminValid = await adminModel.findOne({email:email});

        if(adminValid) {
            res.status(201).json({status:201,adminValid});
        }else {
            res.status(404).json("Not Found");
        }

 
    }catch (error) {
        res.status(401).json(error);
    }
}

module.exports = {
    addCourse,
    getAllCourses,
    getCourses,
    getOneCourse,
    getCourseDetails,
    editCourse,
    deleteCourse,
    courseStatus,
    courseExport,
    loginAdmin,
};




