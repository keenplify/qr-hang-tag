import React, { Component } from 'react';
import { Container, Row, Col , Form, Button } from 'react-bootstrap';
import styled from 'styled-components'

const RegFormControl = styled(Form.Control)`
    margin: .5em 0;
`

class AccountRegisterComponent extends Component {
    render() {
        return(
        <Container>
            <button onClick={this.props.close} className="close"><span aria-hidden="true">&times;</span></button>
            <h2>Forgot Password</h2>
            <Form>
                <div className="Spacer5"/>
                <Form.Group as={Row} controlId="FormNameGroup">
                    <Col md="5">
                        <RegFormControl type="text" name="firstname" id="firstname" placeholder="First Name"/>
                    </Col>
                    <Col>
                        <RegFormControl type="text" name="lastname" id="lastname" placeholder="Last Name"/>
                    </Col>
                </Form.Group>
                <Form.Group  as={Row} controlId="FormEmailGroup">
                    <Col>
                    <RegFormControl type="email" name="email" id="email" placeholder="Email"/>
                    </Col>
                </Form.Group>
            </Form>
        </Container>
        )
    }   
}

export default AccountRegisterComponent;