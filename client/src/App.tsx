import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Screens/login";
import RegistPage from "./Screens/register";
import TestPage from "./Screens/test";
import HomePage from "./Screens/home";
import Navbar from "./Navbar/Navbar1";
import Profile from "./Screens/profile";
import EditProfile from "./Screens/edit-profile";
import RegisterAdmin from "./Screens/Admin/adminRegister";
import Writepost from "./Screens/post";
import Content from "./Screens/Content";
import LoginAdmin from "./Screens/Admin/adminLogin";
import AdminHome from "./Screens/Admin/adminHome";
import Feeds from "./Screens/Feeds";
import Setting from "./Screens/setting1";
import Setting2 from "./Screens/setting2";
import Setting3 from "./Screens/setting3";
import Sidebar from "./Screens/sidebar";
import Settingtest from "./Screens/settingtest";
import Category from "./Screens/category";
import Footer from "./Navbar/footer";
import ForgotPassword from "./Screens/ForgotPassword";
import ResetPassword from "./Screens/ResetPassword";
import Post from "./Screens/post";
import Popular from "./Screens/Popular";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistPage />} />
        <Route path="/nav" element={<Navbar />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/profile/edit-profile/:id" element={<EditProfile />} />
        <Route path="/posts" element={<Post />} />
        <Route path="/Popular" element={<Popular />} />
        <Route path="/writepost" element={<Writepost />} />
        <Route path="/setting1" element={<Setting />} />
        <Route path="/setting2" element={<Setting2 />} />
        <Route path="/setting3" element={<Setting3 />} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/st" element={<Settingtest />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/content/:id" element={<Content />} />
        <Route path="/feeds" element={<Feeds />} />
        <Route path="/category" element={<Category />} />
        <Route path="/admin/register" element={<RegisterAdmin />} />
        <Route path="/admin/login" element={<LoginAdmin />} />
        <Route path="/admin/:id" element={<AdminHome />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset_password/:id/:token" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
