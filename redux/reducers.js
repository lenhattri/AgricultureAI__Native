import { USER_LOGGED_IN } from './currentUser/actions';

const initialState = {
  currentUser: null,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOGGED_IN:
      return { ...state, user: action.currentUser };
    default:
      return state;
  }
}

export default rootReducer;
