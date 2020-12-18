import React from 'react';
import Cards from '../Cards/Cards';
import Form from '../Form/Form';
import Navbar from '../Navbar/Navbar';

const Home = () => {
     
    return (
        <div>
            <div className="mb-5">
                <Navbar></Navbar>
            </div>
            <div className="container-fluid">                           
                <div className="row">
                    <div className="col-md-8">
                        <div className="mt-3 ml-2 mb-3 mr-2">                     
                            <Cards></Cards>                        
                        </div>                    
                    </div>
                    <div className="col-md-4">
                        <Form></Form>                        
                    </div>
                </div>
            </div>
        </div>        
    );
};

export default Home;