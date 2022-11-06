import React, { useState } from "react";
import {Link} from 'react-router-dom'
import { AppBar, Toolbar, Typography, Box, Button, Tabs, Tab } from "@mui/material";
import * as Colors from '@mui/material/colors'
import { createTheme, ThemeProvider } from '@mui/material/styles';

const Header = (props) => {
    console.log(props.theme)
    return (
        <>
            <ThemeProvider theme={props.theme}>
                <AppBar sx={{ bgcolor: "black" }}>
                    <Toolbar>
                        <Typography variant="h5">JSK Memories</Typography>
                        <Box display="flex" marginLeft="auto">
                            <Button LinkComponent={Link} to="/auth" variant="contained" sx={{ margin: 1, bgcolor: "grey"}}>Login</Button>
                            <Button LinkComponent={Link} to="/auth" variant="contained" color='primary' sx={{ margin: 1}}>Register</Button>
                        </Box>

                    </Toolbar>
                </AppBar>
            </ThemeProvider>
        </>
    );
};

export default Header;
