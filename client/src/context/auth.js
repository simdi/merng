import { createContext, useReducer } from "react";

const AuthContext = createContext({
  user: null,
  login: (userData) => {},
  logout: () => {},
});

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

const AuthProvider = (props) => {
  const [state, dispatch] = useReducer(AuthReducer, { user: null });

  const login = (userData) => {
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user: state.user, login, logout }} {...props} />
  );
};

export { AuthContext, AuthProvider };