import React from "react";
import { Typography, Box, Container, Card, CardContent, CardHeader, CardMedia, CardActions, IconButton, Avatar, Button} from "@mui/material";

import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';

import secondary_bg from './images/forest/forest_bg.jpg'
import back from './images/my.jpg'


const UserPosts = () => {
    return (
        <>
            <Container sx={{backgroundImage:`url(${secondary_bg})`,backgroundSize:'cover',backgroundRepeat:'no-repeat',backgroundPosition:'center center', borderRadius:'20px'}}>
            <Box sx={{border:'1px solid black', borderRadius:'9px', marginTop:'50px'}}>
                <h1 align='center'>My Posts</h1>
            </Box>
            <Container className='allPostsContainer' sx={{padding:'20px'}}>
                <Box>
                    <Card sx={{ maxWidth: 345 }}>
        <CardMedia
            component="img"
            height="140"
            image={back}
            alt="green iguana"
        />
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
            Title
            </Typography>
            <Typography variant="body2" color="text.secondary">
            Description
            </Typography>
        </CardContent>
        <CardActions>
            <Button size="small" sx={{color:'green'}} endIcon={<ThumbUpOffAltOutlinedIcon/>}>Like</Button>
            <Button size="small" sx={{color:'red'}} endIcon={<DeleteRoundedIcon/>}>Delete</Button>
        </CardActions>
                    </Card>
                </Box>
            </Container>
        </Container>
        </>
    );
};

export default UserPosts;
