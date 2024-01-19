import { auth } from "../Auth/firebase";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SuccessPage = () => {
  const navigate = useNavigate();
  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
        toast.success("Logged Out SuccessFully!");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <div className="success">
      <div className="svg">
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 130.2 130.2"
        >
          <circle
            className="path circle"
            fill="none"
            stroke="#73AF55"
            strokeWidth="6"
            strokeMiterlimit="10"
            cx="65.1"
            cy="65.1"
            r="62.1"
          />
          <polyline
            className="path check"
            fill="none"
            stroke="#73AF55"
            strokeWidth="6"
            strokeLinecap="round"
            strokeMiterlimit="10"
            points="100.2,40.2 51.5,88.8 29.8,67.5 "
          />
        </svg>
      </div>
      <p className="login-success">Yeah,Login Successfull!</p>
      <div className="btn-success">
        <button className="logout" onClick={handleLogOut}>
          Logout
          <FontAwesomeIcon
            style={{
              marginLeft: "8px",
            }}
            icon={faSignOut}
          />
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
