import React, {useEffect, useState} from "react";
import { Typography, Box, Container, Card, CardContent, CardHeader, CardMedia, CardActions, IconButton, Avatar, Button} from "@mui/material";

import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import ThumbUpOffAltRoundedIcon from '@mui/icons-material/ThumbUpOffAltRounded';

import * as Colors from '@mui/material/colors'

import { createTheme, ThemeProvider } from '@mui/material/styles';

// Forest Theme
import secondary_bg from './images/forest/secondary_forest_bg.jpg'

// Underwater Theme
import secondary_water_bg from './images/underwater/secondary_ocean.png'

// Halloween Theme
import secondary_halloween from './images/halloween/secondary_halloween_bg.jpg'
import grave from './images/halloween/grave.jpg'

import back from './images/all.jpg'

const Posts = (props) => {
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
            // getAllPosts()
        }
      return () => {
        isMounted=  false
      }
    })

    const forest = createTheme({
        palette: {
          primary: {
            main: Colors.green[300]
          }
        }
    })

    const underwater = createTheme({
        palette: {
            primary: {
                main: Colors.blue[300]
            }
        }
      })

      const halloween = createTheme({
        palette: {
            primary: {
                main: Colors.purple[600]
            }
        }
    })

    const dark = createTheme({
        palette: {
            primary: {
                main: Colors.yellow[600]
            }
        }
      })
  
      const light = createTheme({
        palette: {
          primary: {
            main: Colors.blueGrey[600]
          }
        }
      })

    const themeColor = forest.palette.primary.main
    
    return (
        <>
            {/* <ThemeProvider theme={light}> */}
                <Container sx={{background:'white', borderRadius:'20px', boxShadow:'3px 3px 2px 3px grey', marginBottom:'20px', width:'100vw', marginLeft:'200px', maxWidth:'100vw', width:'80vw', marginTop:'50px', '@media (min-width: 1200px).css-hu2re8-MuiContainer-root': {
                    maxWidth:'100vw'
                }}}>
                    <Box sx={{border:'1px solid black', borderRadius:'9px', marginTop:'20px', background:'white'}}>
                        <h1 align='center'>All Posts</h1>
                    </Box>
                    <Container className='allPostsContainer' sx={{padding:'20px'}}>
                        <Box>
                        <Card sx={{ maxWidth: 345, borderRadius:'10px', '&:hover': {boxShadow:'0 0 3px 3px '+themeColor}, boxShadow:'2px 2px 1px 2px grey'}}>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={back}
                                    alt="green iguana"
                                />
                            <CardHeader title="By: Sanjay" subheader="On: 11/4/2022"/>
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
                                    <label htmlFor="likes" style={{fontSize:'1.4rem', marginLeft:'5px', marginBottom:'5px'}}>0</label>
                                    <Button endIcon={<ThumbUpOffAltRoundedIcon/>} size="large" sx={{marginLeft:'10px',color:'green'}} >Like</Button>
                                    <Button endIcon={<DeleteRoundedIcon/>} size="large" sx={{color:'red'}}>Delete </Button>
                                </CardActions>
                            </Card>
                        </Box>
                    </Container>
                </Container>
            {/* </ThemeProvider> */}
        </>
    );
};

export default Posts;
