import React,{useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminRegister = () => {

    const navigate = useNavigate()

    const [first_name, setFirst_name] = useState('')
    const [last_name, setLast_name] = useState('')
    const [middle_name, setMiddle_name] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordCheck, setPasswordCheck] = useState('')

    const adminRegBtn = async (e) => {
        e.preventDefault()

        const formData = {
            first_name,
            middle_name,
            last_name,
            username,
            email,
            password,
            passwordCheck
        }

        await axios.post('http://localhost:4000/api/adminReg',formData)
        .then(res => navigate('/AdminLogin'))
    }

    return (
        <React.Fragment>
            <div>
            <img className="wave" src="assets/img/wave.png" />
            <div className="container">
                <div className="img">
                <img src="assets/img/signup.png" />
                </div>
                <div className="register">
                <form className="login-form" onSubmit={adminRegBtn}>
                    <div className="text-center mb-4 logo">
                    <img src="assets/img/cict-logo.png" alt />
                    </div>
                    <h3 className="h3 text-center mb-3">CREATE YOUR ACCOUNT</h3>
                    <div className="input-div one">
                    <div className="i">
                        <i className="ti-user" />
                    </div>
                    <div className="div">
                        <input type="text" className="input" onChange={(e) => setFirst_name(e.target.value)} value={first_name} placeholder="First name" required />
                    </div>
                    </div>
                    <div className="input-div one">
                    <div className="i">
                        <i className="ti-user" />
                    </div>
                    <div className="div">
                        <input type="text" className="input" onChange={(e) => setMiddle_name(e.target.value)} value={middle_name} placeholder="Middle name (Not required)" />
                    </div>
                    </div>
                    <div className="input-div one">
                    <div className="i">
                        <i className="ti-user" />
                    </div>
                    <div className="div">
                        <input type="text" className="input" onChange={(e) => setLast_name(e.target.value)} value={last_name} placeholder="Last name" required />
                    </div>
                    </div>
                    <div className="input-div one">
                    <div className="i">
                        <i className="ti-user" />
                    </div>
                    <div className="div">
                        <input type="text" className="input" onChange={(e) => setUsername(e.target.value)} value={username} placeholder="Username" required />
                    </div>
                    </div>
                    <div className="input-div one">
                    <div className="i">
                        <i className="ti-email" />
                    </div>
                    <div className="div">
                        <input type="email" className="input" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Email" required />
                    </div>
                    </div>
                    <div className="input-div pass">
                    <div className="i"> 
                        <i className="ti-lock" />
                    </div>
                    <div className="div">
                        <input type="password" className="input" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Password" required />
                    </div>
                    </div>
                    <div className="input-div pass">
                    <div className="i"> 
                        <i className="ti-lock" />
                    </div>
                    <div className="div">
                        <input type="password" className="input" onChange={(e) => setPasswordCheck(e.target.value)} value={passwordCheck} placeholder="Confirm password" required />
                    </div>
                    </div>
                    <input type="submit" className="btn-login" defaultValue="Sign up" />
                </form>
                </div>
            </div>
            </div>
        </React.Fragment>
    );
}

export default AdminRegister;
