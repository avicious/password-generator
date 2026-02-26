import { useState } from "react";

const App = () => {
  const [options, setOptions] = useState({
    length: 10,
    upper: false,
    lower: false,
    num: false,
    symbols: false,
    isError: false,
  });

  const [isError, setIsError] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState("");

  const generateRandomPassword = () => {
    if (
      !options?.upper &&
      !options?.lower &&
      !options?.num &&
      !options?.symbols
    ) {
      setIsError(true);
      return;
    }

    setIsError(false);

    const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerChars = "abcdefghijklmnopqrstuvwxyz";
    const numChars = "1234567890";
    const symbolsChars = "!@#$%^&*()_+-={}[]|:;<>,.?/~";

    let passwordChars = "";
    let password = "";

    if (options.upper) {
      passwordChars += upperChars;
    }

    if (options.lower) {
      passwordChars += lowerChars;
    }

    if (options.num) {
      passwordChars += numChars;
    }

    if (options.symbols) {
      passwordChars += symbolsChars;
    }

    const passwordLength = options.length;

    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * passwordChars.length);
      password += passwordChars[randomIndex];
    }

    setGeneratedPassword(password);
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h1 className="title">Generate Password</h1>
        </div>

        <div className="card-body">
          <label htmlFor="">Password length</label>

          <input
            type="number"
            value={options.length}
            name="confirmPassword"
            placeholder="Password length"
            min={4}
            max={32}
            onChange={({ target }) => {
              setOptions({ ...options, length: target.value });
            }}
          />

          <div className="row">
            <div className="checkbox-container">
              <input
                type="checkbox"
                id="upper"
                checked={options.upper}
                onChange={() => {
                  setOptions({ ...options, upper: !options.upper });
                }}
              />
              <label htmlFor="upper">Uppercase</label>
            </div>

            <div className="checkbox-container">
              <input
                type="checkbox"
                id="lower"
                checked={options.lower}
                onChange={() => {
                  setOptions({ ...options, lower: !options.lower });
                }}
              />
              <label htmlFor="lower">Lowercase</label>
            </div>

            <div className="checkbox-container">
              <input
                type="checkbox"
                id="num"
                checked={options.num}
                onChange={() => {
                  setOptions({ ...options, num: !options.num });
                }}
              />
              <label htmlFor="num">Number</label>
            </div>

            <div className="checkbox-container">
              <input
                type="checkbox"
                id="symbols"
                checked={options.symbols}
                onChange={() => {
                  setOptions({ ...options, symbols: !options.symbols });
                }}
              />
              <label htmlFor="symbols">Symbols</label>
            </div>
          </div>

          {isError && (
            <span className="error">Please select at least one option.</span>
          )}

          <button className="btn" onClick={generateRandomPassword}>
            Generate Password
          </button>
        </div>
      </div>

      {generatedPassword && (
        <div className="password">
          <label>Generated Password:</label>
          <p>{generatedPassword}</p>
        </div>
      )}
    </div>
  );
};

export default App;
