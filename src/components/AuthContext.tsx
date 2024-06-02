import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface AuthContextType {
  loggedInUser: string | null;
  setLoggedInUser: (user: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [loggedInUser, setLoggedInUserState] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setLoggedInUser(storedUser);
    }
  }, []);

  const setLoggedInUser = (user: string | null) => {
    if (user) {
      localStorage.setItem("loggedInUser", user);
    } else {
      localStorage.removeItem("loggedInUser");
    }
    setLoggedInUserState(user);
  };

  return (
    <AuthContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
