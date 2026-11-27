export type ThemeType = "light" | "dark";

export type ThemeContextProps = {
  theme: ThemeType;
  setTheme: React.Dispatch<React.SetStateAction<ThemeType>>;
  switchTheme: () => void;
};
