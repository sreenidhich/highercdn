import react, { useState, useEffect } from 'react'
import { Container, Navbar, Nav, Form, Button, Row, Col } from "react-bootstrap"
import { LinkContainer } from 'react-router-bootstrap'

import axios from 'axios'
//import members from '../members'


import DonationScreen from "./DonationScreen";
import MotoOfOurOrganizationScreen from "./MotoOfOurOrganizationScreen";
import Header from '../components/Header'
function HomeScreen() {




    return (
        <div>
            {/* 
            <Header /> */}


            <MotoOfOurOrganizationScreen />






            {/* <div class='donation my-2 p-2 '> <Link to='/DonationScreen' ><i class="fas fa-hand-holding-usd"></i>Donations link</Link></div>


            <Member />
            <div class='loginInterface  '>

                <i className="fas fa-user my-2 p-2"></i>Login
<div class='loginForm my-2 p-2'>

                    <Form class=' my-1 p-1'>
                        <Form.Group controlId="formBasicEmail">

                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
</Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
</Button>
                    </Form>
                </div>
            </div> */}
        </div >
    )
}


export default HomeScreen