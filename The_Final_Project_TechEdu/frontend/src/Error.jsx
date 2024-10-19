import React from 'react'
import ErrorIcon from '@mui/icons-material/Error';
const Error = () => {
  return (
    <div style={{
      color:"#000",
      fontSize:"100px",
      fontWeight:"bold",
      // backgroundColor:"#fff",
      textAlign:"center"


    }}>
     <ErrorIcon style={{color:"red",fontSize:"80px"}} /> Error 404 Not Found
      </div>
  )
}

export default Error