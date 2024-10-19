import React, { useEffect, useState } from 'react';
import './Video.css';
import { assets } from '../../assets/assets';
import { useParams } from 'react-router-dom';
const Video = () => {
    const handlePrevious = () => {
        console.log('Previous video');
    };

    const handleNext = () => {
        console.log('Next video');
    };


    const {id}=useParams()
    const [content,setContent] = useState([])
   console.log(content)

    const getCourseDetails =async()=>{
        const res =await fetch(`http://localhost:7200/courses/viewcourse/lesson/${id}`,{
            method: 'GET',
            headers:{
                "Content-Type": "application/json"
            }
        });
        const data = await res.json()
        if(res.status !=201) {
            console.log("no data available")
        } else {
            console.log("get data");
            setContent(data)
        }
    }

    useEffect(()=>{
        getCourseDetails()
    },[id])

    return (
        <>
            <div className='url'>
                <p>Courses/Viewcourse/Lessons/lesson: {content.cname}</p>
            </div>
            <div className="video-container">
                <p>{content.cname}</p>
               
                <video width="720" height="400" src={`http://localhost:7200/uploads/videos/${content.courseVideo}`} type="video/mp4"  controls />
        
                <div className="video-controls">
                    <button onClick={handlePrevious} className="control-button">Previous</button>
                    <button onClick={handleNext} className="control-button">Next</button>
                </div>
            </div>
        </>

    );
};

export default Video;
