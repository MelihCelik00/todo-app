import { useEffect, useState } from "react";
import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem"
import Auth from "./components/Auth";
import { useCookies } from 'react-cookie';
import { TextField } from "@mui/material";

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const userId = cookies.UserId;
  const authToken = cookies.AuthToken;
  const [tasks, setTasks] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const getData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/api/todo/${userId}`);
      const json = await response.json();
      setTasks(json);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => { 
    if (authToken)
      getData();
   }, []);

  // Sort by date
  const sortedTasks = tasks?.sort((a, b) => new Date(a.date) - new Date(b.date));
  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredTasks = sortedTasks ? sortedTasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  return (
    <div className="app">
      {!authToken && <Auth />}
      {authToken &&
      <>
      <ListHeader listName={'To-Do App'} getData={getData}/>
      <TextField
        id="filled-search"
        label="Search field"
        type="search"
        variant="filled"
        value={searchQuery}
        onChange={handleSearchChange}
      />

      {filteredTasks.map((task) => (
        <ListItem key={task.id} task={task} getData={getData} />
      ))}
      </>
      }      
    </div>
  );
}

export default App;
