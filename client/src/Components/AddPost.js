import React, { useState } from "react";
import {Box, TextField, Container, Button} from '@mui/material'
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';

const AddPost = () => {
    const [file, setFile] = useState('')
    return (
        <>
        <Container display="flex" align='center'>
            <h1>Add Post</h1>
            <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }}} noValidate autoComplete="off">
                <div style={{position:'absolute', left:'10px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <TextField label="Title" id="outlined-size-small" style={{marginTop:'30px'}} defaultValue="" size="small"/>
                </div>
                <div style={{position:'absolute', left:'10px', display:'flex', alignItems:'center', justifyContent:'center', marginTop:'70px'}}>
                    <TextField id="outlined-multiline-static" label="Description" multiline rows={4} />
                </div>
                <div style={{position:'absolute', left:'10px', display:'flex', alignItems:'center', justifyContent:'center', marginTop:'70px', position:'absolute', bottom:'30%'}}>
                <label htmlFor="">Select File</label>
                    <Button startIcon={<FileUploadRoundedIcon/>} variant="contained" component="label"> Upload File <input type="file" className="fileUpload" onChange={(e)=>{setFile(e.target.value)}} hidden/></Button>
                    <label htmlFor="">{file}</label>
                </div> 
            </Box>
        </Container>
        </>
        
    )
};

export default AddPost;
