// import axios from 'axios';

const initialState = {
  username: '',
  profile_pic: ''
};

const GET_INFO = 'GET_INFO';

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_INFO:
      return {...state, ...action.payload}
      // return Object.assign({}, state, {username: action.payload.username})
    default:
      return state;
  }
}

export const getUserInfo = (info) => {
  return {
    type: GET_INFO,
    payload: info
  }
}

export default reducer;