import "./global.css";
import SignUp from "./auth/forms/SignUp";
import SignIn from "./auth/forms/SignIn";
import Home from "./roots/pages/Home";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "./auth/AuthLayout";
import RootLayout from "./roots/RootLayout";
import { Toaster } from "@/components/ui/toaster"
import AllUsers from "./roots/pages/AllUsers";
import CreatePost from "./roots/pages/CreatePost";
import EditPost from "./roots/pages/EditPost";
import PostDetails from "./roots/pages/PostDetails";
import Profile from "./roots/pages/Profile";
import Saved from "./roots/pages/Saved";
import Explore from "./roots/pages/Explore";
import UpdateProfile from "./roots/pages/UpdateProfile";

const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        {/* public router*/}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Route>

        {/* private router*/}
        <Route element={<RootLayout/>}>
          <Route index element={<Home />} />
          <Route path="/explore"  element={<Explore />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:id" element={<EditPost />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/profile/:id/*" element={<Profile />} />
          <Route path="/update-profile/:id" element={<UpdateProfile />} />
        </Route>
      </Routes>

      <Toaster/>
    </main>
  );
};

export default App;
