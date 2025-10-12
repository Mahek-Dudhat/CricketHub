import { useState, useEffect } from 'react';
import axios from 'axios';
import './Players.css';
import Footer from '../components/Footer';
import API_URL from '../config';

function Players() {
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchPlayers();
    }, []);

    const fetchPlayers = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/players`);
            setPlayers(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching players:', error);
            setLoading(false);
        }
    };

    const filteredPlayers = players.filter(player =>
        player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        player.team.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <div className="container mt-5 text-center">Loading...</div>;
    }

    return (
        <div className="players-container">
            <h2 className="page-title mb-4">Cricket Players</h2>

            <div className="search-box mb-4">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search players by name or team..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {filteredPlayers.length === 0 ? (
                <p className="text-center text-muted">No players found</p>
            ) : (
                <div className="row">
                    {filteredPlayers.map((player) => (
                        <div key={player._id} className="col-md-4 col-lg-3 mb-4">
                            <div className="player-card">
                                <div className="player-image">
                                    {player.image ? (
                                        <img src={player.image} alt={player.name} />
                                    ) : (
                                        <div className="player-placeholder">
                                            <i className="fas fa-user"></i>
                                        </div>
                                    )}
                                </div>
                                <div className="player-info">
                                    <h5 className="player-name">{player.name}</h5>
                                    <p className="player-team">{player.team}</p>
                                    <span className="player-role">{player.role}</span>
                                    <div className="player-stats">
                                        <div className="stat">
                                            <span className="stat-label">Matches</span>
                                            <span className="stat-value">{player.matches}</span>
                                        </div>
                                        <div className="stat">
                                            <span className="stat-label">Runs</span>
                                            <span className="stat-value">{player.runs}</span>
                                        </div>
                                        <div className="stat">
                                            <span className="stat-label">Wickets</span>
                                            <span className="stat-value">{player.wickets}</span>
                                        </div>
                                    </div>
                                    {player.battingStyle && (
                                        <p className="player-detail"><small>Batting: {player.battingStyle}</small></p>
                                    )}
                                    {player.bowlingStyle && (
                                        <p className="player-detail"><small>Bowling: {player.bowlingStyle}</small></p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            
        </div>
    );
}

export default Players;