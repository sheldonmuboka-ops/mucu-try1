import { useState, useEffect } from 'react';
import { Globe, ExternalLink } from 'lucide-react';
import { departmentService } from '../services/departmentService';
import { DepartmentsDto } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

export default function Departments() {
  const [departments, setDepartments] = useState<DepartmentsDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const data = await departmentService.getAllDepartments();
      setDepartments(data);
    } catch (err) {
      setError('Failed to load departments');
    } finally {
      setIsLoading(false);
    }
  };

  const teams = [
    { name: 'Coast', description: 'Reaching students from the coastal region with the gospel and building a strong coastal community' },
    { name: 'Ukambani', description: 'Ministering to students from the Ukambani region, fostering fellowship and spiritual growth' },
    { name: 'North-Rift', description: 'Serving students from North Rift with targeted outreach and discipleship programs' },
    { name: 'South-Rift', description: 'Building relationships and sharing Christ with students from the South Rift region' },
    { name: 'Western', description: 'Connecting with students from Western Kenya through culturally relevant ministry approaches' },
    { name: 'Nyanza', description: 'Empowering students from Nyanza region to live out their faith boldly on campus' },
    { name: 'Central', description: 'Creating a vibrant community for students from Central Kenya to grow in their faith' },
    { name: 'Nairobi', description: 'Engaging with students from Nairobi with dynamic worship and fellowship opportunities' },
  ];

  return (
    <div className="bg-dark-bg">
      <section className="relative py-32 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-80"></div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Departments & Teams</h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8">
            Organized for Impact, United in Purpose
          </p>
          <p className="text-white/70 italic">2 Timothy 2:20-21</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="section-title">Ministry Departments</h2>
          {isLoading ? (
            <LoadingSpinner />
          ) : error ? (
            <ErrorMessage message={error} />
          ) : departments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {departments.map((dept) => (
                <div key={dept.id} className="card group hover:bg-gradient-card">
                  {dept.thumbnail && (
                    <img
                      src={dept.thumbnail}
                      alt={dept.departmentName}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  )}
                  <h3 className="text-2xl font-bold mb-3 text-white">{dept.departmentName}</h3>
                  <p className="text-white/70 mb-4">{dept.departmentDescription}</p>
                  {dept.departmentLocation && (
                    <p className="text-white/60 text-sm mb-3">📍 {dept.departmentLocation}</p>
                  )}
                  <div className="flex gap-3 mt-4">
                    {dept.groupUrl && (
                      <a
                        href={dept.groupUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-accent hover:bg-accent-hover text-white px-4 py-2 rounded-lg text-center transition-colors flex items-center justify-center gap-2"
                      >
                        <ExternalLink size={16} />
                        Join Group
                      </a>
                    )}
                    {dept.registrationUrl && (
                      <a
                        href={dept.registrationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-center transition-colors"
                      >
                        Register
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-white/70">No departments available at the moment.</p>
          )}
        </div>
      </section>

      <section className="py-20 bg-dark-section">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="section-title">Evangelistic Teams</h2>
          <p className="text-center text-white/70 max-w-3xl mx-auto mb-12">
            Our regional teams ensure every student finds a home away from home, connecting with others
            from their region while building a diverse, united community in Christ.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teams.map((team, index) => (
              <div key={index} className="card text-center group hover:scale-105 transition-transform">
                <div className="w-20 h-20 rounded-full bg-gradient-card mx-auto mb-4 flex items-center justify-center">
                  <Globe className="text-accent" size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-accent transition-colors">
                  {team.name}
                </h3>
                <p className="text-white/70 text-sm">{team.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
