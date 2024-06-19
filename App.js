import { NavigationContainer } from "@react-navigation/native";
import Navigator from "./navigation";
import { ThemeProvider } from "react-native-magnus";
import { Provider } from "react-redux";
import store from "./redux/store";
export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <NavigationContainer>
          <Navigator />
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  );
}