import React, { Component } from 'react';
import QrReader from 'react-qr-reader'
import { Container, Row, Col } from 'react-bootstrap'

class HangtagScannerComponent extends Component {    
    componentDidMount() {
        document.title = 'Scanner - QR Hang Tag'
        
    }
    
    handleScan = data => {
        let regex = RegExp(`(/qr/)`)
        if (regex.test(data)) {
            document.location = data
        }
    }
    handleError = err => {
        console.error(err)
    }

    render() {
        
    return (
        <Container>
            <Row>
                <Col md={{span: 8, offset: 2}}>
                    <QrReader
                        delay={300}
                        onError={this.handleError}
                        onScan={this.handleScan}
                        style={{ width: '100%' }}
                    />
                </Col>
            </Row>
        </Container>
    )
    }
}

export default HangtagScannerComponent;