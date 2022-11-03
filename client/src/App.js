import "./App.css";
import React from 'react'
import {Routes, Route} from 'react-router-dom'

import Header from "./Components/Header";
import Auth from './Components/Auth'
import Posts from './Components/Posts'
import UserPosts from './Components/UserPosts'
import PostDetail from './Components/PostDetail'
import AddPost from './Components/AddPost'

function App() {
    return (
        <React.Fragment>
        <header>
            <Header></Header>
        </header>
        <main>
            <Routes>
                <Route path="/auth" element={<Auth/>}></Route>
                <Route path="/posts" element={<Posts/>}></Route>
                <Route path="/myPosts" element={<UserPosts/>}></Route>
                <Route path="/myPosts/:id" element={<PostDetail/>}></Route>
                <Route path="/posts/add" element={<AddPost/>}></Route>
            </Routes>
        </main>
        </React.Fragment>
    );
}

export default App;
