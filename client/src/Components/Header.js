import React, { useState } from "react";
import {Link} from 'react-router-dom'
import { AppBar, Toolbar, Typography, Box, Button, Tabs, Tab } from "@mui/material";
import * as Colors from '@mui/material/colors'

const Header = () => {
    return (
        <>
                <AppBar sx={{ bgcolor: "black" }}>
                    <Toolbar>
                        <Typography variant="h5">JSK Memories</Typography>
                        <Box display="flex" marginLeft="auto">
                            <Button LinkComponent={Link} to="/auth" variant="contained" sx={{ margin: 1, bgcolor: "grey", color:"black"}}>Login</Button>
                            <Button LinkComponent={Link} to="/auth" variant="contained" sx={{ margin: 1, color:'black', bgcolor:Colors.green[600]}}>Register</Button>
                        </Box>

                    </Toolbar>
                </AppBar>
        </>
    );
};

export default Header;
