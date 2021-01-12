import React, { Component } from 'react';
import { Container, Row, Col , Form, Button } from 'react-bootstrap';
import Axios from 'axios';

class AccountRegisterComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            birthday: '',
            gender: ''
        }

        this.onChangeFirstName = this.onChangeFirstName.bind(this)
        this.onChangeLastName = this.onChangeLastName.bind(this)
        this.onChangeEmail = this.onChangeEmail.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)
        this.onChangeBirthday = this.onChangeBirthday.bind(this)
        this.onChangeGender = this.onChangeGender.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChangeFirstName(e) {
        this.setState({
            firstname: e.target.value
        })
    }

    onChangeLastName(e) {
        this.setState({
            lastname: e.target.value
        })
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    onChangeBirthday(e) {
        this.setState({
            birthday: e.target.value
        })
    }

    onChangeGender(e) {
        console.log(e)
        this.setState({
            gender: e.target.value
        })
    }

    componentDidMount() {
        var input = document.getElementById('firstname');
        input.focus();
        input.select();
    }

    onSubmit(e) {
        e.preventDefault();

        Axios.post(process.env.REACT_APP_BACKEND_SERVER + '/auth/register', this.state)
        .then(res => console.log(res))
    }

    render() {
        return(
        <Container>
            <button onClick={this.props.close} className="close"><span aria-hidden="true">&times;</span></button>
            <h2>Register</h2>
            <Form onSubmit={this.onSubmit}>
                <div className="Spacer5"/>
                <Form.Group as={Row} >
                    <Col>
                        <Form.Control type="text" name="firstname" id="firstname" placeholder="First Name" value={this.state.firstname} onChange={this.onChangeFirstName} required/>
                    </Col>
                    <Col>
                        <Form.Control type="text" name="lastname" id="lastname" placeholder="Last Name" value={this.state.lastname} onChange={this.onChangeLastName}  required/>
                    </Col>
                </Form.Group>   
                <Form.Group>
                    <Form.Control type="email" name="email" id="email" placeholder="Email"  value={this.state.Email} onChange={this.onChangeEmail} required/>
                </Form.Group>
                <Form.Group>
                    <Form.Control type="password" name="password" id="password" minlegth="6" placeholder="Password"  value={this.state.password} onChange={this.onChangePassword} required/>
                </Form.Group>
                <Form.Group as={Row} className=" align-items-center">
                    <Col xs="3">
                        <Form.Label>Birthday:</Form.Label>
                    </Col>
                    <Col>
                        <Form.Control type="date" name="birthday" id="birthday" value={this.state.birthday} onChange={this.onChangeBirthday} required/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="birthday" className="align-items-center">
                    <Col xs="3">
                        <Form.Label>Gender:</Form.Label>
                    </Col>
                    <Col xs="auto">
                        <Form.Check type="radio" name="gender" id="gender-male" checked={(this.state.birthday==='male') ? true:false} onChange={this.onChangeGender} label="Male" required/>
                    </Col>
                    <Col xs="auto">
                        <Form.Check type="radio" name="gender" id="gender-female" checked={(this.state.birthday==='female') ? true:false} onChange={this.onChangeGender} label="Female"/>
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