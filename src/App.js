import "./App.css";
import Header from "./components/Header";
import List from "./pages/List";

const App = () => {
  return (
    <div className="homePage">
      <Header />
      <List />
    </div>
  );
};

export default App;
