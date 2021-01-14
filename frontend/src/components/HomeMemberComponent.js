import React, { Component } from 'react';
import { Container, Col, Jumbotron, Row, Button } from 'react-bootstrap'
import Cookies from 'universal-cookie';
import VerifyToken from '../modules/VerifyToken';

import AccountDiscountBalanceComponent from './AccountDiscountBalanceComponent';

class HomeMemberComponent extends Component {
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
        let token=this.Cookies.get('token')

        VerifyToken(token)
        document.title = 'Home - QR Hang Tag'
    }

    render() {
        return(
        <Container className="mt-2">
            <AccountDiscountBalanceComponent />
            <Jumbotron style={{background: 'linear-gradient(to left, #44a08d, #093637)', color:'white'}}>
                <Row>
                    <Col xs="1" />
                    <Col xs="10">
                    <h1 className="golden">Claim discounts.</h1>
                    <p>
                        Scan your hang tags to claim discounts to be used for next transactions.
                    </p>
                    <p>
                        <Button variant="primary" href='/scanner'>Start scanning!</Button>
                    </p>
                    </Col>
                    <Col xs="1" />
                </Row>
            </Jumbotron>
        </Container>
        )
    }     
}

export default HomeMemberComponent;