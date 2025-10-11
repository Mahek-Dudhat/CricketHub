import { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPanel.css';

function AdminPanel() {
    const [activeTab, setActiveTab] = useState('players');
    const [players, setPlayers] = useState([]);
    const [teams, setTeams] = useState([]);
    const [matches, setMatches] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({});
    const [msg, setMsg] = useState("");

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const fetchData = async () => {
        const token = localStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        try {
            if (activeTab === 'players') {
                const res = await axios.get('http://localhost:5000/api/players', config);
                setPlayers(res.data);
            } else if (activeTab === 'teams') {
                const res = await axios.get('http://localhost:5000/api/teams', config);
                setTeams(res.data);
            } else if (activeTab === 'matches') {
                const res = await axios.get('http://localhost:5000/api/matches', config);
                setMatches(res.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleAdd = () => {
        setEditingItem(null);
        setFormData({});
        setShowModal(true);
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        setFormData(item);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this item?')) return;

        const token = localStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        try {
            await axios.delete(`http://localhost:5000/api/${activeTab}/${id}`, config);
            fetchData();
            setMsg("Deleted Successfully");
            setTimeout(() => setMsg(""), 3000);
        } catch (error) {
            console.error('Error deleting:', error);
            alert('Failed to delete item');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        try {
            if (editingItem) {
                await axios.put(
                    `http://localhost:5000/api/${activeTab}/${editingItem._id}`,
                    formData,
                    config
                );
                setMsg("Updated Successfully");
                setTimeout(() => setMsg(""), 3000);
            } else {
                await axios.post(
                    `http://localhost:5000/api/${activeTab}`,
                    formData,
                    config
                );
                setMsg("New Record inserted Successfully");
                setTimeout(() => setMsg(""), 3000);
            }
            setShowModal(false);
            fetchData();
        } catch (error) {
            console.error('Error saving:', error);
            alert('Failed to save item');
        }
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="admin-panel">
           
            <div className="container-fluid">
                <h2 className="admin-title">Admin Panel</h2>

                <div className="admin-tabs">
                    <button
                        className={`tab-btn ${activeTab === 'players' ? 'active' : ''}`}
                        onClick={() => setActiveTab('players')}
                    >
                        Players
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'teams' ? 'active' : ''}`}
                        onClick={() => setActiveTab('teams')}
                    >
                        Teams
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'matches' ? 'active' : ''}`}
                        onClick={() => setActiveTab('matches')}
                    >
                        Matches
                    </button>
                </div>
                {
                msg && <div class="alert alert-success w-50 offset-3" role="alert">
                    {msg}
                </div>
            }
                <div className="admin-content">
                    <button className="btn btn-success mb-3" onClick={handleAdd}>
                        <i className="fas fa-plus"></i> Add New
                    </button>

                    {activeTab === 'players' && (
                        <PlayersTable
                            players={players}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    )}

                    {activeTab === 'teams' && (
                        <TeamsTable
                            teams={teams}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    )}

                    {activeTab === 'matches' && (
                        <MatchesTable
                            matches={matches}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    )}
                </div>
            </div>

            {showModal && (
                <Modal
                    activeTab={activeTab}
                    formData={formData}
                    editingItem={editingItem}
                    onClose={() => setShowModal(false)}
                    onSubmit={handleSubmit}
                    onChange={handleInputChange}
                />
            )}
        </div>
    );
}

function PlayersTable({ players, onEdit, onDelete }) {
    return (
        <div className="table-responsive">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Team</th>
                        <th>Role</th>
                        <th>Matches</th>
                        <th>Runs</th>
                        <th>Wickets</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {players.map(player => (
                        <tr key={player._id}>
                            <td>{player.name}</td>
                            <td>{player.team}</td>
                            <td>{player.role}</td>
                            <td>{player.matches}</td>
                            <td>{player.runs}</td>
                            <td>{player.wickets}</td>
                            <td>
                                <button
                                    className="btn btn-sm btn-primary me-2"
                                    onClick={() => onEdit(player)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => onDelete(player._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function TeamsTable({ teams, onEdit, onDelete }) {
    return (
        <div className="table-responsive">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Ranking</th>
                        <th>Name</th>
                        <th>Points</th>
                        <th>Wins</th>
                        <th>Losses</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {teams.map(team => (
                        <tr key={team._id}>
                            <td>{team.ranking}</td>
                            <td>{team.name}</td>
                            <td>{team.points}</td>
                            <td>{team.wins}</td>
                            <td>{team.losses}</td>
                            <td>
                                <button
                                    className="btn btn-sm btn-primary me-2"
                                    onClick={() => onEdit(team)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => onDelete(team._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function MatchesTable({ matches, onEdit, onDelete }) {
    return (
        <div className="table-responsive">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Team 1</th>
                        <th>Team 2</th>
                        <th>Venue</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {matches.map(match => (
                        <tr key={match._id}>
                            <td>{match.team1}</td>
                            <td>{match.team2}</td>
                            <td>{match.venue}</td>
                            <td>{new Date(match.date).toLocaleDateString()}</td>
                            <td>
                                <span className={`badge bg-${match.status === 'live' ? 'danger' :
                                    match.status === 'upcoming' ? 'warning' : 'success'
                                    }`}>
                                    {match.status}
                                </span>
                            </td>
                            <td>
                                <button
                                    className="btn btn-sm btn-primary me-2"
                                    onClick={() => onEdit(match)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => onDelete(match._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function Modal({ activeTab, formData, editingItem, onClose, onSubmit, onChange }) {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h3>{editingItem ? 'Edit' : 'Add'} {activeTab.slice(0, -1)}</h3>
                <form onSubmit={onSubmit}>
                    {activeTab === 'players' && (
                        <>
                            <input
                                type="text"
                                name="name"
                                className="form-control mb-2"
                                placeholder="Player Name"
                                value={formData.name || ''}
                                onChange={onChange}
                                required
                            />
                            <input
                                type="text"
                                name="team"
                                className="form-control mb-2"
                                placeholder="Team"
                                value={formData.team || ''}
                                onChange={onChange}
                                required
                            />
                            <select
                                name="role"
                                className="form-control mb-2"
                                value={formData.role || ''}
                                onChange={onChange}
                                required
                            >
                                <option value="">Select Role</option>
                                <option value="Batsman">Batsman</option>
                                <option value="Bowler">Bowler</option>
                                <option value="All-rounder">All-rounder</option>
                                <option value="Wicket-keeper">Wicket-keeper</option>
                            </select>
                            <input
                                type="text"
                                name="battingStyle"
                                className="form-control mb-2"
                                placeholder="Batting Style (e.g., Right-hand bat)"
                                value={formData.battingStyle || ''}
                                onChange={onChange}
                            />
                            <input
                                type="text"
                                name="bowlingStyle"
                                className="form-control mb-2"
                                placeholder="Bowling Style (e.g., Right-arm fast)"
                                value={formData.bowlingStyle || ''}
                                onChange={onChange}
                            />
                            <input
                                type="number"
                                name="matches"
                                className="form-control mb-2"
                                placeholder="Matches"
                                value={formData.matches || 0}
                                onChange={onChange}
                            />
                            <input
                                type="number"
                                name="runs"
                                className="form-control mb-2"
                                placeholder="Runs"
                                value={formData.runs || 0}
                                onChange={onChange}
                            />
                            <input
                                type="number"
                                name="wickets"
                                className="form-control mb-2"
                                placeholder="Wickets"
                                value={formData.wickets || 0}
                                onChange={onChange}
                            />
                            <input
                                type="text"
                                name="image"
                                className="form-control mb-2"
                                placeholder="Image URL (optional)"
                                value={formData.image || ''}
                                onChange={onChange}
                            />
                        </>
                    )}

                    {activeTab === 'teams' && (
                        <>
                            <input
                                type="text"
                                name="name"
                                className="form-control mb-2"
                                placeholder="Team Name"
                                value={formData.name || ''}
                                onChange={onChange}
                                required
                            />
                            <input
                                type="number"
                                name="ranking"
                                className="form-control mb-2"
                                placeholder="Ranking"
                                value={formData.ranking || ''}
                                onChange={onChange}
                                required
                            />
                            <input
                                type="number"
                                name="points"
                                className="form-control mb-2"
                                placeholder="Points"
                                value={formData.points || 0}
                                onChange={onChange}
                            />
                            <input
                                type="number"
                                name="wins"
                                className="form-control mb-2"
                                placeholder="Wins"
                                value={formData.wins || 0}
                                onChange={onChange}
                            />
                            <input
                                type="number"
                                name="losses"
                                className="form-control mb-2"
                                placeholder="Losses"
                                value={formData.losses || 0}
                                onChange={onChange}
                            />
                            <input
                                type="text"
                                name="flag"
                                className="form-control mb-2"
                                placeholder="Flag Emoji (optional)"
                                value={formData.flag || ''}
                                onChange={onChange}
                            />
                        </>
                    )}

                    {activeTab === 'matches' && (
                        <>
                            <input
                                type="text"
                                name="team1"
                                className="form-control mb-2"
                                placeholder="Team 1"
                                value={formData.team1 || ''}
                                onChange={onChange}
                                required
                            />
                            <input
                                type="text"
                                name="team2"
                                className="form-control mb-2"
                                placeholder="Team 2"
                                value={formData.team2 || ''}
                                onChange={onChange}
                                required
                            />
                            <input
                                type="text"
                                name="venue"
                                className="form-control mb-2"
                                placeholder="Venue"
                                value={formData.venue || ''}
                                onChange={onChange}
                                required
                            />
                            <input
                                type="date"
                                name="date"
                                className="form-control mb-2"
                                value={formData.date ? formData.date.split('T')[0] : ''}
                                onChange={onChange}
                                required
                            />
                            <input
                                type="time"
                                name="time"
                                className="form-control mb-2"
                                placeholder="Time"
                                value={formData.time || ''}
                                onChange={onChange}
                            />
                            <select
                                name="status"
                                className="form-control mb-2"
                                value={formData.status || 'upcoming'}
                                onChange={onChange}
                                required
                            >
                                <option value="upcoming">Upcoming</option>
                                <option value="live">Live</option>
                                <option value="completed">Completed</option>
                            </select>
                            <input
                                type="text"
                                name="result"
                                className="form-control mb-2"
                                placeholder="Result (optional)"
                                value={formData.result || ''}
                                onChange={onChange}
                            />
                        </>
                    )}

                    <div className="modal-actions">
                        <button type="submit" className="btn btn-primary">
                            {editingItem ? 'Update' : 'Add'}
                        </button>
                        <button type="button" className="btn btn-secondary" onClick={onClose}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AdminPanel;