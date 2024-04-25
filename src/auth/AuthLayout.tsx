import { Navigate,Outlet } from 'react-router-dom';
import sideImage from "../images/sideImage.png";
const AuthLayout = () => {
  const isAuthenticated = false;
  return (
   <>
    {
      isAuthenticated ? (
        <Navigate to='/'/>
      ) 
      :
      (
        <>
          <section className="flex flex-1 justify-center items-center flex-col py-10">
            <Outlet/>
          </section>
          
          <img 
          src={sideImage}
          alt="logo"
          className="hidden xl:block  h-screen w-1/2 object-cover bg-no-repeat "
          />
        </>
      )
    }
   </>
  )
}

export default AuthLayout
