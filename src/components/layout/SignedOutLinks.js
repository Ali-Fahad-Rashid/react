import React from 'react'
import { NavLink } from 'react-router-dom'

const SignedOutLinks = () => {
  return (
    <div>
      <ul className="right">
        <li><NavLink className="waves-effect waves-yellow grey darken-3 btn-small z-depth-5" to='/SignUp'>SignUp</NavLink></li>
        <li><NavLink className="waves-effect waves-yellow grey darken-3 btn-small z-depth-5" to='/SignIn'>SignIn</NavLink></li>
      </ul>
    </div>
  )
}

export default SignedOutLinks