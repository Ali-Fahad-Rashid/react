import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Link } from 'react-router-dom'
import moment from 'moment'

const Dashboard = (props) => {
    return (
      <div className="">
 
        <div className="cover">
              <div className="container">
              <br></br><br></br>
              <br></br><br></br>
              <br></br><br></br>
              <br></br><br></br>
              <br></br><br></br>
              <br></br><br></br>
              <br></br><br></br>
              <br></br><br></br>
        <div className="row">
          { props.projects && props.projects.map(project => {
          return (
          <Link to={'/posts/' + project.id} key={project.id}>
          <div className="card-panel hoverable">
          <div className="card-content grey-text text-darken-3">
          <div className="col s9">

          <h5 className="card-title ">{project.title}</h5>
          <p className="card-title ">{project.title}</p>

          <p>Posted by {project.authorFirstName} {project.authorLastName}</p>
          <p className="grey-text">{moment(project.createdAt.toDate()).calendar()}</p>
          </div>          </div>

          <img className="circle" height="200" width="200" src={project.url}></img>
          </div>
          </Link>
          )})}  
         </div>
          </div>
          </div>     
               </div>

    )
}

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    projects: state.firestore.ordered.projects,
    auth: state.firebase.auth,
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'projects', limit: 10, orderBy: ['createdAt', 'desc']},
  ])
)(Dashboard)
