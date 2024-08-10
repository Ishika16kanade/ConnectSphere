// ProfileForm.js
import React, { useState } from 'react';
import axios from 'axios';
// import '../pages/Profile.css';

const Profile = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');
    const [profilePic, setProfilePic] = useState(null);

    const handleFileChange = (e) => {
        setProfilePic(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('bio', bio);
        formData.append('profilePic', profilePic);

        try {
            const response = await axios.post('/api/profile', formData);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='main'>
            <div className='container'>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className='form-group' >
                        <label>Username:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className='form-group' >
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='form-group'>
                        <label>Bio:</label>
                        <textarea
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                        />
                    </div>
                    <div className='form-group '>
                        <label>Profile Picture:</label>
                        <input type="file" onChange={handleFileChange} />
                    </div>
                    <button type="submit">Save Profile</button>
                </form>
            </div>
        </div>
    );
};

export default Profile;
