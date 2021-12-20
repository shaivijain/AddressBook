import { LOGGED_IN_USER_DATA } from "@actions";

const initialState = { loggednUserData: "" };
export default function reducer(state = initialState,action) {
  let loggednUserData = state;
  switch (action.type) {
    case LOGGED_IN_USER_DATA: {
        loggednUserData = action.payLoad;
      return { ...state, loggednUserData };
    }
    default:
      return {
        ...state,
      };
  }
}
