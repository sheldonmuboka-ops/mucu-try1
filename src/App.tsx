import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import AdminRoute from './components/AdminRoute';
import Home from './pages/Home';
import About from './pages/About';
import Media from './pages/Media';
import Departments from './pages/Departments';
import Resources from './pages/Resources';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/admin/AdminDashboard';
import DepartmentManagement from './pages/admin/DepartmentManagement';
import MediaManagement from './pages/admin/MediaManagement';
import ResourceManagement from './pages/admin/ResourceManagement';
import EventManagement from './pages/admin/EventManagement';
import EmailBroadcast from './pages/admin/EmailBroadcast';

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
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          >
            <Route path="departments" element={<DepartmentManagement />} />
            <Route path="media" element={<MediaManagement />} />
            <Route path="resources" element={<ResourceManagement />} />
            <Route path="events" element={<EventManagement />} />
            <Route path="broadcast" element={<EmailBroadcast />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
