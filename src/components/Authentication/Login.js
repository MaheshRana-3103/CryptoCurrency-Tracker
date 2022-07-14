import { signInWithEmailAndPassword } from '@firebase/auth';
import React, { useState } from 'react'
import { Box, Button, TextField } from '@material-ui/core';
import { CryptoState } from '../../CryptoContext';
import { auth } from '../../firebase';
 
const Login = ({handleClose}) => {
 const[email,Setemail]=useState("");
 const[password,Setpassword]=useState("");
 const {SetAlert}=CryptoState();
 const handleSubmit = async () => {
  if (!email || !password) {
    SetAlert({
      open: true,
      message: "Please fill all the Fields",
      type: "error",
    });
    return;
  }

  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    SetAlert({
      open: true,
      message: `Log In Successful. Welcome ${result.user.email}`,
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
    <Button
      variant="contained"
      size="large"
      style={{backgroundColor:"#EEBC1D",}}
      onClick={handleSubmit}
      >Log-In</Button>
    </Box>
  )
}

export default Login
