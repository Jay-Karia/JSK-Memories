import React, { useState } from "react";
import {Link} from 'react-router-dom'
import { AppBar, Toolbar, Typography, Box, Button, Tabs, Tab } from "@mui/material";
import * as Colors from '@mui/material/colors'
import {useSelector} from 'react-redux'
import {useDispatch} from 'react-redux'
import {authActions} from '../store'

import {useNavigate} from 'react-router-dom' 

const Header = (props) => {
    const isLoggedIn = useSelector(state=>state.isLoggedIn)
    const navigate = useNavigate()

    const dispatch = useDispatch()
    return (
        <>
                <AppBar sx={{ bgcolor: "black" }}>
                    <Toolbar>
                        <Typography variant="h5">JSK Memories</Typography>
                        <Box display="flex" marginLeft="auto">
                          {isLoggedIn ?
                            <Button variant="contained" onClick={()=>{dispatch(authActions.logout());navigate('/login'); props.showAlert('Successfully Logged out', 'success')}} sx={{ margin: 1, color:'black', bgcolor:Colors.green[600]}} color='success' >Logout</Button>:  <>
                                <Button LinkComponent={Link} to="/login" variant="contained" sx={{ margin: 1, bgcolor: "grey", color:"black"}} color='common' >Login</Button>

                                <Button LinkComponent={Link} to="/register" variant="contained" sx={{ margin: 1, color:'black', bgcolor:Colors.green[600]}} color='success' >Register</Button>
                            </>}
                        </Box>

                    </Toolbar>
                </AppBar>
        </>
    );
};

export default Header;
