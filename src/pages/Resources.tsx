import { BookOpen, Users, Heart, MessageCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

export default function Resources() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const sermons = [
    {
      icon: Users,
      title: 'Community',
      description: 'Building meaningful relationships and finding your spiritual family on campus',
    },
    {
      icon: Heart,
      title: 'Spiritual Growth',
      description: 'Deepening your relationship with God through prayer, worship, and study',
    },
    {
      icon: MessageCircle,
      title: 'Service',
      description: 'Using your gifts to serve others and make a difference in your community',
    },
    {
      icon: BookOpen,
      title: 'Campus Life',
      description: 'Navigating university life with faith, balance, and purpose',
    },
    {
      icon: Heart,
      title: 'Leadership',
      description: 'Developing Christ-centered leadership skills for campus and beyond',
    },
    {
      icon: Users,
      title: 'Evangelism',
      description: 'Sharing the gospel effectively with your peers and community',
    },
  ];

  const faqs = [
    {
      question: 'What is MUCU?',
      answer: 'MUCU (Moi University Christian Union) is a vibrant community of Christian students dedicated to growing in faith, fellowship, and service. We provide a supportive environment for spiritual growth and academic excellence.',
    },
    {
      question: 'How can I join MUCU?',
      answer: 'Joining MUCU is simple! Attend any of our weekly meetings or events, register through our website, or contact any of our leaders. Everyone is welcome regardless of denomination or spiritual background.',
    },
    {
      question: 'What activities does MUCU organize?',
      answer: 'We organize weekly worship services, Bible studies, prayer meetings, community outreach, leadership training, retreats, conferences, and social events that foster spiritual growth and fellowship.',
    },
    {
      question: 'When and where do you meet?',
      answer: 'We meet every Sunday at 8:00 AM for worship service, Tuesday at 6:30 PM for Bible study, and Thursday at 5:00 PM for prayer meeting. All meetings are held on the main campus.',
    },
    {
      question: 'Is MUCU open to students from all denominations?',
      answer: 'Yes! MUCU welcomes students from all Christian denominations. We focus on what unites us in Christ rather than denominational differences, creating a diverse and inclusive community.',
    },
    {
      question: 'How can I get involved in leadership?',
      answer: 'We offer various leadership opportunities through our departments and teams. Start by attending regularly, join a department that interests you, and speak with current leaders about training and mentorship opportunities.',
    },
    {
      question: 'Are there any membership fees?',
      answer: 'No, membership in MUCU is completely free. However, we welcome voluntary contributions to support our ministry activities, outreach programs, and events.',
    },
    {
      question: 'What support does MUCU offer to members?',
      answer: 'We provide spiritual guidance, counseling, academic support through study groups, welfare assistance in times of need, and a strong community of friends who care about your holistic well-being.',
    },
    {
      question: 'Can I participate if I\'m not a Christian?',
      answer: 'Absolutely! We welcome everyone who wants to explore faith, ask questions, or simply be part of a caring community. MUCU is a safe space to learn about Christianity without pressure.',
    },
    {
      question: 'How can I stay updated with MUCU activities?',
      answer: 'Follow us on our social media platforms, subscribe to our newsletter, join our WhatsApp groups, or check our website regularly for updates on upcoming events and activities.',
    },
  ];

  return (
    <div className="bg-dark-bg">
      <section className="relative py-32 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-80"></div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Resources & Support</h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8">
            Feel the impact of the gospel even in a digital setting
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary">REGISTER</button>
            <button className="btn-secondary">LOGIN</button>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="section-title">Featured Teachings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sermons.map((sermon, index) => {
              const Icon = sermon.icon;
              return (
                <div
                  key={index}
                  className="card group hover:scale-105 transition-transform cursor-pointer"
                >
                  <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-4 group-hover:bg-accent transition-colors">
                    <Icon className="text-accent group-hover:text-white" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-accent transition-colors">
                    {sermon.title}
                  </h3>
                  <p className="text-white/70">{sermon.description}</p>
                  <button className="mt-4 text-accent hover:text-white transition-colors font-semibold flex items-center gap-2">
                    Learn More →
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-dark-section">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="card">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between text-left group"
                >
                  <h3 className="text-lg font-bold text-white group-hover:text-accent transition-colors">
                    {faq.question}
                  </h3>
                  {openFaq === index ? (
                    <ChevronUp className="text-accent flex-shrink-0" size={24} />
                  ) : (
                    <ChevronDown className="text-white/70 flex-shrink-0" size={24} />
                  )}
                </button>
                {openFaq === index && (
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <p className="text-white/70 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="card max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 text-white">Stay Connected</h2>
            <p className="text-white/70 mb-6">
              Subscribe to our newsletter to receive updates on events, teachings, and ministry opportunities.
            </p>
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-lg bg-dark-bg text-white border border-white/20 focus:border-accent focus:outline-none"
              />
              <button type="submit" className="btn-primary">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
