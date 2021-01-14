import Axios from 'axios';
import ClearSession from './ClearSession'

function VerifyToken(token){
    Axios.post(process.env.REACT_APP_BACKEND_SERVER + '/auth/verifytoken', {}, {
        headers: { Authorization: `Bearer ${token}` }
    })
    .catch(err => ClearSession(err))
}

export default VerifyToken