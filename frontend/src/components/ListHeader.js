import { Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const ListHeader = ({ listName }) => {

  const signOut = () => {
    console.log("Signing out...");
  };

  return (
    <div className="list-header">
      <h1>{listName}</h1>
      <div className="button-container">
        <Button className="add-task" color="success" variant="contained" endIcon={<AddIcon />}>
          Add Task
        </Button>
        <Button className="sign-out" onClick={signOut} color="error" variant="contained" endIcon={<ExitToAppIcon />}>
          Sign Out
        </Button>
      </div>
    </div>
  );
}

export default ListHeader;