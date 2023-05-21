import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem"
import { useEffect, useState } from "react";

const App = () => {
  const userId = 1; // hardcoded for now
  const [ tasks, setTasks] = useState(null);

  const getData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/api/todo/${userId}`);
      console.log(userId);
      const json = await response.json();
      setTasks(json);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => { getData() }, []);

  console.log(tasks);

  // Sort by date
  const sortedTasks = tasks?.sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="app">
      <ListHeader listName={'To-Do App'} getData={getData}/>
      {sortedTasks?.map( (task) => <ListItem key={task.id} task={task} getData={getData}/>)}
    </div>
  );
}

export default App;
