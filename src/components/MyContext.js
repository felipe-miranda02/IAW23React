import { createContext, useState, useEffect } from 'react';

export const MyContext = createContext();

export function MyContextProvider(props) {
  const [user, setUser] = useState({
    name: '',
    email: ''
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <MyContext.Provider value={{ user, setUser }}>
      {props.children}
    </MyContext.Provider>
  );
}

