import {Link, useNavigate} from "react-router-dom";
import Swal from "sweetalert2";

const Navbar = () => {

  const navigate = useNavigate();
  const token = localStorage.getItem("login-token");

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure want to Logout ??",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ok",
      confirmButtonColor: "#057A55",
      cancelButtonColor: "#F05252 "
    }).then((result) => {
      if(result.isConfirmed){
        localStorage.removeItem("login-token");
        navigate('/');
      }    
    })
  };

 return (
   <ul className="flex flex-row w-full h-auto bg-sky-900 py-2 px-5 text-white">

    {token ? (<></>) : (
      <li className="my-2 mx-3 inline-block">
      <Link to="/">Login</Link>
      </li>
    )}

    {token ? (<></>) : (
      <li className="my-2 mx-3 inline-block">
      <Link to="/register">Register</Link>
      </li>
    )}

    <li className="my-2 mx-3 inline-block">
     <Link to="/category">Category</Link>
    </li>

    {token ? (
      <li className="my-2 mx-3 inline-block">
        <button onClick={handleLogout}>Log Out</button>
      </li>
    ) : (<></>)}

   </ul>
 );

};

export default Navbar;