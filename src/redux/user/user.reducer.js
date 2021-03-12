const INITIAL_STATE =  {
  currentUser: null
}

const userReducer = (state = INITIAL_STATE, action) => {
  let actions = {
    "SET_CURRENT_USER": {...state, currentUser: action.payload},
  }

  return actions[action.type] ?? state;
}

export default userReducer;