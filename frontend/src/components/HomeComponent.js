import React, { Component } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';

import Login from './AccountLoginComponent';


class HomeComponent extends Component {
    componentDidMount() {
        document.title = 'Welcome - QR Hang Tag'
    }

    render() {
        return(
        <Container>
            <div className="Spacer5"/>
            <Row>
                <Col md="7" className="d-none d-md-block">
                <div className="Spacer10"/>
                    <img src={process.env.PUBLIC_URL + '/Home512.png'} alt="QR Hang Tag Preview" className="w-100"></img>
                    <div className="Spacer5"/>
                </Col>
                <Col md="5">
                    <h1 className="golden">
                        Save hang tags, earn discount on your next purchase!
                    </h1>
                    <p>Track your purchase on this brand using the QR at your hang tags</p>
                    <Login />
                    
                </Col>
            </Row>
            <Row>
                <Col>
                    <Alert variant="info" className="my-5">
                        Developer mode enabled! Please use username:<b> testadmin </b>password:<b>  testadmin </b>as a test account!
                    </Alert>
                </Col>
            </Row>
        </Container>
        )
    }   
}

export default HomeComponent;