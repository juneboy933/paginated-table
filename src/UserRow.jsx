import React from 'react'

const UserRow = ({user, onClick}) => {
  return (
       <tr onClick={() => onClick(user)}>
            <td>{user.id}</td>
            <td>{user.first_name} {user.last_name}</td>
            <td>{user.email}</td>
            <td><img src={user.avatar} alt='avatar' width={40} /></td>
        </tr>
  )
}

export default UserRow
