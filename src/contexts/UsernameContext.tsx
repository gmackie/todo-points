import React, { useState, createContext, useContext } from 'react';

interface UsernameContextProviderProps {
  children?: React.ReactNode;
}

const setUsernameDummy = (value: React.SetStateAction<string | undefined>): void => {
  //noop
  Boolean(value);
};

interface IUsernameContext {
  username?: string;
  setUsername: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const dummyContext: IUsernameContext = {
  username: undefined,
  setUsername: setUsernameDummy,
}
const UsernameContext: React.Context<IUsernameContext> = createContext(dummyContext);

export function UsernameContextProvider(props: UsernameContextProviderProps) {
  const { children } = props;
  const [username, setUsername] = useState<string>();
  const authContext: IUsernameContext = {
    username,
    setUsername,
  }
  return <UsernameContext.Provider value={authContext}>{children}</UsernameContext.Provider>

}

export function useUsername(): string | undefined {
  const { username } = useContext(UsernameContext);
  return username;
}

export function useSetUsername(): React.Dispatch<React.SetStateAction<string | undefined>> {
  const { setUsername } = useContext(UsernameContext);
  return setUsername;
}
