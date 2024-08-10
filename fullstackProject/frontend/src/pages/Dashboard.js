import React from 'react';
import '../App.css'
import Widget from './Widget';
import { handleSuccess } from '../util';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('user LoggedOut')
        setTimeout(() => {
            navigate('/login');
        }, 1000)
    }
    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <button onClick={handleLogout}>LogOut</button>

                <h1>Dashboard</h1>
                <p>Welcome to  dashboard!</p>
            </div>
            <div className="dashboard-widgets">
                <Widget title="TotalRegistrastion" value="20" />
                <Widget title="Active Users" value="10" />
            </div>
            <ToastContainer />
        </div>
    );
};

export default Dashboard;
