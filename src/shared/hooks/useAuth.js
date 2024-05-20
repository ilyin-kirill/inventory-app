import { createContext, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from './useLocalStorage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useLocalStorage('isLogin', null);
  const [user, setUser] = useLocalStorage('user', null);
  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const login = async (data) => {
    setIsAuth(1);
    setUser(data);
    navigate('/inventory');
  };

  // call this function to sign out logged in user
  const logout = () => {
    setIsAuth(null);
    setUser(null);
    navigate('/login', { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      isAuth,
      login,
      logout,
    }),
    [isAuth, user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
