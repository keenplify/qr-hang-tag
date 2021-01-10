import React, { Component } from 'react';
import { Container, Row, Col , Form, Button } from 'react-bootstrap';

class AccountRegisterComponent extends Component {
    componentDidMount() {
        var input = document.getElementById('firstname');
        input.focus();
        input.select();
    }

    render() {
        return(
        <Container>
            <button onClick={this.props.close} className="close"><span aria-hidden="true">&times;</span></button>
            <h2>Register</h2>
            <Form>
                <div className="Spacer5"/>
                <Form.Group as={Row} >
                    <Col>
                        <Form.Control type="text" name="firstname" id="firstname" placeholder="First Name"/>
                    </Col>
                    <Col>
                        <Form.Control type="text" name="lastname" id="lastname" placeholder="Last Name"/>
                    </Col>
                </Form.Group>   
                <Form.Group>
                    <Form.Control type="email" name="email" id="email" placeholder="Email"/>
                </Form.Group>
                <Form.Group>
                    <Form.Control type="password" name="password" id="password" placeholder="Password"/>
                </Form.Group>
                <Form.Group as={Row} className=" align-items-center">
                    <Col xs="3">
                        <Form.Label>Birthday:</Form.Label>
                    </Col>
                    <Col>
                        <Form.Control type="date" name="birthday" id="birthday"/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="birthday" className="align-items-center">
                    <Col xs="3">
                        <Form.Label>Gender:</Form.Label>
                    </Col>
                    <Col xs="auto">
                        <Form.Check type="radio" name="gender" id="gender-male" label="Male"/>
                    </Col>
                    <Col xs="auto">
                        <Form.Check type="radio" name="gender" id="gender-female" label="Female"/>
                    </Col>
                </Form.Group>
                
                <p style={{fontSize: ".7rem", color: "rgba(0,0,0,.9)"}}>By clicking Sign Up, you agree to our Terms, Data Policy and Cookies Policy.</p>

                <Button type="submit" className="w-100">Sign Up</Button>
            </Form>
        </Container>
        )
    }   
}

export default AccountRegisterComponent;