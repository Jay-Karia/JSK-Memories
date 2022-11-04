import React, {useState} from 'react'
import { AppBar, Toolbar, Typography, Box, Button, Tabs, Tab, Container, CssBaseline } from "@mui/material";
import {Link} from 'react-router-dom'
import '@fontsource/roboto/400.css';
import AddPost from './AddPost'

const Main = () => {
    const [value, setValue] = useState(0)
  return (
    <>
        <Container sx={{marginTop: '100px'}}>
            <Box marginLeft="auto" marginRight="auto" align='center'>
                <Typography variant="h2">Welcome to JSK <span style={{color:'green'}}>Memories</span></Typography>
                <Typography variant="h6" ><span style={{color:'grey'}}>- developed by Jay Sanjay Karia</span></Typography>
            </Box>
            <Container>
              <Box display="flex" marginLeft="auto" marginRight='auto' sx={{justifyContent:'center', marginTop:'100px'}}>
                <Tabs value={value} onChange={(e, v)=>setValue(v)} textColor='inherit'  >
                    <Tab LinkComponent={Link} to="/posts" label="All Posts"></Tab>
                    <Tab LinkComponent={Link} to='/myPosts' label="My Posts"></Tab>
                </Tabs>
              </Box>
            </Container>
            <Container sx={{position:'absolute', right:'20px', marginTop:'100px', width:'25rem', height:'30rem', display:'flex', justifyContent:'center', border:'2px solid black', borderRadius:'9px'}} marginRight='auto' className='addContainer'>
            <AddPost/>
            </Container>
        </Container>
    </>
  )
}

export default Main