import React, { useState } from "react";
import {Box, TextField, Container, Button} from '@mui/material'
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
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
        <Container display="flex" align='center'>
            <h1>Add Post</h1>
            <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }}} noValidate autoComplete="off">
                <div style={{position:'absolute', left:'10px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <TextField label="Title" id="outlined-size-small" style={{marginTop:'30px'}} defaultValue="" size="small"/>
                </div>
                <div style={{position:'absolute', left:'10px', display:'flex', alignItems:'center', justifyContent:'center', marginTop:'70px'}}>
                    <TextField id="outlined-multiline-static" label="Description" multiline rows={4} />
                </div>
                <div style={{position:'absolute', left:'20px', display:'flex', alignItems:'center', justifyContent:'center', position:'absolute', bottom:'34%',border:'0.1px solid grey', padding:'10px', fontFamily:'roboto', borderRadius:'5px'}}>
                    <label htmlFor="selection of a file" style={{fontSize:'1.1rem', marginRight:'10px'}}>Upload File: </label>
                    <Button variant="contained" sx={{bgcolor:Colors.green[700]}} component="label"><FileUploadRoundedIcon/><input type="file" className="fileUpload" onChange={(e)=>{setFile(e.target.value)}} hidden/></Button>
                    {/* <label htmlFor="" style={{marginLeft:'10px'}}><b>{file.split('\\')[2]}</b></label> */}
                </div>
                <Box sx={{position:'absolute', bottom:'17%', left:'10px'}}>
                    <div>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Stack spacing={3}>
                                <DesktopDatePicker label="Date" inputFormat="MM/DD/YYYY" value={value} onChange={handleChange} renderInput={(params) => <TextField {...params} />}/>
                            </Stack>
                        </LocalizationProvider>
                    </div>
                </Box>
            </Box>
        </Container>
        </>
        
    )
};

export default AddPost;
