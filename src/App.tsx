import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Media from './pages/Media';
import Departments from './pages/Departments';
import Resources from './pages/Resources';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="media" element={<Media />} />
            <Route path="departments" element={<Departments />} />
            <Route path="resources" element={<Resources />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
