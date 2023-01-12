import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./store";
import theme from "./theme";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ChakraProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ChakraProvider>
);
