import React, { useState } from "react";
import {Link} from 'react-router-dom'
import { AppBar, Toolbar, Typography, Box, Button, Tabs, Tab } from "@mui/material";
import * as Colors from '@mui/material/colors'

const Header = () => {
    const [value, setValue] = useState("")
    return (
        <>
            <AppBar sx={{ bgcolor: "black" }}>
                <Toolbar>
                    <Typography variant="h5">JSK Memories</Typography>

                    <Box display="flex" marginLeft="50px">
                    <Tabs value={value} onChange={(e, v)=>setValue(v)} textColor='inherit'  >

                        <Tab LinkComponent={Link} to="/posts" label="All Posts"></Tab>
                        <Tab LinkComponent={Link} to='/myPosts' label="My Posts"></Tab>

                    </Tabs>
                    </Box>

                    <Box display="flex" marginLeft="auto">
                        <Button LinkComponent={Link} to="/auth" variant="contained" sx={{ margin: 1, bgcolor: "grey"}}>Login</Button>
                        <Button LinkComponent={Link} to="/auth" variant="contained" sx={{ margin: 1, bgcolor: "grey"}}>Register</Button>
                        <Button LinkComponent={Link} to="/auth" variant="contained" sx={{ margin: 1, bgcolor: Colors.deepOrange[600]}}>Logout</Button>
                    </Box>

                </Toolbar>
            </AppBar>
        </>
    );
};

export default Header;
