import { createContext, useContext, useEffect, useState } from "react";
import { AuthAPI } from "../apis/authAPI";
import { User } from "../models/User";

type UserContextType = {
  user: User | null;
  isAuth: boolean;
  loading: boolean;
  refreshUser: () => void;
};

const UserContext = createContext<UserContextType>({
  user: null,
  isAuth: false,
  loading: false,
  refreshUser: () => {},
});

export const useUser = () => useContext(UserContext);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(false);

  const refreshUser = () => {
    setLoading(true);
    AuthAPI.user()
    .then((res) => {
      if (res.status === 200) {
        setUser(res.data.user); 
        setIsAuth(true);
        setLoading(false);
      }
    })
    .catch(()=>{
        setUser(null);
        setIsAuth(false);
        setLoading(false);
    })
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, isAuth, refreshUser, loading}}>
      {children}
    </UserContext.Provider>
  );
}
