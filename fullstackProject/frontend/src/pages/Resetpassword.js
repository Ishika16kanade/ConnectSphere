import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../util';
import { Link, useNavigate } from 'react-router-dom'

const Resetpassword = () => {
    // const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const copyemail = { ...email };
        copyemail[name] = value;
        setEmail(copyemail);
    }

    const handleSubmit = async (e) => {
        try {
            const url = "http://localhost:4000/auth/forgotpassword";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });
            const result = await response.json();
            if (result.status == 201) {
                setEmail("");
                setMessage = "true"
            }

            else {
                toast.error("Invalid User")
            }
        }
        catch (error) {
            handleError(error);
        }

    }
    return (
        <div className='container'>
            <h1>Reset Password</h1>
            {message ? <p style={{ color: "green" }}>password reset link send successfully in your email</p> : ""}
            <form onSubmit={handleSubmit}>

                <div>
                    <label htmlFor='new password'>Email</label>
                    <input type='password'
                        onChange={handleChange}
                        className='form-control'
                        placeholder='Enter password'

                    />
                </div>
                <div>
                    <label htmlFor='Confirm password'>Email</label>
                    <input type='password'
                        onChange={handleChange}
                        className='form-control'
                        placeholder='Enter password'

                    />
                </div>
                <div className='d-grid'>
                    <button type='submit' className='btn btn-primary'> Update</button>
                </div>


            </form>
            <ToastContainer />
        </div>
    )
}

export default Resetpassword;