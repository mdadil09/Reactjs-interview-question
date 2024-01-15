import React, { useEffect, useRef, useState } from "react";

const OtpInput = ({ length = 4, onOtpSubmit = () => {} }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));

  const inputRef = useRef([]);

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;
    const newOtp = [...otp];
    //allow only oneInput
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    //submit trigger

    const combinedOTtp = newOtp.join("");
    if (combinedOTtp.length === length) onOtpSubmit(combinedOTtp);

    //Move to next input if current field is filled
    if (value && index < length - 1 && inputRef.current[index + 1]) {
      inputRef.current[index + 1].focus();
    }
  };

  console.log(otp);

  const handleClick = (index) => {
    inputRef.current[index].setSelectionRange(1, 1);

    //optional
    if (index > 0 && !otp[index - 1]) {
      inputRef.current[otp.indexOf("")].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    //Move to prev input if backspace is clicked

    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRef.current[index - 1]
    ) {
      inputRef.current[index - 1].focus();
    }
  };

  useEffect(() => {
    if (inputRef.current[0]) {
      inputRef.current[0].focus();
    }
  }, []);

  return (
    <div>
      {otp.map((value, index) => {
        return (
          <input
            key={index}
            type="text"
            ref={(input) => {
              inputRef.current[index] = input;
            }}
            value={value}
            onChange={(e) => handleChange(index, e)}
            onClick={() => handleClick(index)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="otpInput"
          />
        );
      })}
    </div>
  );
};

export default OtpInput;
