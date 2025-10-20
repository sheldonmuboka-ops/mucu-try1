import { useState, useEffect } from 'react';
import { Image, Video, BookOpen, Clock, Calendar } from 'lucide-react';
import { mediaService } from '../services/mediaService';
import { MediaDto } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

export default function Media() {
  const [media, setMedia] = useState<MediaDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const data = await mediaService.getAllMedia();
      setMedia(data);
    } catch (err) {
      setError('Failed to load media');
    } finally {
      setIsLoading(false);
    }
  };
  const mediaCategories = [
    {
      icon: Image,
      title: 'Photo Gallery',
      description: 'Memories from our fellowship and events',
      count: '500+ Photos',
    },
    {
      icon: Video,
      title: 'CU Preachings',
      description: 'Inspiring sermons and teachings',
      count: '100+ Videos',
    },
    {
      icon: BookOpen,
      title: 'E-Library',
      description: 'Digital resources and study materials',
      count: '200+ Resources',
    },
  ];

  const schedule = [
    {
      day: 'Tuesday',
      event: 'Bible Study',
      time: '6:30 PM - 8:00 PM',
      description: 'Deep dive into God\'s word with fellowship',
    },
    {
      day: 'Sunday',
      event: 'Worship Service',
      time: '8:00 AM - 10:00 AM',
      description: 'Join us for praise, worship, and the Word',
    },
    {
      day: 'Thursday',
      event: 'Prayer Meeting',
      time: '5:00 PM - 6:00 PM',
      description: 'Corporate prayer and intercession',
    },
  ];

  const galleryImages = [
    'Fellowship moments',
    'Worship session',
    'CU Retreat 2024',
    'Community outreach',
    'Bible study group',
    'Leadership team',
    'Campus evangelism',
    'Youth conference',
  ];

  return (
    <div className="bg-dark-bg">
      <section className="relative py-32 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-80"></div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Media & Resources</h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8">
            Explore our collection of inspiring content that documents God's faithfulness in ministry
          </p>
          <p className="text-white/70 italic">Romans 16:22</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button className="btn-primary">REGISTER</button>
            <button className="btn-secondary">LOGIN</button>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="section-title">Media Sources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mediaCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <div
                  key={index}
                  className="card group hover:scale-105 transition-transform cursor-pointer"
                >
                  <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-4 group-hover:bg-accent transition-colors">
                    <Icon className="text-accent group-hover:text-white" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-accent transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-white/70 mb-3">{category.description}</p>
                  <p className="text-accent font-semibold">{category.count}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-dark-section">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="section-title">Photo Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="aspect-square rounded-lg bg-gradient-card flex items-center justify-center text-center p-6 hover:scale-105 transition-transform cursor-pointer"
              >
                <div>
                  <Image className="text-accent mx-auto mb-2" size={40} />
                  <p className="text-white/80 text-sm">{image}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="section-title">Live Schedule</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {schedule.map((item, index) => (
              <div key={index} className="card hover:bg-gradient-card transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="text-accent" size={24} />
                  <span className="text-accent font-bold text-lg">{item.day}</span>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">{item.event}</h3>
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="text-white/70" size={20} />
                  <span className="text-white/70">{item.time}</span>
                </div>
                <p className="text-white/70">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-dark-section">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="section-title">Contact Information</h2>
          <div className="max-w-2xl mx-auto card">
            <p className="text-white/80 mb-6">
              Have questions or want to learn more about our ministry? We'd love to hear from you!
            </p>
            <div className="space-y-4 text-left">
              <div className="flex items-start gap-3">
                <span className="text-accent font-semibold min-w-[100px]">WhatsApp:</span>
                <span className="text-white/70">+254 700 000 000</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-accent font-semibold min-w-[100px]">Phone:</span>
                <span className="text-white/70">+254 700 000 000</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-accent font-semibold min-w-[100px]">Email:</span>
                <span className="text-white/70">info@mucu.ac.ke</span>
              </div>
            </div>
            <button className="btn-primary mt-8">Send Message</button>
          </div>
        </div>
      </section>
    </div>
  );
}
