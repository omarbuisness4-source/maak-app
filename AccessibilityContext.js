import React, { createContext, useState } from "react";

export const AccessibilityContext = createContext({
  fontScale: 1,
  increaseFont: () => {},
  decreaseFont: () => {},
  speak: () => {},
});

export function AccessibilityProvider({ children }) {
  const [fontScale, setFontScale] = useState(1);

  const increaseFont = () => {
    setFontScale((prev) => Math.min(prev + 0.1, 1.6));
  };

  const decreaseFont = () => {
    setFontScale((prev) => Math.max(prev - 0.1, 0.8));
  };

  const speak = (text) => {
    console.log("SPEAK:", text);
  };

  return (
    <AccessibilityContext.Provider
      value={{ fontScale, increaseFont, decreaseFont, speak }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}




