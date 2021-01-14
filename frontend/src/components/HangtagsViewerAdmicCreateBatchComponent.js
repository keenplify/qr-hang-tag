import React, { Component } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import Axios from 'axios';
import Cookies from 'universal-cookie';

class HangtagsViewerAdmicCreateBatchComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            quantity: '',
            discountPercentage: '',
            discountValue: ''
        }

        this.onChangeName = this.onChangeName.bind(this)
        this.onChangeQuantity = this.onChangeQuantity.bind(this)
        this.onChangeDiscountPercentage = this.onChangeDiscountPercentage.bind(this)
        this.onChangeDiscountValue = this.onChangeDiscountValue.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.Cookies = new Cookies()
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        })
    }

    onChangeQuantity(e) {
        this.setState({
            quantity: e.target.value
        })
    }

    onChangeDiscountPercentage(e) {
        this.setState({
            discountPercentage: e.target.value
        })
    }

    onChangeDiscountValue(e) {
        this.setState({
            discountValue: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        Axios.post(process.env.REACT_APP_BACKEND_SERVER + '/hangtags/createbatch', this.state, {
            headers: { Authorization: `Bearer ${this.Cookies.get('token')}` }
        })
        .then(res => document.location = '/hangtags')
    }

    render() {
        return(
        <Container>
            <button onClick={this.props.close} className="close"><span aria-hidden="true">&times;</span></button>
            <h2>Create new batch</h2>
            <Form onSubmit={this.onSubmit}>
                <div className="Spacer5"/>
                <Form.Group>
                    <Form.Control type="text" name="name" min="3" max="100" id="name" placeholder="Batch Name" value={this.state.name} onChange={this.onChangeName}/>
                </Form.Group>
                <Form.Group>
                    <Form.Control type="number" min="0" max="500" name="quantity" id="quantity"  value={this.state.quantity} onChange={this.onChangeQuantity} placeholder="Batch Quantity (How many hang tags)"/>
                </Form.Group>
                <Form.Group>
                    <Form.Control type="number" min="0" max="100" name="discountValue" id="discountValue"  value={this.state.discountValue} onChange={this.onChangeDiscountValue} placeholder="Discount Value (Php)"/>
                </Form.Group>
                <Form.Group>
                    <Form.Control type="number" min="0" max="100" name="discountPercentage" id="discountPercentage"  value={this.state.discountPercentage}  onChange={this.onChangeDiscountPercentage} placeholder="Discount Percentage (%)"/>
                </Form.Group>
                <Button type="submit" className="w-100">Create Batch</Button>
            </Form>
        </Container>
        )
    }   
}

export default HangtagsViewerAdmicCreateBatchComponent;