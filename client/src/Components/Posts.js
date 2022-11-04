import React from "react";
import back from './images/back.jpg'
import { Typography, Box, Container, Card, CardContent, CardHeader, CardMedia, CardActions, IconButton, Avatar, Button} from "@mui/material";

import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

const Posts = () => {
    return (
        <>
        <Container>
            <Box sx={{border:'1px solid black', width:'90%', borderRadius:'9px', marginTop:'50px'}}>
                <h1 align='center'>Posts</h1>
            </Box>
            <Container className='allPostsContainer'>
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
        <Button size="small" sx={{color:'green'}} endIcon={<ThumbUpRoundedIcon/>}>Like</Button>
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
