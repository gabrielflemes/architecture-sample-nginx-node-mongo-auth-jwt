import React, { useState, useEffect } from 'react';
import Post from './post';
import './App.css';
import axios from 'axios';
import auth from './auth';

function Tasks() {

    // if (!auth.isAuthenticated()) {

    //     return (
    //         <div>Not logged in</div>
    //     );

    // }

    const [users, setUsers] = useState([]);

    //When you call useEffect, you’re telling React to run your “effect” function after flushing changes to the DOM.
    useEffect(() => {
        fetchUsers()
    }, []);

    
    const fetchUsers = async () => {

        axios.get('plants/').then((res) => {

            setUsers(res.data);

        }, (err) => {
            console.log(err);
        });
    };

    return (
        <div className=''>
            <h1>My tasks</h1>
            {
                // posts.map((post) => (
                //     <Post id={post.id} key={post.id} name={post.name} description={post.description} />
                // ))
                users.map((user) => (
                    <Post id={user._id} key={user._id} name={user.name} description={user.description} />
                ))
            }

        </div>
    );



}


export default Tasks;