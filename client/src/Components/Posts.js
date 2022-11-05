import React, {useEffect, useState} from "react";
import { Typography, Box, Container, Card, CardContent, CardHeader, CardMedia, CardActions, IconButton, Avatar, Button} from "@mui/material";

import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';

import * as Colors from '@mui/material/colors'

import secondary_bg from './images/secondary_forest_bg.jpg'
import back from './images/all.jpg'

const Posts = () => {
    const [posts, setPost] = useState(null)
    const [users, setUsers] = useState(null)
    let users2 = []
    
    const getAllPosts = async ()=> {
        const response = await fetch('http://localhost:8000/getAllPosts', {
            headers: {
                accept: 'application/json'
            }
        })
        const data = await response.json()
        if (data) {
            setPost(data.posts)
        }


        for (let i=0; i<data.posts.length;i++) {
            let url = 'http://localhost:8000/getUser/'+data.posts[i].user
            const res = await fetch(url)
            const data_ = await res.json()
            let word = data_.user.name
            let lower = word.toLowerCase()
            word = lower.charAt(0).toUpperCase() + lower.slice(1)

            users2.push(word)
            if (users2!==null) {
                // console.log(true);
                setUsers(users2)
            }else {
                // console.log(false)
            }
        }
    }
    useEffect(() => {
        let isMounted = true;   
        if (isMounted) {
            getAllPosts()
        }
      return () => {
        isMounted=  false
      }
    })
    
    return (
        <>
        <Container sx={{backgroundImage:`url(${secondary_bg})`,backgroundSize:'cover',backgroundRepeat:'no-repeat',backgroundPosition:'center center', borderRadius:'20px', boxShadow:'3px 3px 2px 3px grey'}}>
            <Box sx={{border:'1px solid black', borderRadius:'9px', marginTop:'50px', background:'white'}}>
                <h1 align='center'>All Posts</h1>
            </Box>
            <Container className='allPostsContainer' sx={{padding:'20px'}}>
                <Box>
                    <Card sx={{ maxWidth: 345, borderRadius:'10px', boxShadow:'3px 3px 2px 3px'+Colors.green[300]}}>
                        <CardMedia
                            component="img"
                            height="140"
                            image={back}
                            alt="green iguana"
                        />
                    <CardHeader title="By: Sanjay" subheader="On: 11/4/2022" sx={{color:'green'}}/>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                            {/* {posts[0].title} */}
                            Shimla Trip
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            {/* {posts[0].description} */}
                            Best ever Shimla Trip
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" sx={{color:'green'}} endIcon={<ThumbUpOffAltOutlinedIcon/>}>0 Like</Button>
                            <Button size="small" sx={{color:'red'}} endIcon={<DeleteRoundedIcon/>}>Delete</Button>
                        </CardActions>
                    </Card>
                </Box>
            </Container>
        </Container>
        </>
    );
};

export default Posts;
