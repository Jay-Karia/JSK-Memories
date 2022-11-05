import React, {useState} from 'react'
import { AppBar, Toolbar, Typography, Box, Button, Tabs, Tab, Container, ButtonGroup } from "@mui/material";
import {Link} from 'react-router-dom'
import '@fontsource/roboto/400.css';
import * as Colors from '@mui/material/colors'

import ForestIcon from '@mui/icons-material/Forest';
import SailingIcon from '@mui/icons-material/Sailing';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import CastleIcon from '@mui/icons-material/Castle';

import forest from './images/forest_button.jpg'
import underwater from './images/underwater_btn.jpg'
import pumpkin_button from './images/pumkin_button.jpg'


const Main = () => {
    const [value, setValue] = useState(0)
    const [collapsed, setCollapsed] = useState(false)
  return (
    <>
        <Container sx={{marginTop: '100px'}}>
            <Box marginLeft="auto" marginRight="auto" align='center'>
                <Typography variant="h2">Welcome to JSK <span style={{color:Colors.green[300]}}>Memories</span></Typography>
                <Typography variant="h6" ><span style={{color:'grey'}}>- your house of memories</span></Typography>
            </Box>
            <br /><br /><br />
              <Container sx={{display:'flex', alignItems:'center', justifyContent:'center'}}>
              <Button variant="contained" LinkComponent={Link} to='/addPost' sx={{borderRadius:'50px', bgcolor:Colors.green[400], fontSize:'1rem'}}><span>Create a new Post</span></Button>
              </Container>

              <Box sx={{justifyContent:'center', alignItems:"center", display:'flex', marginTop:'70px'}}>
                  <Button variant="outlined" endIcon={<ForestIcon/>} className="themeButtons" sx={{marginBottom:"10px", color:'green',fontWeight:"bold", 'fontSize':'1rem', padding:'15px', 'borderRadius':'50px', background:`url(${forest})`, boxShadow:'3px 3px 2px 3px grey', width:'14rem'}}>Forest Theme</Button>
                  <Button variant="outlined" endIcon={<SailingIcon/>} className="themeButtons" sx={{marginBottom:"10px", color:Colors.blue[300],fontWeight:"bold", 'fontSize':'1rem', padding:'15px', 'borderRadius':'50px', background:`url(${underwater})`, boxShadow:'3px 3px 2px 3px grey', width:'14rem', marginLeft:'50px'}}>UnderWater Theme</Button>
                  <Button variant="outlined" endIcon={<CastleIcon/>} className="themeButtons" sx={{marginBottom:"10px", color:"white",fontWeight:"bold", 'fontSize':'1rem', padding:'15px', 'borderRadius':'50px', background:`url(${pumpkin_button})`, boxShadow:'3px 3px 2px 3px grey', width:'14rem', marginLeft:'50px'}}>Halloween Theme</Button>
              </Box>
            <Container>
              <Box display="flex" marginLeft="auto" marginRight='auto' sx={{justifyContent:'center', marginTop:'50px'}}>
                <Tabs value={value} onChange={(e, v)=>setValue(v)} textColor='inherit'  >
                    <Tab LinkComponent={Link} to="/posts" label="All Posts"></Tab>
                    <Tab LinkComponent={Link} to='/myPosts' label="My Posts"></Tab>
                </Tabs>
              </Box>
            </Container>
        </Container>
    </>
  )
}

export default Main