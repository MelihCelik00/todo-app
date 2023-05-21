import { Button } from "@mui/material";
import { useState } from 'react';

const TaskModal = ({ mode, setShowModal, getData, task }) => {
  const editMode = mode === "edit" ? true : false
  const [data, setData] = useState({
    user_id: editMode ? task.UserId : null, // hardcoded 1 here
    title: editMode ? task.title : "",
    status: false
  });

  const postData = async (e) => {
    e.preventDefault();
    try {
      // const hardcodedUserId = 1;
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/api/todo/${data.user_id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        params: { userId: data.user_id },
        body: JSON.stringify({
          title: data.title,
          status: data.status
        })  
      })
      if (response.status === 201) {
        console.log("Task created!");
        setShowModal(false);
        getData();
      } 
    } catch (error) {
      console.log(error);
    }
  };

  const updateData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/api/todo/${task.UserId}/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        params: { 
          userId: data.user_id,
          taskId: task.id, },
        body: JSON.stringify({
          title: data.title
      })
    })
    if (response.status === 200) {
      setShowModal(false);
      getData();
    }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    console.log("Handling change...", e);
    const { name, value } = e.target;;

    setData((data) => ({
      ...data,
      [name]: value
    }))
    console.log(data);
  };

  return (
    <div className="overlay">
      <div className="modal">
        <div className="form-title-container">
          <h3>Let's {mode} your task</h3>
          <Button onClick={() => setShowModal(false)}>Close</Button>
        </div>

        <form>
          <input
            required
            maxLength={30}
            placeholder="Write your task here..."
            name="title"
            value={data.title}
            onChange={handleChange}
          />
          <br/>
          <input className={mode} type="submit" onClick={editMode ? updateData : postData} />
        </form>
      </div>
    </div>
  );
}

export default TaskModal;
  