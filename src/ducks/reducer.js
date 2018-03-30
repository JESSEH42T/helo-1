import axios from 'axios';

const initialState = {
  username: '',
  id: 0,
  profile_pic: ''
};

const REGISTER = 'REGISTER';
const LOGIN = 'LOGIN'

const reducer = (state = initialState, action) => {
  switch(action.payload) {
    case REGISTER + '_FULFILLED':
      return {...state, ...action.payload};
      // return Object.assign({}, state, {username:})
    default:
      return state;
  }
}

export const updateUser = () => {
  let user = axios.get('/api/user').then(res => {
    return res.data;
  })
  return {
    type: REGISTER,
    payload: {...user}
  }
}

export default reducer;