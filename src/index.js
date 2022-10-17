
import React from "react";
import ReactDOM from "react-dom";
import { applyMiddleware, compose, createStore } from "redux";
import { Provider,useSelector} from "react-redux";
import { ReactReduxFirebaseProvider, getFirebase,isLoaded} from "react-redux-firebase";
import { createFirestoreInstance, getFirestore } from "redux-firestore";
import rootReducer from './store/reducers/rootReducer'
import firebase from './config/fbConfig'
import Router from './router/router.js';
import './assets/index.css';
import thunk from 'redux-thunk'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AuthIsLoaded({ children }) {
  const auth = useSelector(state => state.firebase.auth)
  if (!isLoaded(auth)) return <div className="splash"></div>;
  return children
}

const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true,
};
const middlewares = [
  thunk.withExtraArgument({ getFirebase, getFirestore })
]
const initialState = {};

 const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
  trace: true, // (action) => { return ‘trace as string’; }
  traceLimit: 25,
}) || compose;
 const store = createStore(rootReducer, /* preloadedState, */ initialState, composeEnhancers(


  applyMiddleware(...middlewares),
));

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance, //since we are using Firestore
};

ReactDOM.render(
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
      <AuthIsLoaded>

          <Router />
          <ToastContainer />

          </AuthIsLoaded>

      </ReactReduxFirebaseProvider>
    </Provider>,
  document.getElementById("root")
);

