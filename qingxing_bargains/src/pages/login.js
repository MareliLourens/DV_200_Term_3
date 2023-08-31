import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.svg';

const Login = () => {

    const navigate = useNavigate();

    const [userDetails, setUserDetails] = useState([]);
    const [usernameSearchText, setUsernameSearchText] = useState('');
    const [passwordSearchText, setPasswordSearchText] = useState('');

    useEffect(() => {
        axios.get("http://localhost:5000/api/users/")
            .then((response) => {
                console.log(response.data);
                setUserDetails(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleUsernameSearch = (event) => {
        const searchText = event.target.value;
        setUsernameSearchText(searchText);
    };

    const handlePasswordSearch = (event) => {
        const searchText = event.target.value;
        setPasswordSearchText(searchText);
    };

    const handleLogin = () => {
        const matchingNUser = userDetails.find(user =>
            user.username === usernameSearchText &&
            user.password === passwordSearchText &&
            user.type === "normal"
        );

        const matchingAUser = userDetails.find(user =>
            user.username === usernameSearchText &&
            user.password === passwordSearchText &&
            user.type === "admin"
        );

        if (matchingNUser) {
            // Redirect to the normal user landing page
            navigate("/landing");
        } else if (matchingAUser) {
            // Redirect to the admin page
            navigate("/admin");
        } else {
            // Handle incorrect login here
            console.log("Invalid username or password");
        }
    };

    return (
        <div>
            <div className="login_section">
                <img className="login_image" src={Logo} alt="Logo" />
                <div className='login_card'>
                    <h1 className='login_text'>Log In</h1>
                    <h1 className='user_label'>Username</h1>
                    <input className='user_input' onChange={handleUsernameSearch} placeholder='Enter your username'></input>
                    <h1 className='user_label'>Password</h1>
                    <input className='user_input' onChange={handlePasswordSearch} placeholder='Enter your password'></input>
                    <button className='login_button' onClick={handleLogin}>Login</button>
                </div>
            </div>
        </div>
    );
}

export default Login;
