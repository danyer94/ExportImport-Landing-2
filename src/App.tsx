import React, { useEffect, useRef, useState } from 'react';
import { 
  Globe2, 
  Ship, 
  Plane, 
  TrendingUp, 
  Users, 
  MapPin, 
  ChevronRight, 
  Mail, 
  Phone, 
  MapPin as Location,
  Check,
  ArrowRight
} from 'lucide-react';

function App() {
  const [isVisible, setIsVisible] = useState({
    stats: false,
    services: false,
    testimonials: false,
    caseStudies: false
  });

  const statsRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const caseStudiesRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const globalPresenceRef = useRef<HTMLDivElement>(null);

  // Función para manejar la navegación suave a las secciones
  const scrollToSection = (elementRef: React.RefObject<HTMLDivElement>) => {
    if (elementRef && elementRef.current) {
      elementRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.target === statsRef.current) {
            setIsVisible(prev => ({ ...prev, stats: entry.isIntersecting }));
          } else if (entry.target === servicesRef.current) {
            setIsVisible(prev => ({ ...prev, services: entry.isIntersecting }));
          } else if (entry.target === testimonialsRef.current) {
            setIsVisible(prev => ({ ...prev, testimonials: entry.isIntersecting }));
          } else if (entry.target === caseStudiesRef.current) {
            setIsVisible(prev => ({ ...prev, caseStudies: entry.isIntersecting }));
          }
        });
      },
      { threshold: 0.2 }
    );

    if (statsRef.current) observer.observe(statsRef.current);
    if (servicesRef.current) observer.observe(servicesRef.current);
    if (testimonialsRef.current) observer.observe(testimonialsRef.current);
    if (caseStudiesRef.current) observer.observe(caseStudiesRef.current);

    return () => {
      if (statsRef.current) observer.unobserve(statsRef.current);
      if (servicesRef.current) observer.unobserve(servicesRef.current);
      if (testimonialsRef.current) observer.unobserve(testimonialsRef.current);
      if (caseStudiesRef.current) observer.unobserve(caseStudiesRef.current);
    };
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Real-time validation
    validateField(name, value);
  };

  const validateField = (name: string, value: string) => {
    let error = '';
    
    switch (name) {
      case 'name':
        error = value.trim() === '' ? 'Name is required' : '';
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        error = !emailRegex.test(value) ? 'Valid email is required' : '';
        break;
      case 'company':
        error = value.trim() === '' ? 'Company name is required' : '';
        break;
      case 'message':
        error = value.trim().length < 10 ? 'Message must be at least 10 characters' : '';
        break;
      default:
        break;
    }
    
    setFormErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    Object.keys(formData).forEach(key => {
      validateField(key, formData[key as keyof typeof formData]);
    });
    
    // Check if there are any errors
    const hasErrors = Object.values(formErrors).some(error => error !== '');
    
    if (!hasErrors) {
      // Form submission logic would go here
      alert('Form submitted successfully!');
      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        message: ''
      });
    }
  };

  return (
    <div className="font-sans text-gray-100">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-opacity-90 bg-navy transition-all duration-300 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Globe2 className="text-gold h-8 w-8 mr-2" />
              <span className="text-2xl font-bold text-white">GLOBAL<span className="text-gold">LIFT</span></span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a 
                href="#services" 
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(servicesRef);
                }}
                className="text-white hover:text-gold transition-colors"
              >
                Services
              </a>
              <a 
                href="#global-presence" 
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(globalPresenceRef);
                }}
                className="text-white hover:text-gold transition-colors"
              >
                Global Presence
              </a>
              <a 
                href="#case-studies" 
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(caseStudiesRef);
                }}
                className="text-white hover:text-gold transition-colors"
              >
                Case Studies
              </a>
              <a 
                href="#testimonials" 
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(testimonialsRef);
                }}
                className="text-white hover:text-gold transition-colors"
              >
                Testimonials
              </a>
              <a 
                href="#contact" 
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(contactRef);
                }}
                className="text-white hover:text-gold transition-colors"
              >
                Contact
              </a>
            </div>
            <div>
              <button 
                className="bg-gold text-navy px-6 py-2 rounded-md font-semibold hover:bg-gold-light transition-colors"
                onClick={() => scrollToSection(contactRef)}
              >
                Get a Quote
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-navy overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="world-map-animation"></div>
          <div className="absolute inset-0 bg-navy bg-opacity-70"></div>
        </div>
        <div className="container mx-auto px-6 z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="text-white">Global Solutions for</span>
            <br />
            <span className="text-gold">Premium Import & Export</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-gray-300">
            Connecting businesses worldwide with sophisticated logistics and trade solutions that exceed expectations.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              className="bg-gold text-navy px-8 py-3 rounded-md font-semibold text-lg hover:bg-gold-light transition-all transform hover:scale-105"
              onClick={() => scrollToSection(servicesRef)}
            >
              Explore Our Services
            </button>
            <button 
              className="border-2 border-gold text-gold px-8 py-3 rounded-md font-semibold text-lg hover:bg-gold hover:text-navy transition-all transform hover:scale-105"
              onClick={() => scrollToSection(contactRef)}
            >
              Contact Us
            </button>
          </div>
        </div>
        <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
          <a 
            href="#stats" 
            onClick={(e) => {
              e.preventDefault();
              scrollToSection(statsRef);
            }}
            className="text-gold"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" ref={statsRef} className="py-20 bg-navy-light">
        <div className="container mx-auto px-6">
          <div className={`grid grid-cols-1 md:grid-cols-4 gap-8 transition-all duration-1000 ${isVisible.stats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="bg-navy p-8 rounded-lg shadow-lg text-center transform transition-transform hover:scale-105">
              <div className="text-gold text-5xl font-bold mb-2">25+</div>
              <div className="text-xl text-gray-300">Years of Excellence</div>
            </div>
            <div className="bg-navy p-8 rounded-lg shadow-lg text-center transform transition-transform hover:scale-105">
              <div className="text-gold text-5xl font-bold mb-2">120+</div>
              <div className="text-xl text-gray-300">Countries Served</div>
            </div>
            <div className="bg-navy p-8 rounded-lg shadow-lg text-center transform transition-transform hover:scale-105">
              <div className="text-gold text-5xl font-bold mb-2">$2.8B</div>
              <div className="text-xl text-gray-300">Annual Trade Volume</div>
            </div>
            <div className="bg-navy p-8 rounded-lg shadow-lg text-center transform transition-transform hover:scale-105">
              <div className="text-gold text-5xl font-bold mb-2">98%</div>
              <div className="text-xl text-gray-300">Client Retention</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" ref={servicesRef} className="py-20 bg-navy">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Premium <span className="text-gold">Services</span></h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive import and export solutions tailored to meet the unique needs of your business.
            </p>
          </div>
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-1000 ${isVisible.services ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="bg-navy-light p-8 rounded-lg shadow-lg group hover:bg-gold transition-all duration-300">
              <div className="text-gold group-hover:text-navy mb-4">
                <Ship className="h-12 w-12" />
              </div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-navy">Maritime Logistics</h3>
              <p className="text-gray-300 group-hover:text-navy-light mb-6">
                Full-service ocean freight solutions with real-time tracking and priority handling for time-sensitive cargo.
              </p>
              <a href="#" className="inline-flex items-center text-gold group-hover:text-navy font-semibold">
                Learn More <ChevronRight className="ml-2 h-5 w-5" />
              </a>
            </div>
            <div className="bg-navy-light p-8 rounded-lg shadow-lg group hover:bg-gold transition-all duration-300">
              <div className="text-gold group-hover:text-navy mb-4">
                <Plane className="h-12 w-12" />
              </div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-navy">Air Freight</h3>
              <p className="text-gray-300 group-hover:text-navy-light mb-6">
                Expedited air transport services with dedicated cargo space on major carriers worldwide.
              </p>
              <a href="#" className="inline-flex items-center text-gold group-hover:text-navy font-semibold">
                Learn More <ChevronRight className="ml-2 h-5 w-5" />
              </a>
            </div>
            <div className="bg-navy-light p-8 rounded-lg shadow-lg group hover:bg-gold transition-all duration-300">
              <div className="text-gold group-hover:text-navy mb-4">
                <TrendingUp className="h-12 w-12" />
              </div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-navy">Trade Consulting</h3>
              <p className="text-gray-300 group-hover:text-navy-light mb-6">
                Expert guidance on international trade regulations, tariffs, and market entry strategies.
              </p>
              <a href="#" className="inline-flex items-center text-gold group-hover:text-navy font-semibold">
                Learn More <ChevronRight className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Global Presence Map */}
      <section id="global-presence" ref={globalPresenceRef} className="py-20 bg-navy-light relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our <span className="text-gold">Global</span> Presence</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Strategic locations across six continents ensuring seamless operations worldwide.
            </p>
          </div>
          <div className="global-map-container relative h-[500px] rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-navy-light opacity-40"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80" 
                alt="World Map" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0">
              <div className="location-marker" style={{ top: '30%', left: '20%' }}>
                <div className="ping-marker"></div>
                <MapPin className="h-6 w-6 text-gold absolute -ml-3 -mt-3" />
                <div className="location-info">
                  <h4 className="font-bold">New York</h4>
                  <p>North American HQ</p>
                </div>
              </div>
              <div className="location-marker" style={{ top: '25%', left: '45%' }}>
                <div className="ping-marker"></div>
                <MapPin className="h-6 w-6 text-gold absolute -ml-3 -mt-3" />
                <div className="location-info">
                  <h4 className="font-bold">London</h4>
                  <p>European Operations</p>
                </div>
              </div>
              <div className="location-marker" style={{ top: '35%', left: '70%' }}>
                <div className="ping-marker"></div>
                <MapPin className="h-6 w-6 text-gold absolute -ml-3 -mt-3" />
                <div className="location-info">
                  <h4 className="font-bold">Singapore</h4>
                  <p>Asian Hub</p>
                </div>
              </div>
              <div className="location-marker" style={{ top: '60%', left: '80%' }}>
                <div className="ping-marker"></div>
                <MapPin className="h-6 w-6 text-gold absolute -ml-3 -mt-3" />
                <div className="location-info">
                  <h4 className="font-bold">Sydney</h4>
                  <p>Oceania Center</p>
                </div>
              </div>
              <div className="location-marker" style={{ top: '45%', left: '50%' }}>
                <div className="ping-marker"></div>
                <MapPin className="h-6 w-6 text-gold absolute -ml-3 -mt-3" />
                <div className="location-info">
                  <h4 className="font-bold">Dubai</h4>
                  <p>Middle East Office</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-navy p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-2 text-gold">24/7 Operations</h3>
              <p className="text-gray-300">
                Round-the-clock service across all time zones ensuring your cargo is always monitored.
              </p>
            </div>
            <div className="bg-navy p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-2 text-gold">Local Expertise</h3>
              <p className="text-gray-300">
                Teams with deep knowledge of regional regulations and business practices.
              </p>
            </div>
            <div className="bg-navy p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-2 text-gold">Seamless Integration</h3>
              <p className="text-gray-300">
                Unified systems across all locations for consistent service quality and reporting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section id="case-studies" ref={caseStudiesRef} className="py-20 bg-navy">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Success <span className="text-gold">Stories</span></h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Real-world examples of how we've helped businesses overcome complex logistics challenges.
            </p>
          </div>
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 transition-all duration-1000 ${isVisible.caseStudies ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="bg-navy-light rounded-lg overflow-hidden shadow-lg group">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                  alt="Cargo Ship" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-navy bg-opacity-40"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <div className="bg-gold text-navy px-4 py-1 rounded-full text-sm font-semibold inline-block mb-2">
                    Maritime Logistics
                  </div>
                  <h3 className="text-2xl font-bold text-white">TechGlobal Supply Chain Optimization</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-300 mb-6">
                  Helped a Fortune 500 tech company reduce shipping times by 35% and cut logistics costs by 22% through optimized maritime routes and consolidated shipments.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-gold font-semibold">Results: 35% faster delivery</span>
                  <a href="#" className="inline-flex items-center text-gold font-semibold group-hover:text-white">
                    Read Case Study <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
            <div className="bg-navy-light rounded-lg overflow-hidden shadow-lg group">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1565017228812-0f6b4b6a2f24?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                  alt="Air Freight" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-navy bg-opacity-40"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <div className="bg-gold text-navy px-4 py-1 rounded-full text-sm font-semibold inline-block mb-2">
                    Air Freight
                  </div>
                  <h3 className="text-2xl font-bold text-white">LuxBrands Market Expansion</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-300 mb-6">
                  Facilitated a luxury retail brand's expansion into 12 new markets across Asia with time-sensitive air freight solutions and customs expertise.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-gold font-semibold">Results: 12 new markets</span>
                  <a href="#" className="inline-flex items-center text-gold font-semibold group-hover:text-white">
                    Read Case Study <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section id="testimonials" ref={testimonialsRef} className="py-20 bg-navy-light">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Client <span className="text-gold">Testimonials</span></h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              What our Fortune 500 clients say about our premium import/export services.
            </p>
          </div>
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-1000 ${isVisible.testimonials ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="bg-navy p-8 rounded-lg shadow-lg relative">
              <div className="absolute -top-5 -left-5 text-gold opacity-20">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <div className="mb-6">
                <div className="flex items-center">
                  <div className="text-gold">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-gold">★</span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-300 mb-6 italic">
                "GlobalLift has transformed our international supply chain. Their attention to detail and proactive problem-solving have made them an invaluable partner in our global operations."
              </p>
              <div className="flex items-center">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" 
                  alt="Client" 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-bold text-white">Michael Chen</h4>
                  <p className="text-gold">VP of Operations, TechGlobal Inc.</p>
                </div>
              </div>
            </div>
            <div className="bg-navy p-8 rounded-lg shadow-lg relative">
              <div className="absolute -top-5 -left-5 text-gold opacity-20">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <div className="mb-6">
                <div className="flex items-center">
                  <div className="text-gold">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-gold">★</span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-300 mb-6 italic">
                "Working with GlobalLift has given us a competitive edge in international markets. Their expertise in navigating complex regulations has been crucial to our success."
              </p>
              <div className="flex items-center">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" 
                  alt="Client" 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-bold text-white">Sarah Johnson</h4>
                  <p className="text-gold">CEO, LuxBrands International</p>
                </div>
              </div>
            </div>
            <div className="bg-navy p-8 rounded-lg shadow-lg relative">
              <div className="absolute -top-5 -left-5 text-gold opacity-20">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <div className="mb-6">
                <div className="flex items-center">
                  <div className="text-gold">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-gold">★</span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-300 mb-6 italic">
                "The level of service and attention to detail provided by GlobalLift is unmatched. They've consistently delivered on their promises and exceeded our expectations."
              </p>
              <div className="flex items-center">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" 
                  alt="Client" 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-bold text-white">David Rodriguez</h4>
                  <p className="text-gold">Supply Chain Director, Global Motors</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Logos */}
      <section className="py-16 bg-navy">
        <div className="container mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold">Trusted by Industry Leaders</h2>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-12">
            <div className="client-logo">
              <div className="text-gold text-4xl font-bold">TECHCORP</div>
            </div>
            <div className="client-logo">
              <div className="text-gold text-4xl font-bold">LUXE</div>
            </div>
            <div className="client-logo">
              <div className="text-gold text-4xl font-bold">GLOBALIND</div>
            </div>
            <div className="client-logo">
              <div className="text-gold text-4xl font-bold">PRIMESHIP</div>
            </div>
            <div className="client-logo">
              <div className="text-gold text-4xl font-bold">NEXTRA</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" ref={contactRef} className="py-20 bg-navy">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold mb-6">Get in <span className="text-gold">Touch</span></h2>
              <p className="text-xl text-gray-300 mb-8">
                Ready to elevate your import/export operations? Our team of experts is here to help you navigate the complexities of global trade.
              </p>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="text-gold mr-4">
                    <Location className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">Global Headquarters</h3>
                    <p className="text-gray-300">1 World Trade Center, New York, NY 10007, USA</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-gold mr-4">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">Email Us</h3>
                    <p className="text-gray-300">contact@globallift.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-gold mr-4">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">Call Us</h3>
                    <p className="text-gray-300">+1 (212) 555-7890</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="bg-navy p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-6">Request a <span className="text-gold">Consultation</span></h3>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-300 mb-2">Full Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 bg-navy-light border ${formErrors.name ? 'border-red-500' : 'border-gray-700'} rounded-md focus:outline-none focus:ring-2 focus:ring-gold`}
                      placeholder="John Doe"
                    />
                    {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
                  </div>
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-300 mb-2">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 bg-navy-light border ${formErrors.email ? 'border-red-500' : 'border-gray-700'} rounded-md focus:outline-none focus:ring-2 focus:ring-gold`}
                      placeholder="john@example.com"
                    />
                    {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
                  </div>
                  <div className="mb-4">
                    <label htmlFor="company" className="block text-gray-300 mb-2">Company Name</label>
                    <input 
                      type="text" 
                      id="company" 
                      name="company" 
                      value={formData.company}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 bg-navy-light border ${formErrors.company ? 'border-red-500' : 'border-gray-700'} rounded-md focus:outline-none focus:ring-2 focus:ring-gold`}
                      placeholder="Your Company"
                    />
                    {formErrors.company && <p className="text-red-500 text-sm mt-1">{formErrors.company}</p>}
                  </div>
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-gray-300 mb-2">Message</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      rows={4} 
                      value={formData.message}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 bg-navy-light border ${formErrors.message ? 'border-red-500' : 'border-gray-700'} rounded-md focus:outline-none focus:ring-2 focus:ring-gold`}
                      placeholder="Tell us about your import/export needs"
                    ></textarea>
                    {formErrors.message && <p className="text-red-500 text-sm mt-1">{formErrors.message}</p>}
                  </div>
                  <button 
                    type="submit" 
                    className="w-full bg-gold text-navy px-6 py-3 rounded-md font-semibold text-lg hover:bg-gold-light transition-colors"
                  >
                    Submit Request
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center mb-4">
                <Globe2 className="text-gold h-8 w-8 mr-2" />
                <span className="text-2xl font-bold text-white">GLOBAL<span className="text-gold">LIFT</span></span>
              </div>
              <p className="text-gray-400">
                Premium import/export solutions for businesses that demand excellence.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-white">Services</h3>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(servicesRef);
                    }}
                    className="text-gray-400 hover:text-gold transition-colors"
                  >
                    Maritime Logistics
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(servicesRef);
                    }}
                    className="text-gray-400 hover:text-gold transition-colors"
                  >
                    Air Freight
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(servicesRef);
                    }}
                    className="text-gray-400 hover:text-gold transition-colors"
                  >
                    Trade Consulting
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(servicesRef);
                    }}
                    className="text-gray-400 hover:text-gold transition-colors"
                  >
                    Customs Clearance
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(servicesRef);
                    }}
                    className="text-gray-400 hover:text-gold transition-colors"
                  >
                    Supply Chain Management
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-white">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="#" 
                    onClick={(e) => e.preventDefault()}
                    className="text-gray-400 hover:text-gold transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    onClick={(e) => e.preventDefault()}
                    className="text-gray-400 hover:text-gold transition-colors"
                  >
                    Leadership
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    onClick={(e) => e.preventDefault()}
                    className="text-gray-400 hover:text-gold transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    onClick={(e) => e.preventDefault()}
                    className="text-gray-400 hover:text-gold transition-colors"
                  >
                    News & Press
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    onClick={(e) => e.preventDefault()}
                    className="text-gray-400 hover:text-gold transition-colors"
                  >
                    Sustainability
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-white">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="#" 
                    onClick={(e) => e.preventDefault()}
                    className="text-gray-400 hover:text-gold transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    onClick={(e) => e.preventDefault()}
                    className="text-gray-400 hover:text-gold transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    onClick={(e) => e.preventDefault()}
                    className="text-gray-400 hover:text-gold transition-colors"
                  >
                    Cookie Policy
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    onClick={(e) => e.preventDefault()}
                    className="text-gray-400 hover:text-gold transition-colors"
                  >
                    GDPR Compliance
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    onClick={(e) => e.preventDefault()}
                    className="text-gray-400 hover:text-gold transition-colors"
                  >
                    Security
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              © {new Date().getFullYear()} GlobalLift. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a 
                href="#" 
                onClick={(e) => e.preventDefault()}
                className="text-gray-400 hover:text-gold transition-colors"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a 
                href="#" 
                onClick={(e) => e.preventDefault()}
                className="text-gray-400 hover:text-gold transition-colors"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a 
                href="#" 
                onClick={(e) => e.preventDefault()}
                className="text-gray-400 hover:text-gold transition-colors"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a 
                href="#" 
                onClick={(e) => e.preventDefault()}
                className="text-gray-400 hover:text-gold transition-colors"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;