import {
  Editor,
  Home,
  Login,
  Post,
  Search,
  About,
  Profile,
  Dashboard,
  EditorUpdate,
} from "./pages/index";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";
// Components
import DashInfo from "./components/dash/DashInfo";
import DashPosts from "./components/dash/DashPosts";
import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/search" element={<Search />} />
          <Route path="/about" element={<About />} />
          <Route path="/post/:postId" element={<Post />} />
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route element={<AdminRoute />}>
            <Route path="/update-editor/:slug" element={<EditorUpdate />} />
            <Route path="/editor" element={<Editor />} />
            <Route path="/dashboard" element={<Dashboard />}>
              <Route index element={<DashInfo />} />
              <Route path="posts" element={<DashPosts />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
