import React from 'react';
import { UserProvider } from './UserContext';

export const RootContext = ({ children }) => {
    return <UserProvider>{children}</UserProvider>;
};

export default RootContext;
