import React, { Component } from 'react';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import styled, { keyframes } from 'styled-components';
import Popup from 'reactjs-popup';

import Login from './AccountLoginComponent';
import Register from './AccountRegisterComponent';
import ForgotPassword from './ForgotPasswordComponent';

const Golden = styled.h1`
    font-size: 3em;
    font-weight: 700;
    font-family: Calibre, Helvetica Neue, Segoe UI, Helvetica, Arial, Lucida Grande, sans-serif;
    background: -webkit-linear-gradient(45deg, #fc00ff, #00dbde);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`
const SlideIn = keyframes`
    100% { transform: translateX(0%); }
`

const CustomPopup = styled(Popup)`
  // use your custom style for ".popup-overlay"
  &-overlay {
    ...;
  }
  // use your custom style for ".popup-content"
  &-content {
    ...;
    width: 30%;
    margin: .5em 0;
    padding: 2% 1%;
    border: none;
    color: black;
    border-radius: 1em;
    animation: ${SlideIn} 0.5s forwards;
    transform: translateX(-100%);
    box-shadow: .5em .5em .5em rgba(0,0,0,.5);

    @media (max-width: 992px) {
        width: 90%
    }

    @media (prefers-color-scheme: dark) {
        background: #232526;
        background: -webkit-linear-gradient(to right, #414345, #232526);
        background: linear-gradient(to right, #414345, #232526);
        color: white;
    }
  }
`;

class HomeComponent extends Component {
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
                    <Golden>
                        Save hang tags, earn discount on your next purchase!
                    </Golden>
                    <p>Track your purchase on this brand using the QR at your hang tags</p>
                    <Login />
                    <Row>
                        <Col md="7">
                            <CustomPopup trigger={<Button className="w-100 mt-3" variant="outline-info">Forgot your password</Button>} modal>
                                {Close => <ForgotPassword close={Close}/>}
                            </CustomPopup>
                        </Col>
                        <Col md="5">
                            <CustomPopup trigger={<Button className="w-100 mt-3" variant="outline-success">Create an account</Button>} modal>
                                {Close => <Register close={Close}/>}
                            </CustomPopup>
                        </Col>
                    </Row>
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