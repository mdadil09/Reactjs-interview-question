import { useEffect, useState } from "react";
import OtpInput from "./OtpInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faArrowLeft,
  faMobileAlt,
  faPhoneVolume,
} from "@fortawesome/free-solid-svg-icons";
import login from "../assests/login.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../Auth/firebase";
import { useNavigate } from "react-router";

const PhoneOtpLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState("");
  const [user, setUser] = useState(null);
  let [counter, setCounter] = useState(30);
  const navigate = useNavigate();

  useEffect(() => {
    if (showOtpInput) {
      const timer =
        counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [counter, showOtpInput]);

  const handlePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handlePhoneSubmit = (e) => {
    e.preventDefault();

    //phone validations

    const regex = /[^0-9]/g;

    if (phoneNumber.length < 10 || regex.test(phoneNumber)) {
      toast.warn("Invalid Phone Number", {
        className: "toast-message",
      });
      return;
    }

    setShowOtpInput(true);
  };

  const onOtpSubmit = async (otpValue) => {
    setOtp(otpValue);
  };

  const toggleForm = () => {
    setShowOtpInput(false);
  };

  const timeFormat = (n) => {
    return n > 9 ? "" + n : "0" + n;
  };

  //Authentication

  const sendOTP = async () => {
    try {
      const formattedPhoneNumber = `+91${phoneNumber}`;
      const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {
        size: "invisible",
      });
      const confirmation = await signInWithPhoneNumber(
        auth,
        formattedPhoneNumber,
        recaptcha
      );
      setUser(confirmation);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const verifyOTP = async () => {
    try {
      await user.confirm(otp);
      toast.success("OTP Verification Successfull");
      navigate("/success");
    } catch (error) {
      toast.error("OTP Verification Unsuccessfull!");
      console.log(error);
    }
  };

  return (
    <>
      <div id="recaptcha" style={{ display: "none" }}></div>

      <div className="container">
        <div className="left-side">
          <img src={login} alt="" />
        </div>
        <div className="right-side">
          {!showOtpInput ? (
            <h3>Login Or Signup to Continue</h3>
          ) : (
            <div className="btn" onClick={toggleForm}>
              <FontAwesomeIcon
                style={{ marginRight: "5px" }}
                icon={faArrowLeft}
              />
              Back
            </div>
          )}
          {!showOtpInput ? (
            <>
              <form onSubmit={handlePhoneSubmit}>
                <div className="input-container">
                  <input
                    type="text"
                    placeholder="+91"
                    value="+91"
                    className="count-code"
                    readOnly
                  />
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Enter Mobile Number"
                      value={phoneNumber}
                      onChange={handlePhoneNumber}
                    />
                    <label className="form-label">Enter Mobile Number</label>
                  </div>
                </div>
                <p>
                  By procedding you confirm you are above 18 years of age and
                  agree to the{" "}
                  <span style={{ color: "#3498db", cursor: "pointer" }}>
                    Privacy
                  </span>{" "}
                  <br></br>{" "}
                  <span style={{ color: "#3498db", cursor: "pointer" }}>
                    Policy
                  </span>{" "}
                  and{" "}
                  <span style={{ color: "#3498db", cursor: "pointer" }}>
                    Terms of Use.
                  </span>
                </p>

                {phoneNumber.length >= 10 ? (
                  <div className="buttons">
                    <button type="submit" onClick={sendOTP}>
                      Get OTP{" "}
                      <FontAwesomeIcon
                        style={{ marginLeft: "10px" }}
                        size="xs"
                        icon={faAngleRight}
                      />
                    </button>
                  </div>
                ) : (
                  <div className="buttons"></div>
                )}
              </form>
              <div className="trouble">
                Having Trouble Login? <span className="span">Get Help</span>
              </div>
            </>
          ) : (
            <>
              <div className="otp-container">
                <div className="otp-text">
                  Enter OTP sent to +91{phoneNumber}
                </div>
                <OtpInput length={6} onOtpSubmit={onOtpSubmit} />
                <div className="resend">
                  {counter > 0 ? (
                    <p className="resend-text">
                      Resend OTP in{" "}
                      <span style={{ color: "#eee" }}>
                        00:{timeFormat(counter)}
                      </span>
                    </p>
                  ) : (
                    <p className="resend-text">Resend OTP on:</p>
                  )}
                  <div className="resend-action">
                    <p
                      className={`resend-action-text ${
                        counter === 0 ? "resend-action-text-active" : ""
                      }`}
                    >
                      <FontAwesomeIcon icon={faMobileAlt} /> <span>SMS</span>
                    </p>
                    <p
                      className={`resend-action-text ${
                        counter === 0 ? "resend-action-text-active" : ""
                      }`}
                    >
                      <FontAwesomeIcon icon={faPhoneVolume} /> <span>Call</span>
                    </p>
                  </div>
                </div>
                {otp.length >= 6 ? (
                  <div className="buttons-otp">
                    <button type="submit" onClick={verifyOTP}>
                      Continue{" "}
                      <FontAwesomeIcon
                        style={{ marginLeft: "10px" }}
                        size="xs"
                        icon={faAngleRight}
                      />
                    </button>
                  </div>
                ) : (
                  <div className="buttons-otp"></div>
                )}
              </div>
              <div className="trouble">
                Having Trouble Login? <span className="span">Get Help</span>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default PhoneOtpLogin;
