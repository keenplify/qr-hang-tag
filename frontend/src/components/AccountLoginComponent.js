import React, { Component } from 'react';
import { Container,Form, Button, Alert, Row, Col } from 'react-bootstrap';
import Axios from 'axios';
import Cookies from 'universal-cookie';


import Register from './AccountRegisterComponent';
import ForgotPassword from './ForgotPasswordComponent';

import CustomPopup from '../modules/CustomPopup'

class AccountLoginComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            error: ''
        }

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.Cookies = new Cookies();
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const data = {
            username: this.state.username,
            password: this.state.password
        }
        Axios.post(process.env.REACT_APP_BACKEND_SERVER + '/auth/login', data)
        .then(res => {
            if ((typeof res.data === 'object') && (res.data.passed === true)) {
                this.Cookies.set('id', res.data._id, {path: '/'})
                this.Cookies.set('type', res.data.type, {path: '/'})
                this.Cookies.set('token', res.data.token, {path: '/'})
                document.location = '/'
            } else {
                this.setState({
                    error: res.data
                })
            }
        })
    }

    componentDidMount() {
        var input = document.getElementById('username');
        input.focus();
        input.select();
    }

    render() {
        return(
        <Container>
            <h2>Login</h2>
            {(this.state.error) && (<Alert variant='warning'>
                {this.state.error}
            </Alert>)}
            <Form onSubmit={this.onSubmit}>
                <Form.Group>
                    <Form.Control 
                        type="text" 
                        name="username" 
                        id="username" 
                        placeholder="Email / Username" 
                        value={this.state.username}
                        onChange={this.onChangeUsername}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control 
                        type="password" 
                        name="password" 
                        id="password" 
                        placeholder="Password" 
                        value={this.state.password} 
                        onChange={this.onChangePassword}
                        required
                    />
                </Form.Group>
                <Button type="submit" id="submitLogin" className="w-100">Login</Button>
            </Form>
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
        </Container>
        )
    }   
}

export default AccountLoginComponent;