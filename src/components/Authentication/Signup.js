import { createUserWithEmailAndPassword } from '@firebase/auth';
import { Box, Button, TextField } from '@material-ui/core';
import React, { useState } from 'react'
import { CryptoState } from '../../CryptoContext';
import {auth} from "../../firebase";
const Signup = ({handleClose}) => {
 const[email,Setemail]=useState("");
 const[password,Setpassword]=useState("");
 const[confirmPassword,SetconfirmPassword]=useState("");
 
 const {SetAlert}=CryptoState();
 const handleSubmit= async ()=>{
     if(password!==confirmPassword){
        SetAlert({
          open:true,
          message:"Password do not match",
          type:"error",
        });
        return;
     }
 try {
  const result = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  SetAlert({
    open: true,
    message: `Sign Up Successful. Welcome ${result.user.email}`,
    type: "success",
  });

  handleClose();
} catch (error) {
  SetAlert({
    open: true,
    message: error.message,
    type: "error",
  });
  return;
}
};
  return (
    <Box
    p={3}
    style={{display:"flex",flexDirection:"column",gap:"20px",margin:"15px"}}
    >
    <TextField
    variant="outlined"
    type="email"
    label="Enter Email"
    value={email}
    onChange={(e)=>Setemail(e.target.value)}
    fullWidth
    >    
    </TextField>
    <TextField
    variant="outlined"
    type="password"
    label="Enter Password"
    value={password}
    onChange={(e)=>Setpassword(e.target.value)}
    fullWidth
    >    
    </TextField>
    <TextField
    variant="outlined"
    type="password"
    label="Confirm Password"
    value={confirmPassword}
    onChange={(e)=>SetconfirmPassword(e.target.value)}
    fullWidth
    >    
    </TextField>
    <Button
      variant="contained"
      size="large"
      style={{backgroundColor:"#EEBC1D",}}
      onClick={handleSubmit}
      >Sign Up</Button>
    </Box>
  )
}

export default Signup
