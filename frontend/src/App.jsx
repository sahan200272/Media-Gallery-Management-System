import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddMedia from './components/Add_Media_Form';
import MediaGallery from './pages/media_gallery';
import RegisterUser from './components/Register_User_Form';
import VerifyOTP from './components/Otp_Verification';
import UserProfile from './pages/User_Profile';
import LoginUser from './components/Login_User_Form';
import ContactForm from './components/Contact_Form';
import EditContact from './components/Edit_Contact_Form';
import GetAllContacts from './pages/All_Contacts';

function App() {
  
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<RegisterUser />}/>
        <Route path='/login' element={<LoginUser />}/>
        <Route path='/verify-user' element={<VerifyOTP/>}/>
        <Route path="/gallery" element={<MediaGallery />} />
        <Route path="/add-media" element={<AddMedia />} />
        <Route path='/profile' element={<UserProfile/>}/>
        <Route path='/contact' element={<ContactForm/>}/>
        <Route path='/contact/edit' element={<EditContact/>}/>
        <Route path='/contact/get-all' element={<GetAllContacts/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
