import React, { createContext, useState } from 'react';

export const LoginContext = createContext(null);

const ContextProviderFav = ({ children }) => {

  const [accountCart, setAccountCart] = useState({ carts: [] });
  const [accountFav, setAccountFav] = useState({ favouriates: []});
  const [fname,setFname] = useState("")
  return (
    <LoginContext.Provider value={{ accountCart, setAccountCart, accountFav, setAccountFav,fname,setFname }}>
      {children}
    </LoginContext.Provider>
  );
};

export default ContextProviderFav;

