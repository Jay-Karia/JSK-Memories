import React, {useEffect, useState} from "react";
import { Typography, Box, Container, Card, CardContent, CardHeader, CardMedia, CardActions, IconButton, CircularProgress, ButtonGroup,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle,Slide,Button} from "@mui/material";

import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import ThumbUpOffAltRoundedIcon from '@mui/icons-material/ThumbUpOffAltRounded';
import ModeRoundedIcon from '@mui/icons-material/ModeRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';

import * as Colors from '@mui/material/colors'

import secondary_forest from './images/forest/forest_bg.jpg'
import axios from 'axios'


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  

const Posts = (props) => {
    const [posts, setPost] = useState('')
    const [users, setUsers] = useState([])
    const [images, setImages] = useState([])
    
    const [delID, setDelID] = useState('')

    let users2=[]
    
    const getAllPosts = async ()=> {
        const requestOptions = {
            headers: {
                'Content-type': 'application/json'
            }
        };
        axios.get('http://localhost:8000/getAllPosts', requestOptions)
        .then(data=>{
            data = data.data
            if (data.status === 'ok') {
                setPost(data.posts)
                for (let i=0;i<data.posts.length;i++) {
                    users2.push(data.posts[i].user.name)
                    setUsers(users2)
                }
            }
        })
    }
    useEffect(() => {
        getAllPosts()
    })

    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

  const handleDelete = ()=> {
    let post_id = posts[delID]._id
    const requestOptions = {
        headers: {
            'Content-type': 'application/json'
        }
    };
    let url = 'http://localhost:8000/deletePost/'+post_id
    axios.delete(url, requestOptions).then(data=> {
        data = data.data
        if (data.status==='error') {
            props.showAlert(data.msg, 'error')
        } else {
            props.showAlert(data.msg, 'success')
        }
    })
    handleClose()
  }



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
                                    return <Card sx={{width: 345, borderRadius:'10px', bgcolor:'hsl(0, 0%, 90%)','&:hover': {
                            boxShadow:'0 0 10px 0 white'
                        }, border:'2px solid black', transition:'all .3s ease-in'}}>
                                {images[i] && <CardMedia
                                    component="img"
                                    height="140"
                                    image={images}
                                    alt="post image"
                                />}
                                {!images[i] && <CardMedia
                                    component="img"
                                    height="140"
                                />}
                                <hr style={{border:'1px solid black'}}/>
                                <div  style={{backgroundColor:"white"}}>
                                <CardHeader title={"By: "+users[i].charAt(0).toUpperCase()+users[i].substring(1)} subheader={"On: "+e.date}/>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                        {e.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                        {e.description}
                                        </Typography>
                                    </CardContent>

                                </div>
                                <CardActions sx={{padding:"0", display:"flex", justifyContent:"space-between", bgcolor:Colors.green[100]}}>
                                <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                                    <span style={{marginLeft:"10px", fontSize:"1.5rem", marginBottom:"5px"}}>0</span>
                                    <IconButton sx={{marginLeft:"10px"}}>
                                        <ThumbUpOffAltRoundedIcon color='success'/>
                                    </IconButton>
                                </div>
                                {localStorage.getItem('id')===e.user._id && localStorage.getItem('token') ?  <ButtonGroup>
                                    <IconButton aria-label="like">
                                        <ModeRoundedIcon sx={{color:'#455a64'}} />
                                    </IconButton>
                                    <IconButton aria-label="delete" sx={{marginRight:"10px"}} onClick={()=>{setOpen(true);setDelID(i)}}>
                                        <DeleteRoundedIcon color='error' />
                                    </IconButton>
                                </ButtonGroup>:''}
                                <Dialog
                                    open={open}
                                    TransitionComponent={Transition}
                                    keepMounted
                                    onClose={handleClose}
                                    aria-describedby="alert-dialog-slide-description"
                                >
                                    <DialogTitle>{"Delete your post?"}</DialogTitle>
                                    <DialogContent>
                                    <DialogContentText id="alert-dialog-slide-description">
                                        <span>You won't be able to retrieve your post after you delete it</span>
                                    </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                    <Button color='success' endIcon={<HighlightOffRoundedIcon/>} onClick={handleClose}>No</Button>
                                    <Button color='error' endIcon={<CheckCircleOutlineRoundedIcon/>} onClick={()=>{handleDelete()}}>Yes</Button>
                                    </DialogActions>
                                </Dialog>
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
