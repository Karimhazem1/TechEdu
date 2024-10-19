import React, { useContext, useEffect, useState } from 'react'
import './CourseFav.css'
import { StoreContext } from '../../context/StoreContext';
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../context/ContextProvider';

const CourseFav = () => {

    const[favdata,setFavdata] = useState("")
    
    const getdatafav = async()=>{
        const res = await fetch("http://localhost:7200/courses/viewcourse/fav/favdetails",{
          method: 'GET',
          headers: {
            Accept:"application/json",
            "Content-Type": "application/json"
          },
          credentials:"include"
        });
        const data = await res.json()
        if(res.status !==201) {
          console.log("error")
        } else {
            setFavdata(data.favouriates)
        }
      };
    
      useEffect(()=>{
        getdatafav();
      },[favdata])

    const history = useNavigate("")
    const { accountCart, setAccountCart, accountFav, setAccountFav,fname,setFname } = useContext(LoginContext);
    console.log("fname",fname)
    console.log("accountCart",accountCart)
    console.log("accountFav",accountFav)

    
    const addtocart = async (id) => {
        console.log(id);
        const course = favdata.find(course => course._id === id);
        console.log(course);
        if (!course) {
            alert('Course not found');
            return;
        }
    
        try {
            const checkres = await fetch(`http://localhost:7200/user/courses/addcart/${id}`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ course }),
            });
    
            if (!checkres.ok) {
                throw new Error('Network response was not ok');
            }
    
            const data1 = await checkres.json();
            console.log("data1",data1);
            if (checkres.status === 401 || !data1) {
                console.log('User Invalid');
                alert('User Invalid');
            } else {
                history('/courses/viewcourse/cart');
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
            alert('An error occurred while adding to cart');
        }
    };

      

      const handleRemove = async(id)=>{
        try {
          const res = await fetch(`http://localhost:7200/removefromfav/${id}`,{
            method: "DELETE",
            headers:{
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            credentials:"include"
          });
          const data = await res.json()
          console.log(data)
          if(res.status==400 || !data) {
            console.log("error")
          } else {
            console.log("user delete course successfully")
            toast.success("Course delete Successfully",{
                position:"top-center"
              })
            getdatafav()
          }
        } catch(error) {
          console.log("error",error)
        }
      }


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
        }
    }

    useEffect(()=>{
        getdetailsvaliduser()
    },[])

    
    
    return (
        <>
        {
            favdata.length ?
            <div className='cart'>
            <h2>My <span>Favourite</span></h2>
            <table className='cart-table'>
                <thead>
                    <tr>
                        <th>Course</th>
                        <th>Name</th>
                        <th>Category Course</th>
                        <th>Price</th>
                        <th>Add To Card</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                {favdata.map((item, index) => {
                    return (
                        <tbody key={index}>
                            <tr key={index}>
                            <td className='image-item'><img src={`http://localhost:7200/uploads/images/${item.courseProfile}`} alt={item.name} className="item-image" /></td>
                            <td>{item.cname}</td>
                            <td>{item.categoryCourse}</td>
                            <td>${item.price}</td>
                                <td>
                                    <button onClick={()=>addtocart(item._id)} className='btn-a'>Add To Card</button>
                                </td>
                                <td>
                                    <button onClick={() => handleRemove(item._id)} className='btn-c'>Remove</button>
                                </td>
                            </tr>
                        </tbody>
                    )
                })
                }
            </table>
            <ToastContainer />
        </div> : ""
        }
        </>
        
    )
}


export default CourseFav
