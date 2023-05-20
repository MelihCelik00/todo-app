import ListHeader from "./components/ListHeader";
import { useEffect } from "react";

const App = () => {

  const getData = async () => {
    const userId = 1;
    try {
      const response = await fetch(`http://localhost:8080/api/todo/${userId}`);
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => { getData() }, []);

  return (
    <div className="app">
      <ListHeader listName={'To-Do App'}/>
    </div>
  );
}

export default App;
