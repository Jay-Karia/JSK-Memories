import React, {useEffect, useState} from "react";
import { Typography, Box, Container, Card, CardContent, CardHeader, CardMedia, CardActions, IconButton, Avatar, Button, CircularProgress, ToggleButton} from "@mui/material";

import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import ThumbUpOffAltRoundedIcon from '@mui/icons-material/ThumbUpOffAltRounded';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';

import {ThemeProvider } from '@mui/material/styles';

import * as Colors from '@mui/material/colors'

import back from './images/all.jpg'

import secondary_forest from './images/forest/forest_bg.jpg'

const Posts = (props) => {
    const [posts, setPost] = useState('')
    const [users, setUsers] = useState('')
    
    const getAllPosts = async ()=> {
        
    }
    useEffect(() => {
        getAllPosts()

    })

    const [selected, setSelected] = React.useState(false);

    return (
        <>
                <Container maxWidth={false} id='postsContainer' sx={{backgroundImage:`url(${secondary_forest})`, backgroundSize:'cover',backgroundRepeat:'no-repeat',backgroundPosition: 'sticky',borderRadius:'20px', marginBottom:'20px', width:'80%', marginLeft:"200px", marginTop:'50px', '&:hover': { boxShadow:'7px -3px 10px .1px  white'}, transition:'all .3s ease-in', padding:'20px'}}>
                    <Box sx={{border:'1px solid black', borderRadius:'9px', background:'white'}}>
                        <h1 align='center'>{props.user?"My Posts":'All Posts'}</h1>
                    </Box>
                    <Container className='allPostsContainer' sx={{padding:'20px', margin:"0"}}>
                        <Box sx={{width:'90rem', display:'flex', flexWrap:"wrap", gap:"10rem", justifyContent:"center", alignItems:"center"}}>
                        {posts!==''?
                                posts.map((e, i)=>{
                                    return <Card sx={{width: 345, borderRadius:'10px', bgcolor:Colors.green[100], '&:hover': {
                            boxShadow:'0 0 15px 0 white'
                        }, border:'2px solid black', transition:'all .3s ease-in'}}>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={back}
                                    alt="post image"
                                />
                                <hr style={{border:'1px solid black'}}/>
                                <div  style={{backgroundColor:"white"}}>
                                {/* <CardHeader title={"By: "+users.split(', ')[i+1]} subheader={"On: "+e.date}/> */}
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                        {e.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                        {e.description}
                                        </Typography>
                                    </CardContent>
                                </div>
                                <CardActions sx={{padding:"0", display:"flex", justifyContent:"space-between"}}>
                                <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                                    <span style={{marginLeft:"10px", fontSize:"1.5rem", marginBottom:"5px"}}>0</span>
                                    <IconButton sx={{marginLeft:"10px"}}>
                                        <ThumbUpOffAltRoundedIcon color='success'/>
                                    </IconButton>
                                </div>
                                    <IconButton aria-label="share" sx={{marginRight:"10px"}}>
                                        <DeleteRoundedIcon color='error' />
                                    </IconButton>

                                </CardActions>
                            </Card>
                                    })
                        :<CircularProgress sx={{color:Colors.green[800]}}/>}

                        </Box>
                    </Container>
                </Container>
        </>
    );
};

export default Posts;
