import React, { Component } from 'react';
import { Container, Col, Row, Spinner, Alert, Button } from 'react-bootstrap'
import Axios from 'axios';
import Cookies from 'universal-cookie';
import Styled from 'styled-components'

import HangtagTemplate from './HangtagTemplateComponent';
import AccountLogin from './AccountLoginComponent';

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

const HangtagWrap = Styled.div`
    box-shadow: 15px 25px 18px rgba(0,0,0,.5);
    border-radius: 25px;
`

class HangtagViewer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            hangtagId: '',
            posted: false,
            hangtag: {},
            batch: {},
            err: ''
        }
        
        this.Cookies = new Cookies()
        this.claimHangtag = this.claimHangtag.bind(this)
    }

    claimHangtag() {
        Axios.get(process.env.REACT_APP_BACKEND_SERVER + `/hangtags/setownership?id=${this.state.hangtagId}`, {
            headers: { Authorization: `Bearer ${this.Cookies.get('token')}` }
        }).then((res) => document.location = '/')
    }
    
    componentDidMount() {
        document.title = 'View QR - QR Hang Tag'
        const { match: { params } } = this.props;
        if (params.hangtagId) {
            this.setState({
                hangtagId: params.hangtagId
            })

            Axios.get(process.env.REACT_APP_BACKEND_SERVER + `/hangtags/view?id=${params.hangtagId}`, {
                headers: { Authorization: `Bearer ${this.Cookies.get('token')}` }
            }).then((res) => {
                this.setState({
                    posted: true, 
                    hangtag: res.data.hangtag, 
                    batch: res.data.batch
                })
            }).catch(err => this.setState({posted: true, err: err.toString()}))
        }
    }

    render() {
        return(
        <Container>
            {this.state.posted ? (
            <Row>
                    { this.state.err ? <Alert variant="warning">{this.state.err}</Alert>:(
                        <Container>
                            <Row>
                                <ColFix 
                                    md={4} 
                                    style={{background:'linear-gradient(to right, #d3cce3, #e9e4f0)'}}
                                    className='p-5'
                                >
                                    <Row className="my-md-5" />
                                    <HangtagWrap style={{width: '198px', height:'540px'}} className="mx-auto">
                                        <HangtagTemplate width='198px' height='540px' id={this.state.hangtagId}/>
                                    </HangtagWrap>
                                </ColFix>
                                <ColFix>
                                    <Row>
                                        <Col md={2}/>
                                        <Col md={8}>
                                            <Row />
                                            {
                                                this.state.hangtag.ownerId ? 
                                                (<h1 className="golden mt-5">I'm sorry with these colorful texts, but this hangtag is owned/used.</h1>):
                                                (<div>
                                                    <h1 className="golden mt-5">This hangtag is unowned. Claim it now!</h1>
                                                    <table>
                                                        <tr>
                                                            <td className="font-weight-bold">Discount (Php):</td>
                                                            <td>₱{this.state.batch.discountValue}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="font-weight-bold">Discount (%):</td>
                                                            <td>{this.state.batch.discountPercentage}%</td>
                                                        </tr>
                                                    </table>
                                                    {
                                                        this.Cookies.get('token') ? (<div>
                                                            <p className="mt-5">By clicking the button below, you will claim the discount and the values above will be added to your discount wallet. </p>
                                                            <Button variant="success" className="w-100" onClick={this.claimHangtag()}>Claim</Button>
                                                            <Row className="my-5" />
                                                        </div>):(<div>
                                                            <p className="mt-5">Login below to claim the discount.</p>
                                                            <AccountLogin className="my-5"/>
                                                            <Row className="my-5" />
                                                        </div>)
                                                    }
                                                </div>)
                                            }
                                        </Col>
                                        <Col md={2}/>
                                    </Row>
                                </ColFix>
                            </Row>
                        </Container>
                    )}
            </Row>):(<Spinner animation="border" />)}
        </Container>
        )
    }     
}

export default HangtagViewer;