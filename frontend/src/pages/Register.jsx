import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';
import API_URL from '../config';

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

        if(!formData.email.includes('/^[^\s@]+@[^\s@]+\.[^\s@]+$/')){
            setErrors((prev) => ({ ...prev, email: 'Invalid email format' }));
        }else{
            setErrors((prev) => ({ ...prev, email: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const errors = {};

        if (formData.name.trim() === '') {
            setErrors((prev) => ({ ...prev, name: 'Name is required' }));
           
        }

        if (formData.email.trim() === '') {
             setErrors((prev) => ({ ...prev, email: 'email is required' }));
          
        }
        if (formData.password.trim() === '') {
            setErrors((prev) => ({ ...prev, password: 'password is required' }));
           
        }
        if (formData.confirmPassword.trim() === '') {
            setErrors((prev) => ({ ...prev, confirmPassword: 'confirmpassword is required' }));
             return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        console.log(errors);

        setErrors(errors);

        try {
            await axios.post(`${API_URL}/api/auth/register`, {
                name: formData.name,
                email: formData.email,
                password: formData.password
            });
            setSuccess('Registration successful! Redirecting to login...');
            setTimeout(() => navigate('/login'), 2000);
        } catch (error) {
            setError(error.response?.data?.message || 'Registration failed');
        }
    };

    console.log(errors);

    return (
        <div className="auth-container">
            <div className="auth-card mt-5">
                <h2 className="text-center mb-4">Register</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}

                        />
                        {errors?.name && <p className="text-danger">{errors?.name}</p>}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}

                        />

                        {errors?.email && <p className="text-danger">{errors?.email}</p>}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}

                        />
                        {errors?.password && <p className="text-danger">{errors?.password}</p>}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Confirm Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}

                        />
                        {errors?.confirmPassword && <p className="text-danger">{errors?.confirmPassword}</p>}
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Register</button>
                </form>
                <p className="text-center mt-3">
                    Already have an account? <Link to="/login">Login here</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;