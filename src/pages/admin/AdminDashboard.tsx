import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Image, BookOpen, Calendar, Mail } from 'lucide-react';

export default function AdminDashboard() {
  const location = useLocation();

  const navItems = [
    { path: '/admin/departments', icon: LayoutDashboard, label: 'Departments' },
    { path: '/admin/media', icon: Image, label: 'Media' },
    { path: '/admin/resources', icon: BookOpen, label: 'Resources' },
    { path: '/admin/events', icon: Calendar, label: 'Events' },
    { path: '/admin/broadcast', icon: Mail, label: 'Email Broadcast' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <aside className="w-64 bg-white shadow-lg min-h-screen">
          <div className="p-6 border-b">
            <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
          </div>
          <nav className="p-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
