import { BookOpen, Users, Award, Target } from 'lucide-react';

export default function About() {
  const values = [
    {
      icon: BookOpen,
      title: 'Faith-Centered',
      description: 'Building our foundation on biblical principles and Christ-centered living',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Creating meaningful connections and lasting friendships in Christ',
    },
    {
      icon: Award,
      title: 'Academic Excellence',
      description: 'Pursuing excellence in studies while maintaining spiritual growth',
    },
    {
      icon: Target,
      title: 'Purpose-driven',
      description: 'Helping students discover and fulfill their God-given calling',
    },
  ];

  const leaders = [
    {
      name: 'Prince Kingstone',
      position: 'Chairperson',
    },
    {
      name: 'Shadrack Otieno',
      position: 'Vice Chairperson',
    },
    {
      name: 'Faith Wanjiku',
      position: 'Secretary',
    },
    {
      name: 'John Kamau',
      position: 'Treasurer',
    },
    {
      name: 'Mary Achieng',
      position: 'Worship Leader',
    },
    {
      name: 'Daniel Koech',
      position: 'Missions Coordinator',
    },
    {
      name: 'Ruth Njeri',
      position: 'Outreach Director',
    },
    {
      name: 'Samuel Omondi',
      position: 'Technical Lead',
    },
  ];

  return (
    <div className="bg-dark-bg">
      <section className="relative py-32 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-80"></div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">OUR HISTORY AS MUCU Main Campus</h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            Founded on the belief that faith and education can transform lives
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-title">Our Story</h2>
            <div className="text-white/80 leading-relaxed space-y-4 text-lg">
              <p>
                Moi University Christian Union (MUCU) was established over two decades ago with a simple yet powerful
                vision: to create a spiritual home for university students seeking to grow in their faith while pursuing
                academic excellence.
              </p>
              <p>
                What started as a small group of committed believers has grown into a vibrant community of over 1,000
                weekly attendees, impacting lives across multiple campuses and beyond. Our journey has been marked by
                God's faithfulness, transformative experiences, and countless testimonies of changed lives.
              </p>
              <p>
                Today, MUCU stands as a beacon of hope and spiritual growth, offering students a supportive community
                where they can explore their faith, develop leadership skills, and make lasting friendships that extend
                far beyond their university years.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-dark-section">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="section-title">Our Mission</h2>
          <div className="card max-w-4xl mx-auto text-center">
            <p className="text-xl text-white/90 leading-relaxed">
              To create a vibrant Christian community where African university students can grow spiritually,
              excel academically, and discover their God-given purpose. We are committed to nurturing holistic
              development through worship, discipleship, fellowship, and service.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="section-title">Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="card text-center group hover:bg-gradient-card"
                >
                  <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent transition-colors">
                    <Icon className="text-accent group-hover:text-white" size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">{value.title}</h3>
                  <p className="text-white/70">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-dark-section">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="section-title">Leadership Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {leaders.map((leader, index) => (
              <div
                key={index}
                className="card text-center group hover:scale-105 transition-transform"
              >
                <div className="w-24 h-24 rounded-full bg-gradient-card mx-auto mb-4 flex items-center justify-center">
                  <Users className="text-accent" size={40} />
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{leader.name}</h3>
                <p className="text-accent text-sm">{leader.position}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="section-title">Get Involved</h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
            Whether you're looking for spiritual growth, meaningful friendships, or opportunities to serve,
            MUCU welcomes you with open arms. Join us and be part of a community that transforms lives.
          </p>
          <button className="btn-primary">Contact Us</button>
        </div>
      </section>
    </div>
  );
}
