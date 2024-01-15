import { useState } from "react";
import OtpInput from "./OtpInput";

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

  return (
    <div className="container">
      <h1>Login With Phone</h1>

      {!showOtpInput ? (
        <form onSubmit={handlePhoneSubmit}>
          <input
            type="text"
            placeholder="Enter Phone Number"
            value={phoneNumber}
            onChange={handlePhoneNumber}
          />
          <button type="submit">Submit</button>
        </form>
      ) : (
        <div>
          <p>Enter OTP sent to {phoneNumber}</p>
          <OtpInput length={4} onOtpSubmit={onOtpSubmit} />
        </div>
      )}
    </div>
  );
};

export default PhoneOtpLogin;
