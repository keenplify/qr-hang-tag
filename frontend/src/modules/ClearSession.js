import Cookies from 'universal-cookie';

const cookies = new Cookies()

function ClearSession(err) {
    cookies.remove('token')
    cookies.remove('type')
    cookies.remove('id')

    if (err) localStorage.setItem('err', err)
    
    document.location = '/'
    
}

export default ClearSession