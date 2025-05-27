import React, { useEffect, useState } from 'react'
import './dashboard.css'
import UserRow from './UserRow';

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1)
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [newUSer, setNewUser] = useState({
        first_name:'',
        last_name: '',
        email: "",
    });
    const [adding, setAdding] = useState(false);

    // const apiKey = 'reqres-free-v1';

    // Fetch data from APi
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
        } finally{
            setLoading(false);
        }
    }

    // Load it to our page
    useEffect(() => {
        fetchData();
    }, [page]);

    // Post new user to the API
    const createNewUser = async() => {
        const res = await fetch("https://reqres.in/api/users", {
            method: 'POST',
            headers: {
                "content-type": "application/json",
                "x-api-key": "reqres-free-v1"
            },
            body: JSON.stringify(newUSer),
        });
        const data = await res.json();
        setUsers([data, ...users]);
        setNewUser({first_name: '',last_name: '',email: ''});
    }
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        setAdding(true);
        await createNewUser();
        setAdding(false);
    }

    // debounce effect
    useEffect(() => {
        const timeout = setTimeout(() => {
            setSearchTerm(inputValue);
        },500);
        return () => clearTimeout(timeout);
    },[inputValue]);

    // Filter feature
    const filteredUsers = users.filter((user) => `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()));

    const handleClick = (user) => {
        setSelectedUser(user);
    }

    const closeModal = () => {
        setSelectedUser(null);
    }

    // console.log(users);
    // console.log(page);

  return (
    <div className='container'>
        <h1>Users Dashboard (page {page})</h1>
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={newUSer.first_name} 
                placeholder='First name'
                onChange={e => setNewUser({...newUSer, first_name: e.target.value})}/>
            <input 
                type="text" 
                value={newUSer.last_name} 
                placeholder='Last name' 
                onChange={e => setNewUser({...newUSer, last_name: e.target.value})}/>
            <input 
                type="email" 
                value={newUSer.email} 
                placeholder='Email'
                onChange={e => setNewUser({...newUSer, email: e.target.value})}/>
            <button 
                type='submit'
                disabled={
                    !newUSer.first_name || !newUSer.last_name || !newUSer.email
                }>{adding ? 'Adding' : 'Add user'}</button>
        </form>
        <input 
            type="text"
            value={searchTerm}
            placeholder='
            Search user'
            onChange={(e) => setInputValue(e.target.value)} />
        {loading ? <p>Loading ...</p> : (
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>AVATAR</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map((user) => (
                       <UserRow key={user.id} user={user} onClick={handleClick}/>
                    ))}
                </tbody>
            </table>
        )}
        <div className="btn-container">
            <button onClick={() => setPage(page - 1)} disabled={page === 1}>Prev</button>
            <button onClick={() => setPage(page + 1)}  disabled={page === totalPages}>Next</button>
        </div>
        {selectedUser && (
          <div className="modal">
            <div className="modal-content">
              <h3>{selectedUser.first_name} {selectedUser.last_name}</h3>
              <p>Email: {selectedUser.email}</p>
              <img src={selectedUser.avatar} alt="avatar" />
              <button onClick={closeModal}>Close</button>
            </div>
          </div>
        )}
    </div>
  )
  
}

export default Dashboard
