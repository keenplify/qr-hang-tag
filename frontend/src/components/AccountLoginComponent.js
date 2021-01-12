import React, { Component } from 'react';
import { Container,Form, Button } from 'react-bootstrap';
import Axios from 'axios';

class AccountLoginComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: ''
        }

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
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
        .then(res => console.log(res))
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
        </Container>
        )
    }   
}

export default AccountLoginComponent;