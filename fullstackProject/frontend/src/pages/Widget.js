import React from 'react';
import '../App.css'


const Widget = ({ title, value }) => {
    return (
        <div className="widget">
            <h3>{title}</h3>
            <p>{value}</p>
        </div>
    );
};

export default Widget;
