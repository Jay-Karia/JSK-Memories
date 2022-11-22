import "./App.css";
import {Routes, Route} from 'react-router-dom'

import Header from "./Components/Header";
import Posts from './Components/Posts'
import PostDetail from './Components/PostDetail'
import AddPost from './Components/AddPost'
import BasicAlert from './Components/BasicAlert'

import React, {useState, useEffect} from 'react'
import {Typography, Box, Button, Tabs, Tab, Container} from "@mui/material";
import {Link} from 'react-router-dom'
import '@fontsource/roboto/400.css';
import * as Colors from '@mui/material/colors'


import Login from "./Components/Login";
import Register from "./Components/Register";

import {useSelector} from 'react-redux' 

function App() {
    const [value, setValue] = useState(0)

    const isLoggedIn = useSelector(state=>state.isLoggedIn)
    const [alert, setAlert] = useState(null)
    const [name, setName] = useState(null)

    const showAlert = (message, type) => {
        setAlert({
          msg: message,
          type: type,
        });
        setTimeout(() => {
          setAlert(null);
        }, 3000);
      };

      useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        };
          fetch('http://localhost:8000/isUserAuth', requestOptions).then((res)=>res.json())
          .then((data)=>{
            try {
                setName(data.payload.name)
            } catch {}
        })
    })
    
    return (
        <div>
        <main>
        {/* Header Component */}
        <Header showAlert={showAlert}/>



        {/* Main Component */} 
            <Container sx={{marginTop: '150px'}}>
            <BasicAlert alert={alert} />
            <div className="container">
                <Box marginLeft="auto" marginRight="auto" align='center'>
                    <Typography variant="h2">Welcome to JSK <Typography variant='body'> <span style={{color:Colors.green[900]}}>Memories</span></Typography></Typography>
                    <Typography variant="h6" ><span style={{color:'grey'}}>- your house of memories</span></Typography>
                </Box>
                <br /><br /><br />
                    <Container sx={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <Button color='success' LinkComponent={Link} to='/addPost' variant="contained" sx={{borderRadius:'50px', fontSize:'1rem', color:'black', bgcolor:Colors.green[600]}}><span>Create a new Post</span></Button>
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

            <div style={{display:"flex", alignItems:"center", justifyContent:'center', marginTop:"20px"}}>
                <h1>{name && 'Welcome '+name}</h1>
            </div>

            <Routes>
                <Route path="/login" element={<Login showAlert={showAlert}/>}></Route>
                <Route path="/register" element={<Register showAlert={showAlert}/>}></Route>
                <Route path="/myPosts/:id" element={<PostDetail/>}></Route>
                <Route path="/addPost" element={<AddPost/>}></Route>
                <Route path="/post" element={<Posts user={false}/>}></Route>
                <Route path="/userPost" element={<Posts user={true}/>}></Route>
            </Routes>
        </main>
        </div>
    );
}

export default App;
