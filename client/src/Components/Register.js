import React, { useEffect, useState } from "react";
import {Box, TextField, Container, Button, Typography} from '@mui/material'

import * as Colors from '@mui/material/colors'

import {useDispatch} from 'react-redux'
import {authActions} from '../store'

import {useNavigate} from 'react-router-dom'

function Register(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cPassword, setCPassword] = useState('')
    const [name, setName] = useState('')

    const [emailValidate, setEmailValidate] = useState(null)
    const [passwordValidate, setPasswordValidate] = useState(null)
    const [cPassValidate, setCPassValidate] = useState(false)

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const handleSubmit = (e)=> {
        e.preventDefault()
        if (emailValidate!==null && passwordValidate!==null && cPassValidate!==false && name.length!==0) {
            fetch('http://localhost:8000/register', {
                method:"POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({"name":name,"email":email,
                "password": password})
                
            }).then((res)=>res.json())
            .then((data)=>{
                if (data.status==='error') {
                    props.showAlert(data.msg, 'error')
                    setEmailValidate(null)
                    setPasswordValidate(null)
                    return
                } else {
                    props.showAlert(data.msg, 'success')
                    dispatch(authActions.login())
                    navigate('/post')
                }
            })
        }
        else {
            alert('Could not submit form')
        }
    }

    const validateEmail = ()=> {
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        const validate = email.toLowerCase().match(re)
        setEmailValidate(validate)
    }

    const validatePassword = ()=>{
        const reg =  /^[a-zA-Z0-9!@#$%^&*]{6,16}$/
        const validateP = password.toLowerCase().match(reg)
        setPasswordValidate(validateP)

    }

    const validateCPass = (e)=> {
        if (e.target.value!==password) {
            setCPassValidate(false)
        } else {
            setCPassValidate(true)
        }
        console.log(cPassword)
    }
  return (
    <>
        <Container align='center'  sx={{marginTop:'30px', border:'2px solid black', borderRadius:'14px', alignItems:"center", width:'30rem', marginBottom:'20px', '&:hover': { boxShadow:'1px 10px 20px 3px grey'}, transition:'all .3s ease-in', bgcolor:Colors.grey[600]}}>
          <div style={{border:'2px solid white', marginTop:"20px", marginBottom:'20px', backgroundColor:"white", borderRadius:'14px', height:"auto"}}>
            <div style={{display:'flex', justifyContent:'center'}}>
                <h1 style={{display:'flex', alignItems:'center'}} align='center'>Register <span style={{display:'flex', justifyContent:'center', marginLeft:'20px'}}></span></h1>
            </div>
            <Box component="form" sx={{ '& .Mu  iTextField-root': { m: 1, width: '20rem' }, padding:"20px"}} noValidate autoComplete="off">
                        <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                            <TextField error={name.length===0?true:false} required onChange={(e)=>{setName(e.target.value)}} color='success' className="email" label="Name" id="outlined-multiline-static" style={{width:'25rem'}} defaultValue="" size="md"/>
                        </div>
                        <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                            <TextField helperText={emailValidate===null?'Invalid Email':''} error={emailValidate===null?true:false} type='email' onChange={(e)=>{setEmail(e.target.value);validateEmail()}} color='success' className="email" label="Email" id="outlined-multiline-static" style={{width:'25rem', marginTop:"30px"}} defaultValue="" size="md"/>
                        </div>
                        <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                            <TextField helperText={passwordValidate===null?'Invalid Password':''} error={passwordValidate===null?true:false} onChange={(e)=>{setPassword(e.target.value);validatePassword()}} type='password' color='success' id="outlined-multiline-static " sx={{backgroundColor:'white', marginTop:'30px', width:'25rem'}} label="Password"/>
                        </div>
                        <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                            <TextField  helperText={cPassValidate===false?'Not matching':''} error={cPassValidate?false:true} onChange={(e)=>{setCPassword(e.target.value);validateCPass(e)}} type='password' color='success' id="outlined-multiline-static cPass field" sx={{backgroundColor:'white', marginTop:'30px', width:'25rem'}} label="Confirm Password"/>
                        </div>
                        <Box display='flex' sx={{justifyContent:'center', alignItems:'center', marginBottom:'20px', marginTop:'20px'}}>
                            <Button onClick={(e)=>{handleSubmit(e)}} type='submit' color='grey'  variant="contained" className='btn' sx={{ fontSize:'large', borderRadius:'10px', bgcolor:Colors.grey[900], color:'white', marginTop:"20px"}}>Register</Button>
                        </Box>
                        <div className="footer">
                            <Typography variant='h6'>Already have an account? <a href="/login">Login</a></Typography>
                        </div>
                    </Box>
          </div>
        </Container>
    </>
  )
}

export default Register