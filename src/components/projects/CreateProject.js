
import { useState, useRef} from "react";
import { connect } from 'react-redux'
import { createProject } from '../../store/actions/projectActions'
import { useParams, useHistory } from 'react-router-dom'
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';

  const CreateProject = (props) => {
    const inputRef = useRef();
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const history = useHistory();

    const [progress, setProgress] = useState(0);

    //const [files, setfiles] = useState([]);
    const { id } = useParams();
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const types = ['image/png', 'image/jpeg'];
    const projectStorage = firebase.storage();

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
      await props.createProject(Data);
      toast("Your Post Added Successfully")
     history.push('/');
    });
  }
else {
  const Data = {
    title:title,
    content:body,
    url:"https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"
  }
   props.createProject(Data);
  toast("Your Post Added Successfully")
 history.push('/');
}
 
  }
return (
      <div className="container">
        <br></br> <br></br> <br></br><br></br> <br></br>


        <form className="white" onSubmit={Submit}>
          <h5 className="grey-text text-darken-3">Create Post</h5><br></br>
          <div className="input-field">
          <i className="material-icons prefix">account_circle</i>

          <label  htmlFor=""> Title</label >

            <input type="text" id='title' ref={inputRef}  value={title}
          onChange={(e) => setTitle(e.target.value)} required/>
          </div>
          <div className="input-field">
          <i className="material-icons prefix">mode_edit</i>

          <label  htmlFor=""> Content</label >

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
            <button className="btn pink lighten-1">Create</button>
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
    auth: state.firebase.auth
  }
}

const mapDispatchToProp = dispatch => {
  return {
    createProject: (project) => dispatch(createProject(project))
  }
}


export default connect(mapStateToProp, mapDispatchToProp)(CreateProject)
 