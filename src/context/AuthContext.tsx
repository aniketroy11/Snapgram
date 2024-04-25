import { getCurrentUser } from '@/lib/appwrite/api';
import { IUser } from '@/type'
import {createContext,useContext,useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom';


export const InitialUser = {
    id:'',
    name:'',
    username:'',
    email:'',
    imageUrl:'',
    bio:'',
};

const InitialState = {
    user:InitialUser,
    isLoading:false,
    setUser:()=>{},
    isAuthenticated:false,
    setIsAuthenticated:()=>{},
    checkAuthUser:async ()=>false as boolean
};

type IContextType = {
  user: IUser;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
};

const AuthContext = createContext<IContextType>(InitialState);

const AuthProvider = ({ children} : { children : React.ReactNode}) => {

  const [user,setUser] = useState<IUser>(InitialUser)
  const [isLoading,setIsLoading] = useState(false)
  const [isAuthenticated,setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  const checkAuthUser = async () =>{
    try {
      const currentAccount = await getCurrentUser();

      if(currentAccount){
        setUser({
          id:currentAccount.$id,
          name:currentAccount.name,
          username:currentAccount.username,
          email:currentAccount.email,
          imageUrl:currentAccount.imageUrl,
          bio:currentAccount.bio
        })

        setIsAuthenticated(true);
        return true;
      }
      return false;

    }catch(error){
      console.log(error);
      return false;
    }
     finally {
      setIsLoading(false);
    }
  };

  useEffect(()=>{
      // 
    if(
      localStorage.getItem('cookieFallback') === '[]' ||
      localStorage.getItem('cookieFallback') === null
    )navigate('/sign-in')

    checkAuthUser();
  },[]);

  const value = {
    user,
    setUser,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

export const useUserContext = () => useContext(AuthContext)