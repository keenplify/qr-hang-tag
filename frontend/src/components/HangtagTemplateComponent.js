import React  from 'react';
import Styled from 'styled-components';
import { QRCode } from 'react-qrcode-logo';
import {Row, Col, Container} from 'react-bootstrap'

const Hangtag = Styled.div`
    background: #0F2027;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to bottom, #2C5364, #203A43, #0F2027);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to bottom, #2C5364, #203A43, #0F2027); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    border-radius: 25px;
`

const Circle = Styled.div`
    width: 18px;
    height: 18px;
    background-color: white;
    border-radius: 50%;
    margin: 0 auto;
`

const HangtagTemplate = (props) => {
    return (
    <Hangtag style={{
        width: props.width, 
        height: props.height,
        fontSize: '1.1em'
        
        }}  className="mx-auto">
        <Container className="text-center">
            <Row className="pt-4">
                <Circle/>
            </Row>
            <Row>
                <Col className="pt-3 mt-2">
                    <QRCode 
                        value={`http://${window.location.host}/qr/${props.id}`}
                        
                    />
                </Col>
            </Row>
            <Row >
                <Col style={{color: 'white', wordBreak: 'break-word'}} className="py-2">
                    <p>Scan the QR code to save the hangtag to your account!</p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <img src={process.env.PUBLIC_URL + '/branding.png'} alt="QR Hang Tag Preview" className="w-100"></img>
                </Col>
            </Row>
            <Row>
                <Col style={{color: 'white'}} >
                    <p>Made by Keenplify</p>
                </Col>
            </Row>
        </Container>
    </Hangtag>
    )
}

export default HangtagTemplate;