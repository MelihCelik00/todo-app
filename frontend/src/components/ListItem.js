import { useState } from 'react';

import { Button } from "@mui/material";
import TickIcon from "./TickIcon";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TaskModal from "./TaskModal";

const ListItem = ({ task, getData }) => {
  const [showModal, setShowModal] = useState(false);

  const deleteItem = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/api/todo/${task.UserId}/${task.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        params: {
          userId: task.UserId,
          taskId: task.id,
        },
      })
      if (response.status === 200) {
        getData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <li className="list-item">

      <div className="info-container">
        <TickIcon/>
        <p className="task-title">{task.title}</p>
      </div>

      <div className="button-container">
        <Button className="edit" onClick={() => setShowModal(true)} variant="contained" color="secondary" endIcon={<EditIcon />}>
          Edit
        </Button>
        <Button className="delete" onClick={() => deleteItem} variant="contained" color="warning" endIcon={<DeleteIcon />}>
          Delete
        </Button>
        {showModal && <TaskModal mode={ "edit"} setShowModal={setShowModal} getData={getData} task={task}/>}
      </div>
    </li>
  );
}
  
  export default ListItem;
  