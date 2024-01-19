import { Route, Routes } from "react-router";
import "./App.css";
import PhoneOtpLogin from "./components/PhoneOtpLogin";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SuccessPage from "./components/SuccessPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<PhoneOtpLogin />} />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
        style={{ whiteSpace: "nowrap" }}
      />
    </div>
  );
}

export default App;
