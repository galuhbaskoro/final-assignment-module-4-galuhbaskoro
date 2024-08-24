import { Routes, Route, Navigate } from "react-router-dom"
import Register from "../pages/Register/Register";
import Login from "../pages/Login";
import Category from "../pages/Category";
import AddCategory from "../pages/AddCategory";
import UpdateCategory from "../pages/UpdateCategory";
import ProtectedRoute from "../components/ProtectedRoute";
import NotFound from "../components/NotFound";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/register"/>}/>
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Login/>} />
      <Route element={<ProtectedRoute />}>
        <Route path="/category" element={<Category />} />
        <Route path="/addcategory" element={<AddCategory />} />
        <Route path="/updatecategory/:id" element={<UpdateCategory />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Routing;