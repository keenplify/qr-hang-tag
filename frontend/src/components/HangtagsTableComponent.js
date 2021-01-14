import React, { Component }  from 'react';
import {Table, Spinner, Col} from 'react-bootstrap'
import Axios from 'axios'
import Cookies from 'universal-cookie';

class HangtagTableComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            posted: false,
            data: {},
            props: this.props
        }
        this.cookies = new Cookies()
    }

    componentDidMount(props) {
        Axios.get(process.env.REACT_APP_BACKEND_SERVER + `/hangtags/bybatch?id=${this.state.props.batchId}`, {
            headers: { Authorization: `Bearer ${this.cookies.get('token')}` }
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
        
        <Col>
            {
                this.state.posted ? (
                    <Table  striped bordered hover>
                        <thead className="font-weight-bold">
                            <tr>
                                <td>Hangtag ID</td>
                                <td>Owner ID</td>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.data.map((hangtag,i) => 
                            <tr key={i}>
                                <td>{hangtag._id}</td>
                                <td>{hangtag.ownerId ? (hangtag.ownerId): 'No current owner'}</td>
                            </tr>)
                        }
                        </tbody>
                    </Table>
                ):(<Spinner animation="border" />)
            }
        </Col>
        )
    }
}

export default HangtagTableComponent;