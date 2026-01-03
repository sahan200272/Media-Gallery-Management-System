import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddMedia from './components/Add_Media_Form';
import MediaGallery from './pages/media_gallery';
import RegisterUser from './components/Register_User_Form';
import VerifyOTP from './components/Otp_Verification';

function App() {
  
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MediaGallery />} />
        <Route path="/add-media" element={<AddMedia />} />
        <Route path='/register' element={<RegisterUser />}/>
        <Route path='/verify-user' element={<VerifyOTP/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
