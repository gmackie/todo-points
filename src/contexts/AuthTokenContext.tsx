import React, { useState, createContext, useContext } from 'react';
import jwt_decode from 'jwt-decode';

interface AuthTokenContextProviderProps {
  children?: React.ReactNode;
}

interface JWTPayload {
  iat: number;
  exp: number;
  user: string;
  login_session: string;
}

const setAuthTokenDummy = (value: React.SetStateAction<string | undefined>): void => {
  //noop
  Boolean(value);
};

interface IAuthTokenContext {
  authToken?: string;
  setAuthToken: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const dummyContext: IAuthTokenContext = {
  authToken: undefined,
  setAuthToken: setAuthTokenDummy,
}
const AuthTokenContext: React.Context<IAuthTokenContext> = createContext(dummyContext);

export function AuthTokenContextProvider(props: AuthTokenContextProviderProps) {
  const { children } = props;
  const [authToken, setAuthToken] = useState<string>();
  const authContext: IAuthTokenContext = {
    authToken,
    setAuthToken,
  }
  return <AuthTokenContext.Provider value={authContext}>{children}</AuthTokenContext.Provider>

}

export function useAuthToken(): string | undefined {
  const { authToken } = useContext(AuthTokenContext);
  return authToken;
}

export function useUsername(): string | undefined {
  const { authToken } = useContext(AuthTokenContext);
  if (!authToken) {
    return undefined;
  }
  const { user } = jwt_decode<JWTPayload>(authToken);
  return user;
}

export function useSetAuthToken(): React.Dispatch<React.SetStateAction<string | undefined>> {
  const { setAuthToken } = useContext(AuthTokenContext);
  return setAuthToken;
}
