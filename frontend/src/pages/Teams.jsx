import { useState, useEffect } from 'react';
import axios from 'axios';
import './Teams.css';
import Footer from '../components/Footer';

function Teams() {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTeams();
    }, []);

    const fetchTeams = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/teams');
            setTeams(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching teams:', error);
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="container mt-5 text-center">Loading...</div>;
    }

    return (
        <div className="teams-container">
            <h2 className="page-title mb-4">ICC Team Rankings</h2>

            {teams.length === 0 ? (
                <p className="text-center text-muted">No teams available</p>
            ) : (
                <div className="table-responsive">
                    <table className="table table-hover rankings-table">
                        <thead className="table-dark">
                            <tr>
                                <th>Rank</th>
                                <th>Team</th>
                                <th>Points</th>
                                <th>Wins</th>
                                <th>Losses</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teams.map((team) => (
                                <tr key={team._id}>
                                    <td className="rank-cell">
                                        <span className="rank-badge">{team.ranking}</span>
                                    </td>
                                    <td className="team-cell">
                                        {team.flag && <span className="team-flag">{team.flag}</span>}
                                        <strong>{team.name}</strong>
                                    </td>
                                    <td>{team.points}</td>
                                    <td className="text-success">{team.wins}</td>
                                    <td className="text-danger">{team.losses}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
             
        </div>

       
       
    );
}

export default Teams;