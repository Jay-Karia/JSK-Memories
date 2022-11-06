import React, {useState} from 'react'
import { AppBar, Toolbar, Typography, Box, Button, Tabs, Tab, Container, ButtonGroup } from "@mui/material";
import {Link} from 'react-router-dom'
import '@fontsource/roboto/400.css';
import * as Colors from '@mui/material/colors'
import Header from "./Header";

import { createTheme, ThemeProvider } from '@mui/material/styles';

import ForestIcon from '@mui/icons-material/Forest';
import SailingIcon from '@mui/icons-material/Sailing';
import CastleIcon from '@mui/icons-material/Castle';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';


// Forest Theme
import forest_button from './images/forest/forest_button.jpg'
import forest_bg from './images/forest/forest_bg.jpg'

// Underwater Theme
import underwater_button from './images/underwater/underwater_btn.jpg'
import underwater_bg from './images/underwater/underwater_bg.jpg'

// Halloween Theme
import pumpkin_button from './images/halloween/pumkin_button.jpg'
import halloween_bg from './images/halloween/halloween_bg.jpg'

// Dark Theme / Light Theme
import dark_button from './images/dark_btn.jpg'
import dark_bg from './images/dark.jpg'
import light_button from './images/light_button.jpg'
import light_bg from './images/light.jpg'

const Main = () => {
    const forest = createTheme({
      palette: {
        primary: {
          main: Colors.green[400]
        }
      }
    })

    const underwater = createTheme({
      palette: {
          primary: {
              main: Colors.blue[400]
          }
      }
    })
    const halloween = createTheme({
      palette: {
          primary: {
              main: Colors.purple[400]
          }
      }
    })

    const dark = createTheme({
      palette: {
          primary: {
              main: Colors.yellow[400]
          }
      }
    })

    const light = createTheme({
      palette: {
        primary: {
          main: Colors.blueGrey[400]
        }
      }
    })
    let localTheme = localStorage.getItem('theme') 
    if (!localTheme) localTheme = 'light' 
    const [theme, setTheme] = useState(light)
    const [value, setValue] = useState(0)

    const fontColor = ''

    const changeTheme = (theme)=> {
      if (theme==='forest') {
        setTheme(forest)
        const elem = document.getElementById('h')
        elem.style.backgroundImage = `url(${forest_bg})`
        document.getElementsByClassName('container')[0].style.color = 'black'
      } else if (theme === 'dark') {
        setTheme(dark)
        const elem = document.getElementById('h')
        elem.style.backgroundImage = `url(${dark_bg})`
        document.getElementsByClassName('container')[0].style.color = 'white'

        document.getElementsByClassName('light_theme')[0].style.display = 'block'
        document.getElementsByClassName('dark_theme')[0].style.display = 'none'

      }else if (theme === 'halloween') {
        setTheme(halloween)
        const elem = document.getElementById('h')
        elem.style.backgroundImage = `url(${halloween_bg})`
        document.getElementsByClassName('container')[0].style.color = 'black'
      }else if (theme === 'underwater') {
        setTheme(underwater)
        const elem = document.getElementById('h')
        elem.style.backgroundImage = `url(${underwater_bg})`
        document.getElementsByClassName('container')[0].style.color = 'black'
      } else if (theme === 'light') {
        setTheme(light)
        const elem = document.getElementById('h')
        elem.style.backgroundImage = `url(${light_bg})`
        document.getElementsByClassName('container')[0].style.color = 'black'

        document.getElementsByClassName('light_theme')[0].style.display = 'none'
        document.getElementsByClassName('dark_theme')[0].style.display = 'block'
      }
    }
  return (
    <>
      <Header theme={theme}/>
      <ThemeProvider theme={theme}>
          <Container className='container' sx={{marginTop: '100px', color:fontColor}}>
              <Box marginLeft="auto" marginRight="auto" align='center'>
                  <Typography variant="h2">Welcome to JSK <Typography variant='body' color="primary">Memories</Typography></Typography>
                  <Typography variant="h6" ><span style={{color:'grey'}}>- your house of memories</span></Typography>
              </Box>
              <br /><br /><br />
                <Container sx={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                <Button variant="contained" color='primary' LinkComponent={Link} to='/addPost' sx={{borderRadius:'50px', fontSize:'1rem', color:'black'}}><span>Create a new Post</span></Button>
                </Container>

                <Box sx={{justifyContent:'center', alignItems:"center", display:'flex', marginTop:'70px'}}>
                    <Button variant="outlined" onClick={()=> {changeTheme('forest')}} endIcon={<ForestIcon/>} className="themeButtons" sx={{marginBottom:"10px", color:'green',fontWeight:"bold", 'fontSize':'1rem', padding:'15px', 'borderRadius':'50px', background:`url(${forest_button})`, boxShadow:'3px 3px 2px 3px grey', width:'14rem'}}>Forest Theme</Button>
                    <Button variant="outlined" onClick={()=> {changeTheme('underwater')}} endIcon={<SailingIcon/>} className="themeButtons" sx={{marginBottom:"10px", color:Colors.blue[300],fontWeight:"bold", 'fontSize':'1rem', padding:'15px', 'borderRadius':'50px', background:`url(${underwater_button})`, boxShadow:'3px 3px 2px 3px grey', width:'14rem', marginLeft:'40px'}}>UnderWater Theme</Button>
                    <Button variant="outlined" onClick={()=> {changeTheme('halloween')}} endIcon={<CastleIcon/>} className="themeButtons" sx={{marginBottom:"10px", color:"white",fontWeight:"bold", 'fontSize':'1rem', padding:'15px', 'borderRadius':'50px', background:`url(${pumpkin_button})`, boxShadow:'3px 3px 2px 3px grey', width:'14rem', marginLeft:'40px'}}>Halloween Theme</Button>
                    <Button className="dark_theme" onClick={()=> {changeTheme('dark')}} sx={{color:'white', fontWeight:'bold', fontSize:'1rem', padding:'15px', borderRadius:'50px', marginLeft:'40px', width:'14rem', marginBottom:'10px', background:`url(${dark_button})`, boxShadow:'3px 3px 2px 3px grey'}} variant='outlined'>Dark Theme</Button>
                    <Button onClick={()=> {changeTheme('light')}} className="light_theme" sx={{color:'black', fontWeight:'bold', fontSize:'1rem', padding:'15px', borderRadius:'50px', marginLeft:'40px', width:'14rem', marginBottom:'10px', background:`url(${light_button})`, boxShadow:'3px 3px 2px 3px grey', display:'none'}} variant='outlined'>Light Theme</Button>
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
      </ThemeProvider>
    </>
  )
}

export default Main