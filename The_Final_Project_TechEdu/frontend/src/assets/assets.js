/************************* TechEdu Images Imported ***************************/
import TechEdu_logo from './TechEdu_logo2.png'
import shopping_card from './shopping card.png'
import favourite_icon from './favourite_icon.png'
import facebook from './facebook.png'
import whatsapp from './whatsapp.png'
import youtube from './youtube.png'
import twitter from './twitter.png'
import linkedin from './linkedin.png'
// about us 
import Instructor from './instructor.jpg'
// Contact us 
import Cairo from './cairo.png'
import Banha from './banha.jpg'
import Alex from './Alex.png'
// Top Watched Courses courses 
import _5G from './5G.jpg'
import Ai from './Ai.png'
import IOT from './IOT.png'
import node from './node.png'
import react from './react.png'
import ML from './ML.png'
import DL from './Deeplearning.png'
import DC from './Datascience.png'
//  Courses 
import UI from './UIUX.png'
import FE from './FrontEnd.png'
// import DV from './Devops.png'
import SE from './Softwareenginnering.png'
// import Back from './Backend.png'
import ES from './EmbeddedSystem.png'
// import Ar from './arduino.png'
import MERN from './MERN.png'
// Viewcourse
import HTML_CSS from './HTML&CSS.png'
import Javascript from './Javascript.png'
import Typescript from './Typescript.png'
import Bootstrap from './Bootstrap.png'
import React_ from './React_.png'
import Angular from './Angular.png'
/***************************************************************/
import search_icon from './search_icon.png'
import video_test from './lesson1.mp4'
/*=============================================================================================*/
export const assets = {
    TechEdu_logo,
    shopping_card,
    favourite_icon,
    facebook,
    whatsapp,
    youtube,
    twitter,
    linkedin,
    video_test,
    Instructor,
    Cairo,
    Banha,
    Alex,
    search_icon,
}
//(in home page)
/********************************* Top Watched Courses ************************************/
export const Top_Watched = [
    {
        _id: "1",
        name: "5G",
        image: _5G,
        price: 450,
        description: "the fifth generation of wireless cellular technology,companies used in 2019."
    },
    {
        _id: "2",
        name: "AI",
        image: Ai,
        price: 800,
        description: "a machine's ability to perform the cognitive functions we associate with human minds"
    }, {
        _id: "3",
        name: "IOT",
        image: IOT,
        price: 600,
        description: "a network of interrelated devices that connect and exchange data"
    }, {
        _id: "4",
        name: "Node Js",
        image: node,
        price: 650,
        description: " an Open Source, cross-platform runtime environment for executing JavaScript code."
    }, {
        _id: "5",
        name: "React Js",
        image: react,
        price: 700,
        description: " a free and open-source front-end JavaScript based on components"
    }, {
        _id: "6",
        name: "Machine Learning",
        image: ML,
        price: 900,
        description: "branch of AI and computer science that focuses on the using data and algorithms"
    },
    {
        _id: "7",
        name: "Deep Learning",
        image: DL,
        price: 1000,
        description: "a subset of machine learning that uses multilayered neural networks"
    },
    {
        _id: "8",
        name: "Data Science",
        image: DC,
        price: 600,
        description: "an umbrella term for all aspects of data processing"
    }
]
//(in course category page)
/************************************** Courses ******************************************/
export const Courses = [
    {
        _id: "1",
        name: "Web Development",
        image: FE,
        category: "Web Development"
    },
    
    {
        _id: "4",
        name: "IOT",
        image: ES,
        category: "IOT"
    },
    
    {
        _id: "2",
        name: "Artificial Intelligence",
        image: ML,
        category: "AI"
    },
    
    {
        _id: "5",
        name: "Software Engineering",
        image: SE,
        category: "Software Development"
    },
    {
        _id: "6",
        name: "UI/UX",
        image: UI,
        category: "Design"
    },

]

/************************************** Lessons ******************************************/
export const Lesson = [
    {
        _id: "1",
        name: "Front End web Development",
        image: HTML_CSS,
        price: 300,
        description: "Learn HTML & CSS",
        category: "Front End web Development"
    },
    {
        _id: "2",
        name: "Front End web Development",
        image: Javascript,
        price: 600,
        description: "JavaScript Language",
        category: "Front End web Development"
    }, {
        _id: "3",
        name: "Front End web Development",
        image: Typescript,
        price: 200,
        description: "Typescript",
        category: "Front End web Development"
    }, {
        _id: "4",
        name: "Front End web Development",
        image: Bootstrap,
        price: 24,
        description: "Bootstrap",
        category: "Front End web Development"
    }, {
        _id: "5",
        name: "Front End web Development",
        image: React_,
        price: 14,
        description: "React",
        category: "Front End web Development"
    }, {
        _id: "6",
        name: "Front End web Development",
        image: Angular,
        price: 12,
        description: "Angular",
        category: "Front End web Development"
    }
]
// Card Page
/********************* Card ************************/
export const cart = [
    {
        _id: "1",
        image: HTML_CSS,
        name: "Front End web Development",
        price: 300,
    },
    {
        _id: "2",
        image: Javascript,
        name: "Java Script",
        price: 500,
    },
    {
        _id: "2",
        image: MERN,
        name: "MERN",
        price: 650,
    },
]