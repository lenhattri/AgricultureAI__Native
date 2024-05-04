import { USER_LOGGED_IN } from './actions';

const initialState = {
  user: null,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOGGED_IN:
      return { ...state, user: action.user };
    default:
      return state;
  }
}

export default rootReducer;
