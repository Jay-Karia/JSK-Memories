import React, { useState } from "react";
import {Box, TextField, Container, Button} from '@mui/material'

import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import PostAddRoundedIcon from '@mui/icons-material/PostAddRounded';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';

import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import * as Colors from '@mui/material/colors'
import dayjs from 'dayjs'

const AddPost = () => {
    const [file, setFile] = useState('')
    const [value, setValue] = React.useState(dayjs(Date.now()));

    const handleChange = (newValue) => {
      setValue(newValue);
    };
    return (
        <>
                <Container className="addContainer" align='center' sx={{border:'2px solid black', marginTop:'30px', border:'2px solid black', borderRadius:'14px', alignItems:"center", background:'white', width:'30rem', marginBottom:'20px', '&:hover': { boxShadow:'1px 10px 20px 3px grey'}, transition:'all .3s ease-in'}}>
                <div style={{border:'2px solid white', marginTop:"20px", marginBottom:'20px', backgroundColor:"white", borderRadius:'14px'}}>
                    <div style={{display:'flex', justifyContent:'center'}}>
                        <h1 style={{display:'flex', alignItems:'center'}} align='center'>Add Post <span style={{display:'flex', justifyContent:'center', marginLeft:'20px'}}><PostAddRoundedIcon fontSize='large'/></span></h1>
                    </div>
                    <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '20rem' }}} noValidate autoComplete="off">
                        <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                            <TextField className="textField" label="Title" id="outlined-size-small" style={{marginTop:'30px'}} defaultValue="" size="small"/>
                        </div>
                        <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                            <TextField id="outlined-multiline-static field" sx={{backgroundColor:'white'}} label="Description" multiline rows={4} />
                        </div>
                        <div style={{display:'flex', alignItems:'center', justifyContent:'center', marginTop:'20px', border:'0.1px solid grey', padding:'10px', fontFamily:'roboto', borderRadius:'5px', width:'70%'}}>
                            <label htmlFor="selection of a file" style={{fontSize:'1.1rem', marginRight:'10px'}}>Upload File: </label>
                            <Button variant="contained" color='primary' className='btn' sx={{ borderRadius:'30px'}} component="label"><FileUploadRoundedIcon/><input type="file" className="fileUpload" onChange={(e)=>{setFile(e.target.value)}} hidden/></Button>
                            <label htmlFor="" style={{marginLeft:'10px'}}><b>{file.substring(12).split('.')[0].length>10?file.substring(12).split('.')[0].substring(0, 10)+"..."+file.substring(12).split('.')[1]:file.substring(12)}</b></label>
                        </div>
                        <Box sx={{display:'flex', alignItems:'center', justifyContent:"center", marginTop:'20px'}}>
                            <div>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <Stack spacing={3}>
                                        <DesktopDatePicker label="Date" inputFormat="MM/DD/YYYY" value={value} onChange={handleChange} renderInput={(params) => <TextField className="textField" {...params} />}/>
                                    </Stack>
                                </LocalizationProvider>
                            </div>
                        </Box>
                        <Box display='flex' sx={{justifyContent:'center', alignItems:'center', marginBottom:'20px', marginTop:'20px'}}>
                            <Button endIcon={<AddBoxRoundedIcon fontSize='large'/>} variant="contained" className='btn' color='primary' sx={{ fontSize:'large', borderRadius:'10px'}}>Add</Button>
                        </Box>
                    </Box>
                </div>
                </Container>
        </>
        
    )
};

export default AddPost;
