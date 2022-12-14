import React, { useEffect, useState } from "react";
import {Box, TextField, Container, Button} from '@mui/material'

import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import PostAddRoundedIcon from '@mui/icons-material/PostAddRounded';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';

import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import * as Colors from '@mui/material/colors'
import dayjs from 'dayjs'

import axios from 'axios'

import {useNavigate} from 'react-router-dom'

const AddPost = (props) => {
    const [file, setFile] = useState('')
    const [value, setValue] = React.useState(dayjs(Date.now()));

    const [user, setUser] = useState()

    const [title, setTitle] = useState()
    const [desc, setDesc] = useState()
    const [folder, setFolder] = useState()

    const navigate = useNavigate()

    const handleChange = (newValue) => {
      setValue(newValue);
    };

    const folder_ = (e)=>{
        let items = e.target.value
        let counter = 0
        let indexes = []
        if (items.endsWith(`\\`)) {
            for (let i =0;i<items.length;i++) {
                if (items[i].endsWith(`\\`)) {
                    counter+=1
                    indexes.push(i)
                }
            }
        }
        let folders = []
        for (let i=0;i<counter;i++) {
            folders.push(items.split('\\')[i])
        }
    }

    useEffect(() => {
        const requestOptions = {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        };
          fetch('http://localhost:8000/isUserAuth', requestOptions).then((res)=>res.json())
          .then((data)=>{
            try {
                setUser(data.payload._id)
            } catch {}
        })
    })

    const handleSubmit = (e)=> {
        e.preventDefault();
        
        // Update the formData object
        // const formData = new FormData();
     
        // Update the formData object
        // formData.append(
        //   "file",
        //   file,
        //   file.name
        // );

        fetch('http://localhost:8000/addPost', {
            method:"POST",
            headers: {
                'Content-type': 'application/json',
                'x-access-token': localStorage.getItem('token')
            },
            body: JSON.stringify({
            title: title,
            description: desc,
            image: file,
            user: user,
            date: value})
        }).then(res=>res.json())
        .then((data)=> {
            if (data.status==='ok') {
                props.showAlert(data.msg, 'success')
                navigate('/post')
            } else {
                props.showAlert(data.msg, 'error')
            }
        })
    }

    const fileUpload = (e)=> {
        setFile(e.target.files[0])
    }
    return (
        <>
                <Container align='center'  sx={{marginTop:'30px', border:'2px solid black', borderRadius:'14px', alignItems:"center", width:'30rem', marginBottom:'20px', '&:hover': { boxShadow:'1px 10px 20px 3px grey'}, transition:'all .3s ease-in', bgcolor:Colors.green[100]}}>
                <div style={{border:'2px solid white', marginTop:"20px", marginBottom:'20px', backgroundColor:"white", borderRadius:'14px'}}>
                    <div style={{display:'flex', justifyContent:'center'}}>
                        <h1 style={{display:'flex', alignItems:'center'}} align='center'>Add Post <span style={{display:'flex', justifyContent:'center', marginLeft:'20px'}}><PostAddRoundedIcon fontSize='large'/></span></h1>
                    </div>
                    <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '20rem' }}} noValidate autoComplete="off">
                        <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                            <TextField onChange={(e)=>{setTitle(e.target.value)}} color='success' className="textField" label="Title" id="outlined-size-small" style={{marginTop:'30px'}} defaultValue="" size="small"/>
                        </div>
                        <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                            <TextField onChange={(e)=>{setDesc(e.target.value)}} color='success' id="outlined-multiline-static field" sx={{backgroundColor:'white'}} label="Description" multiline rows={4}/>
                        </div>
                        <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                            <TextField color='success' onChange={(e)=>{folder_(e);setFolder(e.target.value)}} id="outlined-multiline-static field" sx={{backgroundColor:'white'}} label="Folder (separate by '\')"/>
                        </div>
                        <div style={{display:'flex', alignItems:'center', justifyContent:'center', marginTop:'20px', border:'0.1px solid grey', padding:'10px', fontFamily:'roboto', borderRadius:'5px', width:'70%'}}>
                            <label htmlFor="selection of a file" style={{fontSize:'1.1rem', marginRight:'10px'}}>Upload File: </label>
                            <Button color='success'  variant="contained" className='btn' sx={{ borderRadius:'30px', bgcolor:Colors.green[900]}} component="label"><FileUploadRoundedIcon/><input type="file" className="fileUpload" onChange={(e)=>{fileUpload(e)}} hidden/></Button>
                            <label htmlFor="" style={{marginLeft:'10px'}}><b>{file.name && file.name.split('.')[0].length>10?file.name.substring(0, 9)+"..."+file.name.split('.')[1]: file.name}</b></label>
                            {/* <label htmlFor="">{file.name && file.name}</label> */}
                        </div>
                        <Box sx={{display:'flex', alignItems:'center', justifyContent:"center", marginTop:'20px'}}>
                            <div>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <Stack spacing={3}>
                                        <DesktopDatePicker  label="Date" inputFormat="MM/DD/YYYY" value={value} onChange={handleChange} renderInput={(params) => <TextField className="textField" color='success'  {...params} />}/>
                                    </Stack>
                                </LocalizationProvider>
                            </div>
                        </Box>
                        <Box display='flex' sx={{justifyContent:'center', alignItems:'center', marginBottom:'20px', marginTop:'20px'}}>
                            <Button color='success'  type='submit' onClick={(e)=>{handleSubmit(e)}} endIcon={<AddBoxRoundedIcon fontSize='large'/>} variant="contained" className='btn' sx={{ fontSize:'large', borderRadius:'10px', bgcolor:Colors.green[900]}}>Add</Button>
                        </Box>
                    </Box>
                </div>
                </Container>
        </>
        
    )
};

export default AddPost;
