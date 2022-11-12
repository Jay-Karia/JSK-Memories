import React, {useEffect, useState} from "react";
import { Typography, Box, Container, Card, CardContent, CardHeader, CardMedia, CardActions, IconButton, Avatar, Button} from "@mui/material";

import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import ThumbUpOffAltRoundedIcon from '@mui/icons-material/ThumbUpOffAltRounded';

import * as Colors from '@mui/material/colors'

import { createTheme, ThemeProvider } from '@mui/material/styles';

import forest_bg2 from './images/forest/forest_bg.jpg'
import secondary_water from './images/underwater/secondary_water.jpg'
import secondary_halloween from './images/halloween/s_halloween.jpg'
import secondary_dark from './images/s_dark.jpg'
import secondary_light from './images/s_light.jpg'

import back from './images/all.jpg'

const Posts = (props) => {
    const [posts, setPost] = useState(null)
    const [users, setUsers] = useState(null)
    let users2 = []
    
    const getAllPosts = async ()=> {
        const response = await fetch('http://localhost:8000/getAllPosts', {
            headers: {
                'Content-type': 'application/json'
            }
        })
        const data = await response.json()
        
        if (Object.is(data.posts, null)) {
            // console.log(false)
        } else{
            // console.log(true)
            setPost(data.posts)
            for (let i=0; i<data.posts.length;i++) {
                let url = 'http://localhost:8000/getUser/'+data.posts[i].user
                const res = await fetch(url)
                const data_ = await res.json()
                let word = data_.user.name
                let lower = word.toLowerCase()
                word = lower.charAt(0).toUpperCase() + lower.slice(1)
    
                users2.push(word)
                if (users2!==null) {
                    setUsers(users2)
                }
            }
        } 


    }
    useEffect(() => {
        getAllPosts()
        // console.log(posts)
    })

    return (
        <>
            <ThemeProvider theme={props.theme}>
                <Container maxWidth={false} id='postsContainer' sx={{backgroundImage:`url(${secondary_light})`,  backgroundSize:'cover',backgroundRepeat:'no-repeat',backgroundPosition: 'sticky',borderRadius:'20px', boxShadow:'1px 10px 20px 7px grey', marginBottom:'20px', width:'80%', marginLeft:"200px", marginTop:'50px', '&:hover': { boxShadow:'7px -3px 10px .1px  grey'}, transition:'all .3s ease-in', padding:'20px'}}>
                    <Box sx={{border:'1px solid black', borderRadius:'9px', background:'white'}}>
                        <h1 align='center'>All Posts</h1>
                    </Box>
                    <Container className='allPostsContainer' sx={{padding:'20px', margin:"0"}}>
                        <Box >
                        {/* {posts.map((e)=>{
                            return ( 
                                <Card sx={{ maxWidth: 345, borderRadius:'10px', bgcolor:props.theme.palette.primary.light, '&:hover': {
                                    boxShadow:'0 0 20px 0 white'
                                }, border:'2px solid black'}}>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={back}
                                            alt="post image"
                                        />
                                        <hr style={{border:'1px solid black'}}/>
                                        <div  style={{backgroundColor:"white"}}>
                                            <CardHeader title="By: Sanjay" subheader="On: 11/4/2022"/>
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="div">
                                                Shimla Trip
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                Best ever Shimla Trip
                                                </Typography>
                                            </CardContent>
                                        </div>
                                        <CardActions sx={{padding:"0"}}>
                                            <div style={{background:"white", margin:"0", height:"42.25px", width:"30px", display:"flex", justifyContent:"center", alignItems:"center", borderBottomLeftRadius:"0.1px", backgroundColor:"white"}}>
                                                <label htmlFor="likes" style={{fontSize:'1.4rem', marginBottom:'5px'}}>0</label>
                                            </div>
                                            <Button endIcon={<ThumbUpOffAltRoundedIcon/>} size="large" sx={{color:'green', borderRadius:"0",'&:hover': {bgcolor:"white"}}} >Like</Button>
                                            <Button endIcon={<DeleteRoundedIcon/>} size="large" sx={{color:'red','&:hover': {bgcolor:"white"}, borderRadius:"0"}}>Delete </Button>
                                        </CardActions>
                                    </Card>
                             )
                          
                        })} */}
                        </Box>
                    </Container>
                </Container>
            </ThemeProvider>
        </>
    );
};

export default Posts;
