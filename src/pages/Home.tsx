import { useState, useEffect } from 'react';
import { Calendar, Users, Heart, BookOpen, Award, TrendingUp } from 'lucide-react';
import { eventService } from '../services/eventService';
import { EventsDto } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

export default function Home() {
  const [events, setEvents] = useState<EventsDto[]>([]);
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);
  const [eventsError, setEventsError] = useState('');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const data = await eventService.getAllEvents();
      setEvents(data.slice(0, 3));
    } catch (error) {
      setEventsError('Failed to load events');
    } finally {
      setIsLoadingEvents(false);
    }
  };

  const activities = [
    {
      icon: Heart,
      title: 'Weekly Worship',
      description: 'Inspiring worship services every Sunday morning',
    },
    {
      icon: BookOpen,
      title: 'Bible Study',
      description: 'Deep dive into God\'s word every Tuesday evening',
    },
    {
      icon: Users,
      title: 'Community Service',
      description: 'Making a difference in our local community',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Mwangi',
      role: 'Student Leader',
      text: 'MUCU has been a transformative experience for me. The community here has helped me grow both spiritually and academically.',
    },
    {
      name: 'David Kipchoge',
      role: 'Member',
      text: 'Finding MUCU was the best decision I made at university. The fellowship and support have been incredible.',
    },
    {
      name: 'Grace Akinyi',
      role: 'Worship Team',
      text: 'Through MUCU, I\'ve discovered my purpose and passion for serving God. The ministry opportunities are endless.',
    },
  ];

  const stats = [
    { label: 'Campus transitions', value: '100%', icon: TrendingUp },
    { label: 'Weekly attendees', value: '1000+', icon: Users },
    { label: 'Local Collaborators', value: '20+', icon: Heart },
    { label: 'Ministries', value: '10+', icon: BookOpen },
    { label: 'Years of Service', value: '20+', icon: Award },
  ];

  return (
    <div className="bg-dark-bg">
      <section className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-90"></div>
        <div className="absolute inset-0 bg-pattern opacity-5"></div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
            Faith Meets Purpose at<br />MOI UNIVERSITY CHRISTIAN UNION
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
            Empowering African Students Through Faith
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary">REGISTER</button>
            <button className="btn-secondary">LOGIN</button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-dark-section">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="section-title">Upcoming Events</h2>
          {isLoadingEvents ? (
            <LoadingSpinner />
          ) : eventsError ? (
            <ErrorMessage message={eventsError} />
          ) : events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="card group hover:scale-105 transition-transform duration-300"
                >
                  {event.thumbnails && (
                    <img
                      src={event.thumbnails}
                      alt={event.eventName}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  )}
                  <div className="flex items-center gap-3 mb-4">
                    <Calendar className="text-accent" size={24} />
                    <span className="text-accent font-semibold">{new Date(event.eventDate).toLocaleDateString()}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-accent transition-colors">
                    {event.eventName}
                  </h3>
                  <p className="text-white/70">{event.eventDescription}</p>
                  {event.eventLocation && (
                    <p className="text-white/50 text-sm mt-2">📍 {event.eventLocation}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-white/70">No upcoming events at the moment.</p>
          )}
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="section-title">Our Mission</h2>
          <p className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed">
            To create a vibrant Christian community where African university students can grow spiritually,
            excel academically, and discover their God-given purpose while making a lasting impact on campus and beyond.
          </p>
        </div>
      </section>

      <section className="py-20 bg-dark-section">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="section-title">Our Activities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {activities.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div
                  key={index}
                  className="card text-center group hover:bg-gradient-card"
                >
                  <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent transition-colors">
                    <Icon className="text-accent group-hover:text-white" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-white">{activity.title}</h3>
                  <p className="text-white/70">{activity.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="section-title">Impact & Reach</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="card text-center">
                  <Icon className="text-accent mx-auto mb-3" size={40} />
                  <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-white/70 text-sm">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-dark-section">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="section-title">Student Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card">
                <div className="text-accent text-5xl mb-4">"</div>
                <p className="text-white/80 mb-6 italic leading-relaxed">{testimonial.text}</p>
                <div className="border-t border-white/10 pt-4">
                  <div className="font-bold text-white">{testimonial.name}</div>
                  <div className="text-accent text-sm">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
