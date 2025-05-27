import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';

export default function ThemeProvider({
  children,
  ...props
}: ThemeProviderProps) {
  return (
    // forcedTheme for light mode only
    <NextThemesProvider forcedTheme="light" {...props}>
      {children}
    </NextThemesProvider>
  );
}
