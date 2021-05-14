import React, { useState, useEffect } from 'react';
import './App.css'

function Detail({ match }){ //match contains info about my route including params


    useEffect(() => {
        fetchUser()
    }, []);

    const [user, setUser] = useState([]);

    const fetchUser = async () => {
        fetch(`http://localhost:3000/api/plants/${match.params.id}`).then((res) => {
            return res.json();
        }).then((data) => {
            setUser(data);
        });
    };


    return (
        <div>
            Detail about {user.name}
        </div>
    );
};

export default Detail;