import axios from "axios";
import { useState } from "react";

export default function LoginUser() {

    const VITE_BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async(e)=>{

        e.preventDefault();

        const data = {
            "email": email,
            "password": password
        }

        try {
            const response = await axios.post(`${VITE_BACKEND_API_URL}/user/login`, data);
            alert(response.data.message);

        } catch (error) {
            if (error.response) {
                // Server responded with error status
                alert(error.response.data.message || "Login failed");
                console.error("Error:", error.response.data);
            } else {
                // Network or other error
                alert("Login failed. Please try again.");
                console.error("Error:", error.message);
            }
        }

    }

  return (
    <div>
      <form onSubmit={handleSubmit}>

        <label>Enter email : </label><br></br>
        <input 
            type="text"
            placeholder="Enter email here"
            onChange={(e) => setEmail(e.target.value)}
            required    
        ></input><br></br><br></br>

        <label>Enter password : </label><br></br>
        <input 
            type="text"
            placeholder="enter password"
            onChange={(e) => setPassword(e.target.value)}
            required    
        ></input><br></br><br></br>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
