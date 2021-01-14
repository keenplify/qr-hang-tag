import React, { Component } from 'react';
import { Container, Col, Row, Spinner } from 'react-bootstrap'
import Cookies from 'universal-cookie';
import Axios from 'axios';

class AccountDiscountBalanceComponent extends Component {
    constructor(props) {
        super(props)

        this.Cookies = new Cookies()
        this.state = {
            posted: false,
            discountValueWallet: '',
            discountPercentageWallet: ''
        }
    }
    
    componentDidMount() {
        Axios.post(process.env.REACT_APP_BACKEND_SERVER + '/auth/walletbalance', {}, {
            headers: { Authorization: `Bearer ${this.Cookies.get('token')}` }
        })
        .then(res => {
            console.log(res.data)
            this.setState({
                posted: true,
                discountValueWallet: res.data.discountValueWallet,
                discountPercentageWallet: res.data.discountPercentageWallet
            })
        })
    }

    render() {
        return(
            <Container 
                style={{borderRadius: '5px', background: 'linear-gradient(to left, #200122, #6f0000)', color: 'white'}}
                className="p-2 mb-1"
            >
                {
                    this.state.posted ? (
                    <Row>
                        <Col md={5}><b>Discounts</b></Col>
                        <Col>
                            <b>Amount Wallet:</b> ₱{this.state.discountValueWallet}
                        </Col>
                        <Col>
                            <b>Percentage Wallet:</b> {this.state.discountPercentageWallet}%
                        </Col>
                    </Row>
                    ):<Spinner animation="border" />
                }
            </Container>
        )
    }     
}

export default AccountDiscountBalanceComponent;