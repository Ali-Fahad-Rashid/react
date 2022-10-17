import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'

const SignedInLinks = (props) => {
  return (
    <div>
      <ul className="right">
        <li><NavLink className="waves-effect waves-yellow grey darken-3 btn-small z-depth-5" to='/create'>New Project</NavLink></li>
        <li><a className="waves-effect waves-yellow grey darken-3 btn-small z-depth-5" onClick={props.signOut}>Log Out</a></li>
        <li><NavLink className="waves-effect waves-yellow grey darken-3 btn-small z-depth-5" to='/'>
          {props.profile.firstName}
        </NavLink></li>
      </ul>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(null, mapDispatchToProps)(SignedInLinks)
