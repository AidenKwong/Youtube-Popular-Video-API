import "./App.css";
import Header from "./components/Header";
import List from "./pages/List";
import theme from "./theme";
import { ThemeProvider } from "@mui/material/styles";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="homePage">
        <Header />
        <List />
      </div>
    </ThemeProvider>
  );
};

export default App;
