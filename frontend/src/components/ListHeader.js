import { Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import TaskModal from "./TaskModal";
import { useState } from 'react';

const ListHeader = ({ listName, getData }) => {
  const [showModal, setShowModal] = useState(false);

  const signOut = () => {
    console.log("Signing out...");
  };

  return (
    <div className="list-header">
      <h1>{listName}</h1>
      <div className="button-container">
        <Button className="add-task" onClick={() => setShowModal(true)} color="success" variant="contained" endIcon={<AddIcon />}>
          Add New Task
        </Button>
        <Button className="sign-out" onClick={signOut} color="error" variant="contained" endIcon={<ExitToAppIcon />}>
          Sign Out
        </Button>
      </div>
      {showModal && <TaskModal mode={"create"} setShowModal={setShowModal} getData={getData} />}
    </div>
  );
}

export default ListHeader;