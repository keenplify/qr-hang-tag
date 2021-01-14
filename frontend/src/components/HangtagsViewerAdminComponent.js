import React, { Component } from 'react';
import { Container, Row, Col, Spinner, Dropdown, DropdownButton, ButtonGroup, Button } from 'react-bootstrap'
import Cookies from 'universal-cookie';
import VerifyToken from '../modules/VerifyToken'
import Styled from 'styled-components'
import Axios from 'axios';

import HangtagsViewerAdmicCreateBatchComponent from './HangtagsViewerAdmicCreateBatchComponent';
import HangtagsTableComponent from './HangtagsTableComponent';

import CustomPopup from '../modules/CustomPopup'

const ColFix = Styled(Col)`
    padding: 1rem;
    @media(min-width: 768px) {
        height: 100vh;
        margin-top: -56px;
        padding-top: calc(56px + 1rem);
        width:inherit;
        overflow: auto;
    }
`

class HangtagsViewerAdminComponent extends Component {
    constructor(props) {
        super(props)

        this.Cookies = new Cookies()
        this.state = {
            posted: false,
            batches: [],
            currentlyViewing: undefined
        }
    }

    closePreview = () => this.setState({currentlyViewing: undefined})
    
    componentDidMount() {
        VerifyToken(this.Cookies.get('token'))
        document.title = 'Home - QR Hang Tag'

        Axios.get(process.env.REACT_APP_BACKEND_SERVER + '/hangtags/', {
            headers: { Authorization: `Bearer ${this.Cookies.get('token')}` }
        }).then((res) => {
            console.log(res.data)
            this.setState({posted: true, batches: res.data})
        })
    }
    render() {
        return(
        <Container fluid>
            <Row>
                <ColFix md='2' style={{backgroundColor: 'rgba(0,0,0,.75)', color: 'white'}} className="pb-3">
                    <h5>Batches</h5>
                    {
                        this.state.posted ? (
                        <Container>
                            {
                                this.state.batches.map((batch, i) => 
                                <Row key={i}>
                                    <DropdownButton 
                                        key={i} 
                                        title={batch.name} 
                                        id={`batches-${batch.id}`} 
                                        as={ButtonGroup} 
                                        variant='info'
                                        className="my-1 w-100"
                                    >
                                        <Dropdown.Item eventKey="2" key={1} onClick={() => {
                                            this.setState({
                                                currentlyViewing: this.state.batches[i]
                                            })
                                        }}>Preview</Dropdown.Item>
                                        <Dropdown.Item eventKey="1" key={2} onClick={() => {
                                             Axios.post(process.env.REACT_APP_BACKEND_SERVER + '/hangtags/deletebatch', {batchId: batch.id}, {
                                                headers: { Authorization: `Bearer ${this.Cookies.get('token')}` }
                                            })
                                            .then(res => document.location.reload())
                                        }}>Delete</Dropdown.Item>
                                    </DropdownButton>
                                </Row>)
                            }
                            <Row>
                                <CustomPopup trigger={<Button variant='success' className='w-100 my-1' >Create new batch</Button>} modal>
                                    {Close => <HangtagsViewerAdmicCreateBatchComponent close={Close}/>}
                                </CustomPopup>
                            </Row>
                        </Container>
                        ):(<Spinner animation="border" />)
                    }
                </ColFix>
                <ColFix>
                    {this.state.currentlyViewing !== undefined ? (
                        <Container>
                            <Row>
                                <Col>
                                    <Row>
                                        <Col xs={5} sm={2}><b>Created At: </b></Col>
                                        <Col>{this.state.currentlyViewing.createdAt}</Col>
                                    </Row>
                                    <Row>
                                        <Col xs={5} sm={2}><b>Batch ID: </b></Col>
                                        <Col>{this.state.currentlyViewing.id}</Col>
                                    </Row>
                                    <Row>
                                        <Col xs={5} sm={2}><b>Quantity (Initial): </b></Col>
                                        <Col>{this.state.currentlyViewing.quantity}</Col>
                                    </Row>
                                    <Row>
                                        <Col xs={5} sm={2}><b>Discount Value: </b></Col>
                                        <Col>Php {this.state.currentlyViewing.discountValue}</Col>
                                    </Row>
                                    <Row>
                                        <Col xs={5} sm={2}><b>Discount Percentage: </b></Col>
                                        <Col>{this.state.currentlyViewing.discountPercentage}%</Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <HangtagsTableComponent batchId={this.state.currentlyViewing.id} />
                            </Row>
                            <Row>
                                <Col><Button variant='success' className='w-100' onClick={() => document.location =`/batchprint/${this.state.currentlyViewing.id}`}>Print</Button></Col>
                                <Col><Button variant='danger' className="w-100" onClick={this.closePreview}>Close</Button></Col>
                            </Row>
                        </Container>
                    ):('Youre viewing nothing!')}
                </ColFix>
            </Row>
        </Container>
        )
    }   
}

export default HangtagsViewerAdminComponent;