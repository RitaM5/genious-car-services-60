import React from 'react';
import sleeping from '../../../images/sleeping.jpg'
const notFound = () => {
    return (
        <div>
            <h2 className="text-primary text-center">Mechanic is sleeping</h2>
            <img className="w-100" src={sleeping}/>
        </div>
    );
};

export default notFound;