import "./App.css";
import {Routes, Route} from 'react-router-dom'

import Header from "./Components/Header";
import Auth from './Components/Auth'
import Posts from './Components/Posts'
import UserPosts from './Components/UserPosts'
import PostDetail from './Components/PostDetail'
import AddPost from './Components/AddPost'

import React, {useState} from 'react'
import {Typography, Box, Button, Tabs, Tab, Container} from "@mui/material";
import {Link} from 'react-router-dom'
import '@fontsource/roboto/400.css';
import * as Colors from '@mui/material/colors'


import ForestIcon from '@mui/icons-material/Forest';
import SailingIcon from '@mui/icons-material/Sailing';
import CastleIcon from '@mui/icons-material/Castle';

// Forest Theme
import forest_bg from './Components/images/forest/forest.jpg'

import secondary_forest from './Components/images/forest/forest_bg.jpg'



function App() {
    const [value, setValue] = useState(0)

    return (
        <div>
        <main>
        {/* Header Component */}
        <Header/>


        {/* Main Component */}
            <Container sx={{marginTop: '100px'}}>
            <div className="container">
                <Box marginLeft="auto" marginRight="auto" align='center'>
                    <Typography variant="h2">Welcome to JSK <Typography variant='body'> <span style={{color:Colors.green[900]}}>Memories</span></Typography></Typography>
                    <Typography variant="h6" ><span style={{color:'grey'}}>- your house of memories</span></Typography>
                </Box>
                <br /><br /><br />
                    <Container sx={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <Button LinkComponent={Link} to='/addPost' variant="contained" sx={{borderRadius:'50px', fontSize:'1rem', color:'black', bgcolor:Colors.green[600]}}><span>Create a new Post</span></Button>
                    </Container>
            </div>
                <Container>
                    <Box display="flex" marginLeft="auto"  marginRight='auto' sx={{justifyContent:'center', marginTop:'50px', borderRadius:'20px'}}>
                    <Tabs value={value} onChange={(e, v)=>setValue(v)} textColor='inherit' sx={{padding:"10px", borderRadius:'20px', border:"2px solid black", bgcolor:Colors.green[100]}}>
                        <Tab LinkComponent={Link} to='/post' sx={{borderRadius:'20px', fontSize:"1.1rem", padding:"0 30px 0 30px", background:"white"}} label="All Posts"></Tab>
                        <Tab LinkComponent={Link} to='/userPost' sx={{borderRadius:'20px', fontSize:"1.1rem", padding:"0 30px 0 30px", background:"white", marginLeft:"20px"}}label="My Posts"></Tab>
                    </Tabs>
                    </Box>
                </Container>
            </Container>

            <Routes>
                <Route path="/auth" element={<Auth/>}></Route>
                <Route path="/myPosts/:id" element={<PostDetail/>}></Route>
                <Route path="/addPost" element={<AddPost/>}></Route>
                <Route path="/post" element={<Posts/>}></Route>
                <Route path="/userPost" element={<UserPosts/>}></Route>
            </Routes>
        </main>
        </div>
    );
}

export default App;
