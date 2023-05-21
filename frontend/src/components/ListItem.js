import TickIcon from "./TickIcon";
import { Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ListItem = ({ task }) => {
    return (
      <li className="list-item">

        <div className="info-container">
          <TickIcon/>
          <p className="task-title">{task.title}</p>
        </div>

        <div className="button-container">
          <Button className="edit" variant="contained" color="secondary" endIcon={<EditIcon />}>
            Edit
          </Button>
          <Button className="delete" variant="contained" color="warning" endIcon={<DeleteIcon />}>
            Delete
          </Button>
        </div>
      </li>
    );
  }
  
  export default ListItem;
  