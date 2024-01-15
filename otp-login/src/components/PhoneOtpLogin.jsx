import { useState } from "react";
import OtpInput from "./OtpInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import login from "../assests/login.png";

const PhoneOtpLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);

  const handlePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handlePhoneSubmit = (e) => {
    e.preventDefault();

    //phone validations

    const regex = /[^0-9]/g;

    if (phoneNumber.length < 10 || regex.test(phoneNumber)) {
      alert("Invalid Phone Number");
      return;
    }

    setShowOtpInput(true);
  };

  const onOtpSubmit = () => {
    console.log("login Successfull");
  };
  const toggleForm = () => {
    setShowOtpInput(false);
  };

  return (
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
                agree to the Privacy <br></br> Policy and Terms of Use.
              </p>

              {phoneNumber.length >= 10 ? (
                <div className="buttons">
                  <button type="submit">
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
              <div className="otp-text">Enter OTP sent to {phoneNumber}</div>
              <OtpInput length={4} onOtpSubmit={onOtpSubmit} />
            </div>
            <div className="trouble">
              Having Trouble Login? <span className="span">Get Help</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PhoneOtpLogin;
