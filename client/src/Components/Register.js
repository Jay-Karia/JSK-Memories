import React, { useEffect, useState } from "react";
import {Box, TextField, Container, Button, Typography} from '@mui/material'

import * as Colors from '@mui/material/colors'

function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cPassword, setCPassword] = useState('')
  const [name, setName] = useState('')

  const handleSubmit = (e)=> {
      e.preventDefault()
      if (cPassword!==password) {
          alert('Your password does not match')
      } else if (password.length<6) {
          alert('Password length too short (minimum 6 characters)')
      }
  }
  return (
    <>
        <Container align='center'  sx={{marginTop:'30px', border:'2px solid black', borderRadius:'14px', alignItems:"center", width:'30rem', marginBottom:'20px', '&:hover': { boxShadow:'1px 10px 20px 3px grey'}, transition:'all .3s ease-in', bgcolor:Colors.grey[600], height:"37rem"}}>
          <div style={{border:'2px solid white', marginTop:"20px", marginBottom:'20px', backgroundColor:"white", borderRadius:'14px', height:"auto"}}>
            <div style={{display:'flex', justifyContent:'center'}}>
                <h1 style={{display:'flex', alignItems:'center'}} align='center'>Register <span style={{display:'flex', justifyContent:'center', marginLeft:'20px'}}></span></h1>
            </div>
            <Box component="form" sx={{ '& .Mu  iTextField-root': { m: 1, width: '20rem' }, padding:"20px"}} noValidate autoComplete="off">
                <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <TextField onChange={(e)=>{setName(e.target.value)}} color='common' label="Name" id="outlined-multiline-static" style={{marginTop:'0px', width:'25rem'}} defaultValue="" size="md"/>
                </div>
                <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <TextField type='email' onChange={(e)=>{setEmail(e.target.value)}} color='common' className="email" label="Email" id="outlined-multiline-static" style={{marginTop:'30px', width:'25rem'}} defaultValue="" size="md"/>
                </div>
                <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <TextField onChange={(e)=>{setPassword(e.target.value)}} type='password' color='common' id="outlined-multiline-static " sx={{backgroundColor:'white', marginTop:'30px', width:'25rem'}} label="Password"/>
                </div>
                <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <TextField onChange={(e)=>{setCPassword(e.target.value)}} type='password' color='common' id="outlined-multiline-static cPass field" sx={{backgroundColor:'white', marginTop:'30px', width:'25rem'}} label="Confirm Password"/>
                </div>
                <Box display='flex' sx={{justifyContent:'center', alignItems:'center', marginBottom:'10px', marginTop:'20px'}}>
                    <Button onClick={(e)=>{handleSubmit(e)}} type='submit' color='grey'  variant="contained" className='btn' sx={{ fontSize:'large', borderRadius:'10px', bgcolor:Colors.grey[900], color:'white', marginTop:"20px"}}>Register</Button>
                </Box>
                <div className="footer">
                    {/* <Button color='common'  variant="contained" sx={{borderRadius:'10px', bgcolor:Colors.grey[900], color:"white", padding:"0"}}>⬅</Button> */}
                    <Typography variant='h6' sx={{marginTop:"0px"}}>Already have an account? <a href="/login">Login</a></Typography>
                </div>
            </Box>
          </div>
        </Container>
    </>
  )
}

export default Register