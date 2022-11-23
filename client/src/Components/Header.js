import React, { useEffect } from "react";
import {Link} from 'react-router-dom'
import { AppBar, Toolbar, Typography, Box, Button, Tabs, Tab } from "@mui/material";
import * as Colors from '@mui/material/colors'
import {useSelector} from 'react-redux'
import {useDispatch} from 'react-redux'
import {authActions} from '../store'

import {useNavigate} from 'react-router-dom'

const Header = (props) => {
    const isLoggedIn = useSelector(state=>state.isLoggedIn)
    const dispatch = useDispatch()

    const token = localStorage.getItem('token')

    if (!token) {
        dispatch(authActions.logout())
    } else {
        dispatch(authActions.login())
    }

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
                if (data.status === 'error') {
                    dispatch(authActions.logout())
                }
            } catch {}
        })
    })
    

    const logout_ = ()=> {
        dispatch(authActions.logout());
        navigate('/login');
        props.showAlert('Successfully Logged out', 'success')
        localStorage.clear()
        window.location.reload()
    }
    const navigate = useNavigate()

    return (
        <>
                <AppBar sx={{ bgcolor: "black" }}>
                    <Toolbar>
                        <Typography variant="h5">JSK Memories</Typography>
                        <Box display="flex" marginLeft="auto">
                          {isLoggedIn ?
                            <Button variant="contained" onClick={logout_} sx={{ margin: 1, color:'black', bgcolor:Colors.green[600]}} color='success' >Logout</Button>:  <>
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
