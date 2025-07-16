import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ThemeContextType {
  rtl: boolean;
  toggleDirection: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  rtl: true,
  toggleDirection: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [rtl, setRtl] = useState(true);

  const toggleDirection = () => {
    setRtl((prev) => !prev);
    document.documentElement.dir = !rtl ? 'rtl' : 'ltr';
  };

  // Set initial direction
  React.useEffect(() => {
    document.documentElement.dir = rtl ? 'rtl' : 'ltr';
  }, []);

  return (
    <ThemeContext.Provider value={{ rtl, toggleDirection }}>
      {children}
    </ThemeContext.Provider>
  );
};