import { useState, useEffect,useRef  } from "react";
import { connect } from 'react-redux'
import { update } from '../../store/actions/projectActions'
import {  useParams, useHistory } from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

  const Update_pro = (props) => {
    const inputRef = useRef();
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const history = useHistory();
    const [progress, setProgress] = useState(0);
    const [oldfile, setoldFile] = useState(null);

    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const types = ['image/png', 'image/jpeg'];
    const projectStorage = firebase.storage();

    const { id } = useParams();

    useEffect( async () => {
if(props.projects){
     await props.projects.forEach(project => {
        if (project.id === id) {
      setTitle(project.title)
       setBody(project.content)
       setoldFile(project.url)


      }})}
       console.log(inputRef.current);
       inputRef.current.focus();
}, [id])  

const handleChange = (e) => {
  let selected = e.target.files[0];
  if (selected && types.includes(selected.type)) {
    setFile(selected);
    setError('');
  } else {
    setFile(null);
    setError('Please select an image file (png or jpg)');
  }
};

  const Submit = (e) => {
    e.preventDefault();

    if(file){
      const storageRef = projectStorage.ref(file.name+' '+Math.random());
      storageRef.put(file).on('state_changed', (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percentage);
      }, (err) => {console.log(error.code)}, 
      async () => {
        var url = await storageRef.getDownloadURL();
        const Data = {
          title:title,
          content:body,
          url:url
        }
        await props.update(Data,id);

        toast("Your Post Added Successfully")
       history.push('/');
      });
    }

    else if(oldfile){
      const Data = {
        title:title,
        content:body,
        url:oldfile
      }
      props.update(Data,id);
      toast("Your Post Added Successfully")
     history.push('/');

    }

  else {
    const Data = {
      title:title,
      content:body,
      url:"https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"
    }
    props.update(Data,id);
    toast("Your Post Added Successfully")
   history.push('/');
  }


  }
return (
      <div className="container">
                <br></br> <br></br> <br></br>
                <br></br> <br></br>
        <form className="white" onSubmit={Submit}>
          <h5 className="grey-text text-darken-3">Update Post</h5><br></br>
          <div className="input-field">
          <i class="material-icons prefix">account_circle</i>

            <input type="text" id='title' ref={inputRef}  value={title}
          onChange={(e) => setTitle(e.target.value)} required/>
          </div>
          <div className="input-field">
          <i class="material-icons prefix">mode_edit</i>

            <textarea id="content" className="materialize-textarea" value={body}
          onChange={(e) => setBody(e.target.value)} ></textarea>
          </div>

          
          <div className="file-field input-field">
      <div className="btn">
        <span>File</span>
        <input type="file" onChange={handleChange}/>
      </div>
      <div className="file-path-wrapper">
        <input className="file-path validate" type="text"/>
      </div>
    </div>

          <div className="input-field">
            <button className="btn pink lighten-1">UPDATE</button>
          </div>
        </form>
        { file && <motion.div className="progress-bar"
      initial={{ width: 0 }}
      animate={{ width: progress + '%' }}
    ></motion.div>}

{error && <p>{error}</p>}
      </div>
    )
  }

const mapStateToProp = (state) => {
  return {
    projects: state.firestore.ordered.projects,
    auth: state.firebase.auth
  }
}

const mapDispatchToProp = dispatch => {
  return {
    update: (project,id) => dispatch(update(project,id))
  }
}


export default compose(
  connect(mapStateToProp, mapDispatchToProp),
  firestoreConnect([{
     collection: 'projects', orderBy: ['createdAt', 'desc']
  }])
)(Update_pro)
 