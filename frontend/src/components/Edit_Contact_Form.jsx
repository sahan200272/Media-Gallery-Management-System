import axios from "axios";
import { useState } from "react"

export default function EditContact(){

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const fetchContact = async (req, res) => {

    }

    const handleSubmit = async(req, res) => {

        e.preventDefault();

        try {
            const contactData = {
            "name": name,
            "email" : email,
            "message" : message
            }

            const response = await axios.post(`${VITE_BACKEND_API_URL}/contacts/update`, contactData);

            if(response.status == 200){
                alert(response.data.message);
            }

        } catch (error) {
            console.error(error.message);
            alert(response.data.message);
        }

    }

    return(
        <div>
            <h1>Edit Contact</h1>

            <form onSubmit={handleSubmit}>

                <label>Name : </label>
                <input 
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                ></input>

                <label>Email : </label>
                <input 
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                ></input>

                <label>Message : </label>
                <input 
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                ></input>

                <button type="submit">Update</button>
            </form>
        </div>
    )
}