import {useState} from 'react'
import Cookie from 'js-cookie'
import {useNavigate} from 'react-router-dom'

import './index.css'

const LoginForm = () => {
  const [userName, setUserName] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const loginBtn = async event => {
    event.preventDefault()

    if (userName.trim() === '' || userPassword.trim() === '') {
      setErrorMsg('Please enter username and password')
      return
    }

    setIsLoading(true)
    setErrorMsg('')

    const userDetails = {
      username: userName,
      password: userPassword,
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    try {
      const response = await fetch(
        'https://apis.ccbp.in/login',
        options,
      )

      const data = await response.json()



if (response.ok === true) {
  console.log('LOGIN RESPONSE:', data)
  console.log('JWT TOKEN:', data.jwt_token)

  Cookie.set('jwt_token', data.jwt_token)

  console.log('COOKIE:', Cookie.get('jwt_token'))

  navigate('/', {replace: true})
}



//       if (response.ok === true) {
//   const jwtToken = data.jwt_token

//   Cookie.set('jwt_token', jwtToken)

//   console.log('LOGIN TOKEN:', jwtToken)
//   console.log('COOKIE AFTER SET:', Cookie.get('jwt_token'))

//   navigate('/')
// }

      // if (response.ok === true) {
      //   Cookie.set('jwt_token', data.jwt_token)

      //   navigate('/', {replace: true})
      // }
       else {
        setErrorMsg(data.error_msg)
      }
    } catch (error) {
      setErrorMsg('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

 return (
  <div className="login-page">
    <div className="login-card">
      <img src='/logo.png' alt="FoodFlow logo"
    className="login-logo"/>

      <p>Login</p>

      <form onSubmit={loginBtn}>
        <label htmlFor="username">Username</label>

        <input
          id="username"
          type="text"
          value={userName}
          placeholder="Enter username"
          onChange={event => setUserName(event.target.value)}
        />

        <label htmlFor="password">Password</label>

        <input
          id="password"
          type="password"
          value={userPassword}
          placeholder="Enter password"
          onChange={event => setUserPassword(event.target.value)}
        />

        {errorMsg !== '' && (
          <p className="login-error">{errorMsg}</p>
        )}

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>

    <div className="login-image-container">
      <img
        src="/login-food.jpg"
        alt="Food"
        className="login-image"
      />
    </div>
  </div>
)
}

export default LoginForm