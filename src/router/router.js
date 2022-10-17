import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Update_pro from '../components/projects/update'


import SignIn from '../components/auth/SignIn'
import SignUp from '../components/auth/SignUp'
import Dashboard from '../components/dashboard/Dashboard'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/footer'

import CreateProject from '../components/projects/CreateProject'
import ProjectDetails from '../components/projects/ProjectDetails'

import NotFound from '../components/NotFound';

function router() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/">
              
          
                        <Dashboard />
            </Route>
            <Route path="/update/:id">
              <Update_pro />
            </Route>
            <Route path="/SignUp">
              <SignUp />
            </Route>
            <Route path="/SignIn">
              <SignIn />
            </Route>
            <Route path="/create">
              <CreateProject />
            </Route>
            <Route path="/posts/:id">
              <ProjectDetails />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>  
        </div>
        <div className="footer">
        <br></br>    
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Footer/>
        </div>
    </Router>
  );
}

export default router;
