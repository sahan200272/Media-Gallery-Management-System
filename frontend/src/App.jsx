import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddMedia from './components/Add_Media_Form';
import MediaGallery from './pages/media_gallery';

function App() {
  
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MediaGallery />} />
        <Route path="/add-media" element={<AddMedia />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
