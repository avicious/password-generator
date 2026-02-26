import { useEffect, useState } from "react";
import { Copy, CopyCheck } from "lucide-react";

const App = () => {
  const [options, setOptions] = useState({
    length: 12,
    uppercase: true,
    lowercase: true,
    number: false,
    symbols: false,
  });

  const [error, setError] = useState("");
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const handleCheckboxChange = (key) => {
    setOptions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const generateRandomPassword = () => {
    const { uppercase, lowercase, number, symbols, length } = options;

    if (!uppercase && !lowercase && !number && !symbols) {
      setError("Please select at least one character type.");
      return;
    }
    setError("");

    const charset = {
      uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      lowercase: "abcdefghijklmnopqrstuvwxyz",
      number: "0123456789",
      symbols: "!@#$%^&*()_+-={}[]|:;<>,.?/~",
    };

    let availableChars = "";
    if (uppercase) availableChars += charset.uppercase;
    if (lowercase) availableChars += charset.lowercase;
    if (number) availableChars += charset.number;
    if (symbols) availableChars += charset.symbols;

    let password = "";
    const array = new Uint32Array(Number(length));
    window.crypto.getRandomValues(array);

    for (let i = 0; i < length; i++) {
      password += availableChars[array[i] % availableChars.length];
    }

    setGeneratedPassword(password);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedPassword);
      setIsCopied(true);
    } catch (err) {
      setError("Failed to copy!");
    }
  };

  useEffect(() => {
    if (isCopied) {
      const timeout = setTimeout(() => setIsCopied(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [isCopied]);

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h1 className="title">Password Generator</h1>
        </div>

        <div className="card-body">
          <div className="input-group">
            <label>Length: {options.length}</label>

            <input
              type="range"
              min={4}
              max={32}
              value={options.length}
              onChange={(e) =>
                setOptions({ ...options, length: parseInt(e.target.value) })
              }
            />
          </div>

          <div className="options-grid">
            {["uppercase", "lowercase", "number", "symbols"].map((key) => (
              <div key={key} className="checkbox-container">
                <input
                  type="checkbox"
                  id={key}
                  checked={options[key]}
                  onChange={() => handleCheckboxChange(key)}
                />
                <label htmlFor={key}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
              </div>
            ))}
          </div>

          {error && <span className="error">{error}</span>}

          <button className="btn" onClick={generateRandomPassword}>
            Generate Password
          </button>
        </div>
      </div>

      {generatedPassword && (
        <div className="password">
          <p>{generatedPassword}</p>
          <button onClick={copyToClipboard} className="copy-btn">
            {isCopied ? (
              <CopyCheck color="#4BB543" size={20} />
            ) : (
              <Copy color="#a2a2a2" size={20} />
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
