import { useState } from "react";
import { NavLink, useNavigate} from "react-router-dom";
import "./Register.css";
function Register() {
    
    const navigate = useNavigate();

    const [user, setUser] = useState({
        username: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        role: "client"
    });

    const handleInputs = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setUser({ ...user, [name]: value });
    };

    const postData = async(e) => {
        e.preventDefault();

        const { username, email, phoneNumber, password,confirmPassword, role } = user;

        if (password !== confirmPassword) {
            window.alert('Passwords do not match');
            return;
        }
    
        try {

        const res = await fetch('/userRegister', {
            method: 'POST',
            headers : {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username, email,phoneNumber, password, role
            })
        });

        const data = await res.json();
        console.log(res);

        if (res.status === 201){
            localStorage.setItem('access_token', data.access_token);
            window.alert('Registration successful');
            navigate('/login');
        } else {
            window.alert('Registration failed');
        }
    } catch (error) {
        console.error('Error:', error);
        window.alert('An error occurred. Please try again.');
    }
    };

    return (
       <div className="bodyReg">
           <div className="container">
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="form-container">
                <h1>Welcome to Petopia</h1>
                <form method="POST">
                    <div className="form-group">
                        <label htmlFor="username">User Name</label>
                        <input type="text" className="form-control" id="username" name="username" placeholder="Enter Username" value={user.username} onChange={handleInputs} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control" id="email" name="email" placeholder="Enter Email" value={user.email} onChange={handleInputs} />
                    </div>
                    <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="text"
                className="form-control"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Enter Phone Number"
                value={user.phoneNumber}
                onChange={handleInputs}
              />
            </div>
                    
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password" name="password"  placeholder="Enter Password" value={user.password} onChange={handleInputs}/>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" value={user.confirmPassword} onChange={handleInputs}/>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="role">Role</label>
                        <select className="form-control" id="role" name="role" value={user.role} onChange={handleInputs}>
                            <option value="client">Client</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    
                    <span className="register-span">Already Registered? <NavLink to='/login'>Log in</NavLink><br /> <br /></span>
                    <button type="submit" className="btn btn-primary" id="register" name="register" onClick={postData}>Register</button>
                </form>
            </div>
        </div>
       </div>
    );
}

export default Register;
