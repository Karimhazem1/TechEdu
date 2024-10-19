import React, { useContext, useEffect, useState } from 'react';
import { FaBars, FaTimes } from "react-icons/fa";
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { LoginContext } from '../../context/ContextProvider';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LogoutIcon from '@mui/icons-material/Logout';
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch, useSelector } from 'react-redux';
import List from '@mui/material/List';
import ListItem from'@mui/material/ListItem';
import { getAllCourses } from '../redux/actions/action';
const Navbar = () => {
    const [menu, setMenu] = useState("home");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const history = useNavigate();

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
  

    const {accountCart,setAccountCart} = useContext(LoginContext)
    console.log("accountCart",accountCart) 
    const {accountFav,setAccountFav} = useContext(LoginContext) 
    const [name,setname] = useState("")
    
    const [text,setText] = useState("")
    console.log(text)
    const {courses} = useSelector(state=>state.getCoursesdata)
    console.log("coursesNav",courses)
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getAllCourses());
    },[dispatch])
    const [liopen,setliopen] = useState(true)
    



    const getdetailsvaliduser =async()=>{
        const res = await fetch("http://localhost:7200/validuser",{
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type":"application/json"
            },
            credentials:"include"
        });
        const data = await res.json()

        if(res.status !==201) {
            console.log("error")
        } else {
            console.log("data valid");
            setAccountCart(data.carts)
            setAccountFav(data.favouriates)
            setname(data.fname)
        }
    }

    console.log("name",name[0])
    useEffect(()=>{
        getdetailsvaliduser()
    },[])

    const logoutuser =async()=>{
        const res2 = await fetch("http://localhost:7200/logout",{
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type":"application/json"
            },
            credentials:"include"
        });
        const data2 = await res2.json()
        console.log("logoutuser",data2)

        if(res2.status !==201) {
            console.log("error")
        } else {
            console.log("Lougout user");
            toast.success("User Logout Successfully",{
                position:"top-center"
            })
            history("/")
            setAccountCart(false)
            setAccountFav(false)
            setname(false)
        }
    }


    const getText=(courses)=>{
        setText(courses)
        setliopen(false)
    }

    return (
        <div className='navbar'>
            <Link to="/"><img src={assets.TechEdu_logo} alt="logo" className="logo" /></Link>
            <div className={`navbar-menu ${isMobileMenuOpen ? 'open' : ''}`}>
                <ul className={`navbar-menu ${isMobileMenuOpen ? 'openl' : ''}`}>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li ><Link to="/courses">Courses</Link></li>
                </ul>
                <div className="search-container">
                    <input type="text" placeholder="Search your course..."
                        onChange={(e)=>getText(e.target.value)}
                    />
                    <button className='search-btn'><img src={assets.search_icon} alt="Search" /></button>
                    <>
                    {
                        text && 
                        <List className='extrasearch' hidden={liopen}>
                            {
                            courses.filter(course=>course.cname.toLowerCase().includes(text.toLowerCase())).map((course,index)=>(
                                <ListItem key={index}>
                                    <NavLink  to={`/courses/viewcourse/lesson/${course._id}`} onClick={()=>setliopen(true)} className="link_nav" >
                                     {course.cname}
                                    </NavLink>
                                </ListItem>
                            ))
                            }
                        </List>
                    }
                    </>
                </div>
                <button className='btn'><Link to="/login">Login</Link></button>

            </div>
            <div className="navbar-right">
            {
                name ? (
                    <Avatar className='avatar' style={{color:"#000"}}
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}>
                        {name[0].toUpperCase()}
                    </Avatar>
                ) : (
                    <Avatar className='avatar'
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}>

                    </Avatar>
                )
            }
            <div>
            
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleClose}>My account</MenuItem>
                {
                    name ?
                    <MenuItem onClick={() => {
                        handleClose();
                        logoutuser();
                    }}>
                       <LogoutIcon style={{fontSize:"18px"}} /> Logout
                    </MenuItem> : ""

                }
            </Menu>
            </div>



                <div className="navbar-fav-icon">
                    {
                       accountFav.length ? <Link to="/courses/viewcourse/favourite">
                       <img src={assets.favourite_icon} alt="fav" />
                       <div className="dot-fav">
                            {accountFav ?accountFav.length : 0}

                        </div>
                     </Link> : <Link to="/login">
                      <img src={assets.favourite_icon} alt="fav" />
                      <div className="dot-fav">{""}</div>
                    </Link> 
                    }
                    
                </div>
                <div className="navbar-cart-icon">
                    {
                        accountCart.length ? <Link to="/courses/viewcourse/cart">
                        <img src={assets.shopping_card} alt="cart" />
                        <div className="dot-cart">
                            {accountCart ? accountCart.length : 0}
                            </div>
                        </Link> : <Link to="/login">
                            <img src={assets.shopping_card} alt="cart" />
                            <div className="dot-cart">{""}</div>
                        </Link>     
                    }
                    
                </div>
                <div className='icon' onClick={toggleMobileMenu}>
                    {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
                </div>
            <ToastContainer />
            </div>
        </div>
    );
};
export default Navbar;
