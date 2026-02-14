import React from 'react';
import { UserProvider } from './UserContext';
import { ProductProvider } from './ProductContext';

export const RootContext = ({ children }) => {
  return (
    <UserProvider>
      <ProductProvider>{children}</ProductProvider>
    </UserProvider>
  );
};

export default RootContext;
