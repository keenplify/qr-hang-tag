import React, { Component }  from 'react';
import {Spinner, Col, Row, Container, Button} from 'react-bootstrap'
import Axios from 'axios'
import Cookies from 'universal-cookie';
import html2canvas from 'html2canvas';
import VerifyToken from '../modules/VerifyToken'

import HangtagTemplateComponent from './HangtagTemplateComponent';

class BatchPrinterComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            posted: false,
            data: {},
            props: props
        }
        this.Cookies = new Cookies();
    }

    componentDidMount() {
        VerifyToken(this.Cookies.get('token'))
        document.title = 'Batch Printer - QR Hang Tag'

        Axios.get(process.env.REACT_APP_BACKEND_SERVER + `/hangtags/bybatch?id=${this.props.match.params.batchId}`, {
            headers: { Authorization: `Bearer ${this.Cookies.get('token')}` }
        }).then((res) => {
            console.log(res)
            this.setState({
                posted: true,
                data: res.data
            })
        })
    }

    render() {
        return(
        
        <Container>
            <Button onClick={() => {
                html2canvas(document.querySelector("#capture")).then(canvas => {
                    var myImage = canvas.toDataURL("image/png");
                    var tWindow = window.open("");
                    tWindow.document.write("<img id='Image' src=" + myImage + " style='width:100%;'></img>")
                    tWindow.document.close(); //missing code
                    setInterval(() => {
                        tWindow.focus();
                        tWindow.print(); 
                    }, 2500)
                });
            }}>Print</Button>
            {
                this.state.posted ? (
                    <Row id='capture'>
                    {
                        this.state.data.map((hangtag,i) => 
                        <Col className="py-5" xs='auto'>
                            <HangtagTemplateComponent 
                                id={hangtag._id}
                                width='198px' 
                                height='540px'
                            />
                        </Col>)
                    }
                    </Row>
                ):(<Spinner animation="border" />)
            }
        </Container>
        )
    }
}

export default BatchPrinterComponent;