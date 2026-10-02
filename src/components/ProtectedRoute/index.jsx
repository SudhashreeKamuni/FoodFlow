import Cookie from 'js-cookie'
import {Navigate} from 'react-router-dom'

const ProtectedRoute = ({children}) =>{
    const jwt_token = Cookie.get('jwt_token')
    console.log(jwt_token)
    if(jwt_token !== undefined){
        return children
    }
    else{
        return <Navigate to='/login' />
    }
}
export default ProtectedRoute
