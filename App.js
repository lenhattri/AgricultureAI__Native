import { NavigationContainer } from "@react-navigation/native";
import Navigator from "./navigation";
import { ThemeProvider } from "react-native-magnus";
export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </ThemeProvider>
  );
}