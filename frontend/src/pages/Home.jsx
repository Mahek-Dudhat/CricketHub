import { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';
import Footer from '../components/Footer';
import API_URL from '../config';

function Home() {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMatches();
    }, []);

    const fetchMatches = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/matches`);
            setMatches(response.data);
            console.log(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching matches:', error);
            setLoading(false);
        }
    };

    const liveMatches = matches.filter(m => m.status === 'live');
    const upcomingMatches = matches.filter(m => m.status === 'upcoming');

    if (loading) {
        return <div className="container mt-5 text-center">Loading...</div>;
    }

    return (
        <div className="home-container">
            <div className="hero-section">
                <div className="container">
                    <h1 className="display-4">Welcome to Cricket Info</h1>
                    <p className="lead">Your one-stop destination for cricket updates</p>
                </div>
            </div>

            <div className="container mt-5">
                {liveMatches.length > 0 && (
                    <section className="mb-5">
                        <h2 className="section-title">
                            <span className="live-indicator" id="lm"></span> Live Matches
                        </h2>
                        <div className="row">
                            {liveMatches.map(match => (
                                <div key={match._id} className="col-md-6 mb-4">
                                    <div className="match-card live-match">
                                        <div className="match-status">LIVE</div>
                                        <div className="match-teams">
                                            <div className="team">
                                                <h4>{match.team1}</h4>
                                            </div>
                                            <div className="vs">VS</div>
                                            <div className="team">
                                                <h4>{match.team2}</h4>
                                            </div>
                                        </div>
                                        <div className="match-info">
                                            <p><i className="fas fa-map-marker-alt"></i> {match.venue}</p>
                                            <p><i className="fas fa-calendar"></i> {new Date(match.date).toLocaleDateString()}</p>
                                            {match.time && <p><i className="fas fa-clock"></i> {match.time}</p>}
                                        </div>
                                        {match.result && <div className="match-result">{match.result}</div>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                <section>
                    <h2 className="section-title" id='um'>Upcoming Matches</h2>
                    {upcomingMatches.length === 0 ? (
                        <p className="text-center text-muted">No upcoming matches scheduled</p>
                    ) : (
                        <div className="row">
                            {upcomingMatches.map(match => (
                                <div key={match._id} className="col-md-6 mb-4">
                                    <div className="match-card">
                                        <div className="match-teams">
                                            <div className="team">
                                                <h4>{match.team1}</h4>
                                            </div>
                                            <div className="vs">VS</div>
                                            <div className="team">
                                                <h4>{match.team2}</h4>
                                            </div>
                                        </div>
                                        <div className="match-info">
                                            <p><i className="fas fa-map-marker-alt"></i> {match.venue}</p>
                                            <p><i className="fas fa-calendar"></i> {new Date(match.date).toLocaleDateString()}</p>
                                            {match.time && <p><i className="fas fa-clock"></i> {match.time}</p>}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>


        </div>
    );
}

export default Home;