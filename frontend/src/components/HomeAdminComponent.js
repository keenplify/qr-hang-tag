import React, { Component } from 'react';
import { Container, Carousel, Jumbotron, Button, Row, Col } from 'react-bootstrap'
import Cookies from 'universal-cookie';
import VerifyToken from '../modules/VerifyToken'

class HomeAdminComponent extends Component {
    constructor(props) {
        super(props)

        this.Cookies = new Cookies()
    }
    
    componentDidMount() {
        VerifyToken(this.Cookies.get('token'))
        document.title = 'Home - QR Hang Tag'
    }

    render() {
        return(
        <Container className="mt-2">
            <Carousel>
                <Carousel.Item>
                    <Jumbotron style={{background: 'linear-gradient(to left, #ffafbd, #ffc3a0)', color:'white'}}>
                        <Row>
                            <Col xs="1" />
                            <Col xs="10">
                            <h1>Batch create new hang tags</h1>
                            <p>
                                Use the hang tag creator to create printable custom handtags with automatically generated QR code
                            </p>
                            <p>
                                <Button variant="primary" href='/hangtags/createbatch'>Generate 🔥 hang tags</Button>
                            </p>
                            </Col>
                            <Col xs="1" />
                        </Row>
                    </Jumbotron>
                </Carousel.Item>
                <Carousel.Item>
                    <Jumbotron style={{background: 'linear-gradient(to right, #dad299, #b0dab9)', color: 'black'}}>
                        <Row>
                            <Col xs="1" />
                            <Col xs="10">
                            <h1>Modify hangtags</h1>
                            <p>
                                See all the hang tags youve created, customize it, reprint it, do whatever you want to do with it
                            </p>
                            <p>
                                <Button variant="primary" href='/hangtags'>Start modifying</Button>
                            </p>
                            </Col>
                            <Col xs="1" />
                        </Row>
                    </Jumbotron>
                </Carousel.Item>
            </Carousel>
        </Container>
        )
    }   
}

export default HomeAdminComponent;