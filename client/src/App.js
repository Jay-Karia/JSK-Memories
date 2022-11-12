import "./App.css";
import {Routes, Route} from 'react-router-dom'

import Header from "./Components/Header";
import Auth from './Components/Auth'
import Posts from './Components/Posts'
import UserPosts from './Components/UserPosts'
import PostDetail from './Components/PostDetail'
import AddPost from './Components/AddPost'

import React, {useState} from 'react'
import { AppBar, Toolbar, Typography, Box, Button, Tabs, Tab, Container, ButtonGroup } from "@mui/material";
import {Link} from 'react-router-dom'
import '@fontsource/roboto/400.css';
import * as Colors from '@mui/material/colors'

import { createTheme, ThemeProvider } from '@mui/material/styles';

import ForestIcon from '@mui/icons-material/Forest';
import SailingIcon from '@mui/icons-material/Sailing';
import CastleIcon from '@mui/icons-material/Castle';

// Forest Theme
import forest_button from './Components/images/forest/forest_button.jpg'
import forest_bg from './Components/images/forest/forest.jpg'


// Underwater Theme
import underwater_button from './Components/images/underwater/underwater_btn.jpg'
import underwater_bg from './Components/images/underwater/underwater_bg.jpg'

// Halloween Theme
import pumpkin_button from './Components/images/halloween/pumkin_button.jpg'
import halloween_bg from './Components/images/halloween/halloween_bg.jpg'


// Dark Theme / Light Theme
import dark_button from './Components/images/dark_btn.jpg'
import dark_bg from './Components/images/dark.jpg'
import light_button from './Components/images/light_button.jpg'
import light_bg from './Components/images/light.jpg'



function App() {
    const [value, setValue] = useState(0)
    const forest = createTheme({
      palette: {
        primary: {
          main: Colors.green[400], // for register button and header font color
          light: Colors.green[100],
          dark: Colors.green[600]
        }
      }
    })
  
    const underwater = createTheme({
      palette: {
          primary: {
              main: Colors.blue[400],
              light: Colors.blue[100],
              dark: Colors.blue[600]
          }
      }
    })
    const halloween = createTheme({
      palette: {
          primary: {
              main: Colors.purple[400],
              light: Colors.purple[100],
              dark: Colors.purple[600]
          }
      }
    })
  
    const dark = createTheme({
      palette: {
          primary: {
              main: Colors.yellow[400],
              light: Colors.yellow[100],
              dark: Colors.yellow[600],
          }
      }
    })
  
    const light = createTheme({
      palette: {
        primary: {
          main: Colors.blueGrey[400],
          light: Colors.blueGrey[100],
          dark: Colors.blueGrey[600],
        }
      }
    })
    let localTheme = localStorage.getItem('theme')
    if (!localTheme) localTheme = 'light' 
    const [theme, setTheme] = useState(light)
  
    const fontColor = ''
  
    const changeTheme = (theme)=> {
      localStorage.setItem('theme', theme)
      let btn_color =''
      let field_color =''
      if (theme==='forest') {
        setTheme(forest)
        document.getElementById('h').style.backgroundImage = `url(${forest_bg})`
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
  
    const [post, setPost] = useState('all')
  
    function changePost(post) {
        setPost(post)
    }
    return (
        <>
        <main>
        {/* Header Component */}
        <Header theme={theme}/>


        {/* Main Component */}
        <ThemeProvider theme={theme}>
            <Container sx={{marginTop: '100px', color:fontColor}}>
            <div className="container">
                <Box marginLeft="auto" marginRight="auto" align='center'>
                    <Typography variant="h2">Welcome to JSK <Typography variant='body' color="primary">Memories</Typography></Typography>
                    <Typography variant="h6" ><span style={{color:'grey'}}>- your house of memories</span></Typography>
                </Box>
                <br /><br /><br />
                    <Container sx={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <Button LinkComponent={Link} to='/addPost' variant="contained" color='primary' sx={{borderRadius:'50px', fontSize:'1rem', color:'black'}}><span>Create a new Post</span></Button>
                    </Container>

                    <Box sx={{justifyContent:'center', alignItems:"center", display:'flex', marginTop:'70px'}}>
                        <Button variant="outlined" onClick={()=> {changeTheme('forest')}} endIcon={<ForestIcon/>} className="themeButtons" sx={{marginBottom:"10px", color:'green',fontWeight:"bold", 'fontSize':'1rem', padding:'15px', 'borderRadius':'50px', background:`url(${forest_button})`, boxShadow:'3px 3px 2px 3px grey', width:'14rem'}}>Forest Theme</Button>
                        <Button variant="outlined" onClick={()=> {changeTheme('underwater')}} endIcon={<SailingIcon/>} className="themeButtons" sx={{marginBottom:"10px", color:Colors.blue[300],fontWeight:"bold", 'fontSize':'1rem', padding:'15px', 'borderRadius':'50px', background:`url(${underwater_button})`, boxShadow:'3px 3px 2px 3px grey', width:'14rem', marginLeft:'40px'}}>UnderWater Theme</Button>
                        <Button variant="outlined" onClick={()=> {changeTheme('halloween')}} endIcon={<CastleIcon/>} className="themeButtons" sx={{marginBottom:"10px", color:"white",fontWeight:"bold", 'fontSize':'1rem', padding:'15px', 'borderRadius':'50px', background:`url(${pumpkin_button})`, boxShadow:'3px 3px 2px 3px grey', width:'14rem', marginLeft:'40px'}}>Halloween Theme</Button>
                        <Button className="dark_theme" onClick={()=> {changeTheme('dark')}} sx={{color:'white', fontWeight:'bold', fontSize:'1rem', padding:'15px', borderRadius:'50px', marginLeft:'40px', width:'14rem', marginBottom:'10px', background:`url(${dark_button})`, boxShadow:'3px 3px 2px 3px grey'}} variant='outlined'>Dark Theme</Button>
                        <Button onClick={()=> {changeTheme('light')}} className="light_theme" sx={{color:'black', fontWeight:'bold', fontSize:'1rem', padding:'15px', borderRadius:'50px', marginLeft:'40px', width:'14rem', marginBottom:'10px', background:`url(${light_button})`, boxShadow:'3px 3px 2px 3px grey', display:'none'}} variant='outlined'>Light Theme</Button>
                    </Box>
            </div>
                <Container>
                    <Box display="flex" marginLeft="auto"  marginRight='auto' sx={{justifyContent:'center', marginTop:'50px', borderRadius:'20px'}}>
                    <Tabs value={value} onChange={(e, v)=>setValue(v)} textColor='inherit' sx={{padding:"10px", borderRadius:'20px', border:"2px solid black", background:theme.palette.primary.light}}>
                        <Tab LinkComponent={Link} to='/post' sx={{borderRadius:'20px', fontSize:"1.1rem", padding:"0 30px 0 30px", background:"white"}}  onClick={()=>{changePost('all')}} label="All Posts"></Tab>
                        <Tab LinkComponent={Link} to='/userPost' sx={{borderRadius:'20px', fontSize:"1.1rem", padding:"0 30px 0 30px", background:"white", marginLeft:"20px"}} onClick={()=>{changePost('user')}} label="My Posts"></Tab>
                    </Tabs>
                    </Box>
                </Container>
            </Container>
        </ThemeProvider>


            <Routes>
                <Route path="/auth" element={<Auth/>}></Route>
                <Route path="/myPosts/:id" element={<PostDetail/>}></Route>
                <Route path="/addPost" element={<AddPost theme={theme}/>}></Route>
                <Route path="/post" element={<Posts theme={theme}/>}></Route>
                <Route path="/userPost" element={<UserPosts theme={theme}/>}></Route>
            </Routes>
        </main>
        </>
    );
}

export default App;
