import "./App.css";
import React, {useState} from 'react'
import {Routes, Route} from 'react-router-dom'

import Header from "./Components/Header";
import Auth from './Components/Auth'
import Posts from './Components/Posts'
import UserPosts from './Components/UserPosts'
import PostDetail from './Components/PostDetail'
import AddPost from './Components/AddPost'
import Main from './Components/Main'


function App() {
    const [value, setValue] = useState(0)
    return (
        <>
        <main>
            <Main/>
            <Routes>
                <Route path="/auth" element={<Auth/>}></Route>
                <Route path="/posts" element={<Posts/>}></Route>
                <Route path="/myPosts" element={<UserPosts/>}></Route>
                <Route path="/myPosts/:id" element={<PostDetail/>}></Route>
                <Route path="/addPost" element={<AddPost/>}></Route>
            </Routes>
        </main>
        </>
    );
}

export default App;
