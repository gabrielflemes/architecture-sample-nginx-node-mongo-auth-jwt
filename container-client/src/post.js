import React, {useState} from 'react';
import "./App.css";
import { Link } from 'react-router-dom';

function Post(props) {

  const [isOnFire, setIsOnFire] = useState(false);
  const [likes, setLike] = useState(0);

  const increaseLikes = () => {

    setLike(likes + 1);

    if (likes >= 9) {
        setIsOnFire(true);
    }

  };

  const decreaseLikes = () => {

    setLike(likes - 1);

    if (likes >= 9) {
        setIsOnFire(false);
    }

  };

  const remove = () =>{
    alert(props.id);
  };

  
    return (
        <div className={isOnFire ? 'post bg-green' : 'post bg-white'}>
            <h3><Link to={`/detail/${props.id}`}>{props.name}</Link></h3>
            <hr/>
            <p>{props.description}</p>
            <p>Likes: {likes}</p>
            <p>
                <button onClick={increaseLikes}>I liked it.</button>
                <button onClick={decreaseLikes}>I don't liked it.</button>
                <button onClick={remove}>Delete.</button>
            </p>
        </div>       
    );

}

export default Post;