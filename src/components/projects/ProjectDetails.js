import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { useParams,Link, useHistory } from 'react-router-dom'
import moment from 'moment'
import firebase from 'firebase/app';
import 'firebase/firestore';
import { Modal, Button, MediaBox } from 'react-materialize';

const ProjectDetails = ({ projects, auth } ) => {

const { id } = useParams();
const history = useHistory();
const Del = () => {
 const firestore = firebase.firestore();
  let documentRef = firestore.collection('projects').doc(id);

  documentRef.delete().then(() => {
    history.push('/');
    console.log('Document successfully deleted.');
  });

}

if (projects) {

    return (
      <div className="container center">
{/*           <Modal header="Modal Header" trigger={<Button>Open Modal</Button>}>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  </Modal> */}



        <div className="card z-depth-0">
        { projects && projects.map(project => {

if (project.id === id) {

            return (
        <div key={id}>

          <div className="card-content center">
          <MediaBox className=" center "
  id="MediaBox_9"
  options={{
    inDuration: 275,
    onCloseEnd: null,
    onCloseStart: null,
    onOpenEnd: null,
    onOpenStart: null,
    outDuration: 200
  }}
>
  <div className=" center "><img className="responsive center " height="500" width="500" src={project.url}></img>
</div>
</MediaBox>
{/*           <img className="responsive" height="500" width="500" src={project.url}></img>
 */}
            <h4 className="card-title">{project.title}</h4>
            <p>{project.content}</p>
          </div>
          <div className="card-action  grey-text">
            <div>Posted by {project.authorFirstName} {project.authorLastName}</div>
            <div>{moment(project.createdAt.toDate()).calendar()}</div>
          </div>
          <div class="card-action">

          {auth.uid===project.authorId ?
          <Link className="waves-effect waves-light btn yellow accent-4 m" to={'/update/' + project.id} key={project.id}>Edit</Link>
              : <Link className="waves-effect waves-light btn m disabled" to={'/update/' + project.id} key={project.id}>Edit</Link> }
          
          {auth.uid===project.authorId ?

<Modal
actions={[
  <div>
  <Button flat modal="close" node="button" waves="green">Close</Button>
  <Button flat modal="close" className="waves-effect waves-light btn  red m" onClick={Del} node="button" waves="green">Delete</Button>
  </div>


]}
bottomSheet
fixedFooter={false}
header="Confirm Delete"
id="Modal-11"
open={false}
options={{
  dismissible: true,
  endingTop: '10%',
  inDuration: 250,
  onCloseEnd: null,
  onCloseStart: null,
  onOpenEnd: null,
  onOpenStart: null,
  opacity: 0.5,
  outDuration: 250,
  preventScrolling: true,
  startingTop: '4%'
}}
trigger={<Button className="waves-effect waves-light btn  #ff3d00 deep-orange accent-3 m" node="button">Delete</Button>}
>
Are you sure ? </Modal>

/*           <a className="waves-effect waves-light btn  #ff3d00 deep-orange accent-3 m" href="#" onClick={Del}>Delete</a>
 */          : <a className="waves-effect waves-light btn m disabled" href="#" onClick={Del}>Delete</a>  }

</div>

                  </div>
            )}
         })}
        </div>   

      </div>
    )
  } else {
    return (
      <div className="container center">
        <p>Loading project...</p>     


      </div>
    )
  }
}

const mapStateToProps = (state) => {

  return {
      projects: state.firestore.ordered.projects,

    auth: state.firebase.auth
  }
}
export default compose(
  connect(mapStateToProps),
  firestoreConnect([{
     collection: 'projects', orderBy: ['createdAt', 'desc']
  }])
)(ProjectDetails)
 