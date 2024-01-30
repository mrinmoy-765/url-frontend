import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import AuthUser from './AuthUser';

export default function Register() {
    const navigate = useNavigate();
    const { http, setToken } = AuthUser();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const submitForm = () => {
        // api call
        http.post('/register', { email: email, password: password, name: name })
            .then((res) => {
                navigate('/login');
            })
            .catch((error) => {
                if (error.response && error.response.data) {
                    // If the server returns validation errors
                    setError(error.response.data.message);
                } else {
                    // If there's any other type of error
                    setError('Registration failed. Please try again.');
                }
            });
    }

    return (
        <div className="row justify-content-left pt-5">
            <div className="col-sm-6">
                <div className="card p-4">
                    <h1 className="text-center mb-3">Register</h1>

                    {error && (
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    )}

                    <div className="form-group">
                        <label>Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter name"
                            onChange={e => setName(e.target.value)}
                        />
                    </div>

                    <div className="form-group mt-3">
                        <label>Email address:</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter email"
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="form-group mt-3">
                        <label>Password:</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="button"
                        onClick={submitForm}
                        className="btn btn-primary mt-4"
                    >
                        Register
                    </button>
                </div>
            </div>
        </div>
    )
}
