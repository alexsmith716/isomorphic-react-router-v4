
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import auth from '../authentication/authentication.reducer';
// import app from 'reducers/AppReducer';
// import validate from 'reducers/ValidateReducer';
// import login from 'reducers/LoginReducer';
// import register from 'reducers/RegisterReducer';
// import user from 'reducers/UserReducer';


const reducers = combineReducers({

  form,
  auth,

});


export default reducers;