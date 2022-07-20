import React from 'react';
import Banner from '../Banner/Banner';
import Experts from '../Experts/Experts';
import Services from "../Services/Services";

const services = [
  /*   {{id: 1, name: 'oil change', price:100, description: '', img: ''}} */
]
const Home = () => {
    return (
        <>
            <Banner></Banner>
            <Services></Services>
            <Experts></Experts>
        </>
    );
};

export default Home;