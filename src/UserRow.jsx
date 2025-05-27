const UserRow = ({ user, onClick, onDelete, onEdit }) => {
  return (
    <tr onClick={() => onClick(user)}>
      <td>{user.id}</td>
      <td>{user.first_name} {user.last_name}</td>
      <td>{user.email}</td>
      <td><img src={user.avatar} alt='avatar' width={40} /></td>
      <td>
        <button className='delete-btn' onClick={(e) => {
          e.stopPropagation();
          onDelete(user.id);
        }}>Delete</button>
        <button className='edit-btn' onClick={(e) => {
          e.stopPropagation();
          onEdit(user);
        }}>Edit</button>
      </td>
    </tr>
  );
};

export default UserRow;
