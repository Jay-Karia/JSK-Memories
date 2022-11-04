import React from "react";
import { AppBar, Toolbar, Typography, Box, Button, Tabs, Tab, Container, CssBaseline } from "@mui/material";

const UserPosts = () => {
    return (
        <>
             <Container>
                <Box sx={{border:'1px solid black', width:'90%', borderRadius:'9px', marginTop:'50px'}}>
                    <h1 align='center'>My Posts</h1>
                </Box>
            </Container>
        </>
    );
};

export default UserPosts;
