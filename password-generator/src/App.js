import { useState } from "react";
import "./App.css";
import usePasswordGenerator from "./hooks/usePasswordGenerator";
import Strength from "./components/Strength";

function App() {
  const [length, setLength] = useState(4);
  const [checkBoxData, setCheckBoxData] = useState([
    { title: "Include Uppercase Letters", state: false },
    { title: "Include Lowercase Letters", state: false },
    { title: "Include Numbers", state: false },
    { title: "Include Symbols", state: false },
  ]);

  const [copied, setCopied] = useState(false);

  const handleCheckBoxChange = (i) => {
    const updatedCheckBoxData = [...checkBoxData];

    updatedCheckBoxData[i].state = !updatedCheckBoxData[i].state;
    setCheckBoxData(updatedCheckBoxData);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const { password, errorMessage, generatePassword } = usePasswordGenerator();

  return (
    <div className="container">
      {/* Password Text And Copy */}
      {password && (
        <div className="header">
          <div className="title">{password}</div>
          <button className="copyBtn" onClick={() => handleCopy()}>
            {copied ? "copied" : "copy"}
          </button>
        </div>
      )}
      <div className="charLength">
        <span>
          <label>Character Length</label>
          <label>{length}</label>
        </span>
        <input
          type="range"
          min="4"
          max="20"
          value={length}
          onChange={(e) => setLength(e.target.value)}
        />
      </div>
      {/* checkboxes */}
      <div className="checkboxes">
        {checkBoxData.map((item, id) => {
          return (
            <div key={id}>
              <input
                type="checkbox"
                checked={item.state}
                onChange={() => handleCheckBoxChange(id)}
              />
              <label>{item.title}</label>
            </div>
          );
        })}
      </div>

      {/* Strength */}

      <Strength password={password} />

      {/* Error Handling */}

      {errorMessage && <div className="errorMessage">{errorMessage}</div>}

      {/* Generate Button */}
      <button
        className="generateBtn"
        onClick={() => generatePassword(checkBoxData, length)}
      >
        Generate Password
      </button>
    </div>
  );
}

export default App;
