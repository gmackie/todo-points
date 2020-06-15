import React, { createContext, useContext, useReducer, useEffect, Dispatch } from 'react';
import jwt_decode from 'jwt-decode';

interface AuthTokenContextProviderProps {
  children?: React.ReactNode;
}

interface AuthTokenContext {
  authToken: string | null;
  setAuthToken: Dispatch<string | null>;
}
interface JWTPayload {
  iat: number;
  exp: number;
  user: string;
  login_session: string;
}

let reducer = (_authToken: string | null, newAuthToken: string | null) => {
  if (newAuthToken === null) {
    localStorage.removeItem("todo-points-auth");
  }
  return newAuthToken;
}

const initialState: AuthTokenContext = {
  authToken: null,
  setAuthToken: (s: string | null) => {},
};
const localState = localStorage.getItem("todo-points-auth");
const AuthTokenContext = createContext<AuthTokenContext>(initialState);
function AuthTokenContextProvider(props: AuthTokenContextProviderProps) {
  const [authToken, setAuthToken] = useReducer(reducer, localState);
  const { children } = props;
  useEffect(() => {
    if (!authToken) {
      return;
    }
    localStorage.setItem("todo-points-auth", authToken);
  }, [authToken]);

  return (
    <AuthTokenContext.Provider value={{ authToken, setAuthToken }}>
      {children}
    </AuthTokenContext.Provider>
  );
}

function useSetAuthToken(): Dispatch<string | null> {
  const { setAuthToken } = useContext(AuthTokenContext);
  return setAuthToken;
}

function useUsername(): string | undefined {
  const { authToken } = useContext(AuthTokenContext);
  console.log(authToken === "")
  if ((!authToken) || (authToken === "")) {
    return undefined;
  }
  console.log(authToken);
  const { user } = jwt_decode<JWTPayload>(authToken);
  return user;
}

export { AuthTokenContextProvider, useSetAuthToken, useUsername };