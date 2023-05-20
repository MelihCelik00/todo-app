const ListHeader = ({ listName }) => {

  const signOut = () => {
    console.log("Signing out...");
  };

  return (
    <div className="list-header">
      <h1>{listName}</h1>
      <div className="button-container">
        <button className="add-task">Add Task</button>
        <button className="sign-out" onClick={signOut}>Sign Out</button>
      </div>
    </div>
  );
}

export default ListHeader;