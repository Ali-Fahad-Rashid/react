export const update = (project,id) => {
  return (dispatch, getState, {getFirestore}) => {
    getFirestore().collection('projects').doc(id).update({
      ...project,

    //  title:project.title,
    //  content:project.content,
      
    }).then(() => {
      console.log(id);

      dispatch({ type: 'UPDATE' });
    }).catch(err => {
      dispatch({ type: 'ERROR' }, err);
    });
  }
};



 export const createProject = (project) => {
  return (dispatch, getState, {getFirestore}) => {
    getFirestore().collection('projects').add({
      ...project,
  // title:project.title,
  // content:project.content,
  // url:project.url,

      authorFirstName: getState().firebase.profile.firstName,
      authorLastName: getState().firebase.profile.lastName,
      authorId: getState().firebase.auth.uid,
      createdAt: new Date()
    }).then(() => {
      dispatch({ type: 'CREATE_PROJECT_SUCCESS' });
    }).catch(err => {
      dispatch({ type: 'CREATE_PROJECT_ERROR' }, err);
    });
  }
}; 

