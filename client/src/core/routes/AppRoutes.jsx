import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from '../../pages/home/Home';
import CenterForm from '../../pages/center/center-form/CenterForm';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/createNewCenter" element={<CenterForm />} />
      </Routes>
    </BrowserRouter>
  )
}
