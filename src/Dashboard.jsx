import React, { useEffect, useState } from 'react'
import './dashboard.css'

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1)
    const [loading, setLoading] = useState(false);

    // const apiKey = 'reqres-free-v1';

    const fetchData = async () => {
        try {
            const res = await fetch(`https://reqres.in/api/users?page=${page}`, {
                headers: {"x-api-key": "reqres-free-v1"},
            });
            const data = await res.json();
            // console.log(data);
            setUsers(data.data);
            setPage(data.page);
            setTotalPages(data.total_pages);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching users.', error);
            setLoading(true);
        }
    }

    useEffect(() => {
        fetchData();
    }, [page]);

    // console.log(users);
    // console.log(page);

  return (
    <div className='container'>
        <h1>Users Dashboard (page {page})</h1>
        {loading ? <p>Loading ...</p> : (
            <table>
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>NAME</td>
                        <td>EMAIL</td>
                        <td>AVATAR</td>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.first_name} {user.last_name}</td>
                            <td>{user.email}</td>
                            <td><img src={user.avatar} alt='avatar' width={40} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}
        <div className="btn-container">
            <button onClick={() => setPage(page - 1)} disabled={page === 1}>Prev</button>
            <button onClick={() => setPage(page + 1)}  disabled={page === totalPages}>Next</button>
        </div>
    </div>
  )
}

export default Dashboard
