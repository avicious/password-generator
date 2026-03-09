# Password Generator

A sleek, secure, and responsive password generator built with **React** and **Modern CSS**. This component provides a high-entropy password generation tool with a focus on user experience and security.

## Features

- **Secure Generation:** Uses `window.crypto.getRandomValues()` instead of `Math.random()` for cryptographically strong, unpredictable passwords.
- **Customizable Criteria:** Toggle Uppercase, Lowercase, Numbers, and Symbols.
- **Dynamic Length:** Interactive range slider (4–32 characters) for intuitive control.
- **Modern UI Design:**
  - **CSS Grid Layout:** A clean 2x2 grid for options that adapts to mobile screens.
  - **Glassmorphism:** Subtle gradients and shadows for a premium feel.
  - **Interactive Toggles:** Large click targets with visual feedback using the `:has()` selector.
- **One-Click Copy:** Integrated Clipboard API to copy generated passwords instantly.

## How It Works

The password generation process follows a structured pipeline to ensure both user requirements and security standards are met.

### 1. Configuration & Validation
When you interact with the UI, the component updates a central `options` state. Before a password is created, the engine validates that at least one character set (Uppercase, Lowercase, Numbers, or Symbols) is selected. If none are selected, an error state is triggered to prevent the function from running.

### 2. Character Set Construction
Based on the active toggles, the generator assembles a "pool" of available characters. 
- **Uppercase:** `A-Z`
- **Lowercase:** `a-z`
- **Numbers:** `0-9`
- **Symbols:** `!@#$%^&*...`

### 3. Cryptographically Secure Generation
Instead of using `Math.random()`, which is predictable and not suitable for security, this component uses the **Web Crypto API**:
- A `Uint32Array` is created with a length matching your desired password.
- `window.crypto.getRandomValues(array)` fills this array with truly random hardware-based numbers.
- Each random number is then mapped to an index in the character pool using the modulo operator:
  `index = randomValue % characterPool.length`

### 4. Rendering and Output
The resulting string is stored in the `generatedPassword` state and displayed. The **Clipboard API** is then used to allow a seamless "Copy" experience, ensuring the password never needs to be manually highlighted.

### Security Note
Since the generation happens entirely on the **client-side** (in your browser), your generated passwords are never sent over the internet or stored on a server. This "Zero-Knowledge" approach is the gold standard for privacy-focused tools.
