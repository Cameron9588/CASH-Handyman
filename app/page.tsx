'use client';

import { useState } from 'react';

const ServiceRequestForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    serviceType: '',
    description: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const form = new FormData();
      form.append('name', formData.name);
      form.append('email', formData.email);
      form.append('phone', formData.phone);
      form.append('address', formData.address);
      form.append('serviceType', formData.serviceType);
      form.append('description', formData.description);
      if (file) {
        form.append('file', file);
      }

      const response = await fetch('/api/submit-form', {
        method: 'POST',
        body: form,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Request submitted successfully! We will contact you soon.');
        setFormData({ name: '', email: '', phone: '', address: '', serviceType: '', description: '' });
        setFile(null);
      } else {
        setMessage(data.error || 'Error submitting form');
      }
    } catch (error) {
      setMessage('Error submitting form. Please try again.');
      console.error('Form submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 rounded-3xl p-6 space-y-4">
      <div>
        <label className="block text-sm font-semibold mb-2">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Your name"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Your email"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Phone</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Your phone"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Project address"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Service Type</label>
        <select
          name="serviceType"
          value={formData.serviceType}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select a service</option>
          <option value="Kitchen Remodeling">Kitchen Remodeling</option>
          <option value="Bathroom Renovations">Bathroom Renovations</option>
          <option value="Flooring Installation">Flooring Installation</option>
          <option value="Fence Installation">Fence Installation</option>
          <option value="Roofing & Siding">Roofing & Siding</option>
          <option value="Painting">Painting</option>
          <option value="Deck Work">Deck Work</option>
          <option value="TV Mounting">TV Mounting</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
          rows={3}
          className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Describe your project..."
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Upload Photos (Optional)</label>
        <input
          type="file"
          name="file"
          onChange={handleFileChange}
          accept="image/*"
          className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
        />
      </div>

      {message && (
        <div className={`p-3 rounded-lg text-sm ${message.includes('success') ? 'bg-green-600' : 'bg-red-600'}`}>
          {message}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-semibold py-2 rounded-lg transition"
      >
        {loading ? 'Submitting...' : 'Submit Request'}
      </button>
    </form>
  );
};

const ReviewForm = () => {
  const [reviewData, setReviewData] = useState({
    name: '',
    email: '',
    rating: 5,
    comment: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setReviewData(prev => ({ ...prev, [name]: name === 'rating' ? parseInt(value) : value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/submit-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Thank you for your review! We appreciate your feedback.');
        setReviewData({ name: '', email: '', rating: 5, comment: '' });
      } else {
        setMessage(data.error || 'Error submitting review');
      }
    } catch (error) {
      setMessage('Error submitting review. Please try again.');
      console.error('Review submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 shadow-lg max-w-2xl mx-auto">
      <h3 className="text-3xl font-bold mb-8 text-center">Leave a Review</h3>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-900">Name</label>
          <input
            type="text"
            name="name"
            value={reviewData.name}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your name"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-900">Email</label>
          <input
            type="email"
            name="email"
            value={reviewData.email}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your email"
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-semibold mb-2 text-gray-900">Rating</label>
        <select
          name="rating"
          value={reviewData.rating}
          onChange={handleInputChange}
          className="w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value={5}>⭐⭐⭐⭐⭐ Excellent</option>
          <option value={4}>⭐⭐⭐⭐ Good</option>
          <option value={3}>⭐⭐⭐ Average</option>
          <option value={2}>⭐⭐ Fair</option>
          <option value={1}>⭐ Poor</option>
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-semibold mb-2 text-gray-900">Your Review</label>
        <textarea
          name="comment"
          value={reviewData.comment}
          onChange={handleInputChange}
          required
          rows={4}
          className="w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Share your experience with C.A.S.H. Handyman & Remodeling..."
        />
      </div>

      {message && (
        <div className={`p-3 rounded-lg text-sm mb-6 text-center ${message.includes('Thank you') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gray-900 hover:bg-black disabled:bg-gray-400 text-white font-semibold py-2 rounded-lg transition"
      >
        {loading ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
};

export default function page() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const projects = [
    {
      title: 'Fence Installation',
      description: 'Professional privacy fence installation and repair services.',
      thumbnail: '/f1.jpeg',
      images: ['/f1.jpeg', '/f2.jpeg', '/f3.jpeg', '/f4.jpeg', '/f5.jpeg', '/f6.jpeg', '/f7.jpeg', '/f8.jpeg', '/f9.jpeg', '/f10.jpeg', '/f11.jpeg', '/f12.jpeg', '/f13.jpeg', '/f14.jpeg', '/f15.jpeg', '/f16.jpeg', '/f17.jpeg', '/f18.jpeg', '/f19.jpeg', '/f20.jpeg']
    },
    {
      title: 'Roofing & Exterior',
      description: 'Quality roofing repairs, exterior upgrades, and weatherproofing services.',
      thumbnail: '/roof1.jpeg',
      images: ['/roof1.jpeg', '/roof2.jpeg', '/roof3.jpeg', '/roof4.jpeg', '/roof5.jpeg', '/roof6.jpeg', '/roof7.jpeg', '/roof8.jpeg', '/roof9.jpeg', '/roof10.jpeg', '/roof11.jpeg', '/roof12.jpeg', '/roof13.jpeg', '/roof14.jpeg', '/roof15.jpeg', '/roof16.jpeg', '/roof17.jpeg', '/roof18.jpeg', '/roof19.jpeg', '/roof20.jpeg', '/roof21.jpeg', '/roof22.jpeg']
    },
    {
      title: 'TV Mounting & Appliance Installs',
      description: 'Professional TV mounting and appliance installation services with clean cable management and secure mounting.',
      thumbnail: '/tv1.jpeg',
      images: ['/tv1.jpeg', '/tv2.jpeg', '/tv3.jpeg', '/tv4.jpeg', '/tv5.jpeg', '/tv6.jpeg', '/tv7.jpeg', '/tv8.jpeg', '/tv9.jpeg', '/tv10.jpeg', '/tv11.jpeg', '/tv12.jpeg', '/tv13.jpeg', '/tv14.jpeg', '/tv15.jpeg']
    },
    {
      title: 'Concrete Work',
      description: 'Concrete foundations, driveways, and patio work.',
      thumbnail: '/IMG_7970.jpg',
      images: ['/IMG_7970.jpg', '/project7.jpg.jpg']
    },
    {
      title: 'Tile Work',
      description: 'Custom tile installation for kitchens and bathrooms.',
      thumbnail: '/project20.jpg.jpg',
      images: ['/project20.jpg.jpg']
    },
    {
      title: 'Interior & Exterior Painting',
      description: 'Interior and exterior painting services for homes, businesses, walls, siding, trim, and trim work.',
      thumbnail: '/paint1.jpeg',
      images: ['/paint1.jpeg', '/paint2.jpeg', '/paint3.jpeg', '/paint4.jpeg', '/paint5.jpeg', '/paint6.jpeg']
    },
    {
      title: 'Deck Construction & Repair',
      description: 'Custom deck building, repair, and refurbishment services.',
      thumbnail: '/project18.jpg.jpg',
      images: ['/project18.jpg.jpg', '/project19.jpg.jpg']
    }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">C.A.S.H. Handyman & Remodeling</h1>
            <p className="text-sm text-gray-300">Insured • Bonded • Established in 2021</p>
          </div>

          <nav className="hidden md:flex gap-6 text-sm font-medium">
            <a href="#services" className="hover:text-gray-300">Services</a>
            <a href="#projects" className="hover:text-gray-300">Projects</a>
            <a href="#about" className="hover:text-gray-300">About</a>
            <a href="#service-request" className="hover:text-gray-300">Request Service</a>
            <a href="#contact" className="hover:text-gray-300">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gray-100 py-24">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              Fully Insured & Bonded
            </div>

            <h2 className="text-5xl font-bold leading-tight mb-6">
              Reliable Remodeling & Handyman Services in Abilene, Texas
            </h2>

            <p className="text-lg text-gray-700 mb-8">
              We specialize in residential and commercial remodeling, fencing, skid steer work, drywall, roofing, siding, flooring, and full renovation services with dependable workmanship and honest service.
            </p>

            <div className="flex gap-4 flex-wrap">
              <a
                href="tel:3252674388"
                className="bg-gray-900 text-white px-6 py-3 rounded-2xl hover:bg-black transition"
              >
                Call 325-267-4388
              </a>

              <a
                href="mailto:Cameron.sargent@yahoo.com"
                className="border border-gray-900 px-6 py-3 rounded-2xl hover:bg-gray-200 transition"
              >
                Email Us
              </a>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="relative w-full rounded-[40px] border border-gray-200 bg-white p-8 shadow-[0_40px_120px_rgba(0,0,0,0.2)] overflow-hidden">
              <svg className="pointer-events-none absolute -left-12 -top-10 h-[120px] w-[120px] text-gray-400 opacity-45 rotate-[-20deg] filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.12)]" viewBox="0 0 64 64" fill="none" aria-hidden="true">
                <rect x="10" y="12" width="30" height="16" rx="4" fill="currentColor" />
                <rect x="26" y="26" width="10" height="30" rx="4" fill="currentColor" />
                <rect x="8" y="16" width="6" height="10" rx="2" fill="currentColor" opacity="0.7" />
              </svg>
              <svg className="pointer-events-none absolute right-[-8px] top-16 h-[110px] w-[110px] text-gray-400 opacity-42 rotate-[10deg] filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.12)]" viewBox="0 0 64 64" fill="none" aria-hidden="true">
                <path d="M14 44c0 4 4 6 7 4l16-16c2-2 1-6-2-7l-8-3c-3-1-6 1-7 4l-6 18z" fill="currentColor" opacity="0.8" />
                <path d="M34 16l12 12" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                <path d="M42 8c4 2 6 6 4 10l-8 8" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
              </svg>
              <svg className="pointer-events-none absolute left-10 top-[35%] h-[90px] w-[90px] text-gray-400 opacity-40 -rotate-12 filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.12)]" viewBox="0 0 64 64" fill="none" aria-hidden="true">
                <rect x="26" y="10" width="12" height="38" rx="4" fill="currentColor" />
                <path d="M18 50h28c2 0 4 2 4 4v4H14v-4c0-2 2-4 4-4z" fill="currentColor" opacity="0.7" />
                <path d="M24 8h16v10H24V8z" fill="currentColor" opacity="0.9" />
              </svg>
              <svg className="pointer-events-none absolute right-0 bottom-16 h-[100px] w-[100px] text-gray-400 opacity-36 rotate-12 filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.12)]" viewBox="0 0 64 64" fill="none" aria-hidden="true">
                <path d="M8 42h48v8H8z" fill="currentColor" />
                <path d="M8 34h48v8H8z" fill="currentColor" opacity="0.8" />
                <path d="M56 14L8 34v8l48-20V14z" fill="currentColor" opacity="0.7" />
                <path d="M14 16l6 12" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
              <svg className="pointer-events-none absolute left-10 bottom-8 h-[90px] w-[90px] text-gray-400 opacity-38 rotate-[-10deg] filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.12)]" viewBox="0 0 64 64" fill="none" aria-hidden="true">
                <rect x="12" y="18" width="40" height="24" rx="6" fill="currentColor" />
                <rect x="24" y="10" width="16" height="10" rx="5" fill="currentColor" opacity="0.7" />
                <path d="M18 46h28" stroke="currentColor" strokeWidth="4" strokeLinecap="round" opacity="0.8" />
              </svg>
              <svg className="pointer-events-none absolute left-24 top-4 h-[80px] w-[80px] text-gray-400 opacity-40 rotate-[8deg] filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.12)]" viewBox="0 0 64 64" fill="none" aria-hidden="true">
                <path d="M20 10h24v14H20z" fill="currentColor" />
                <path d="M24 24h16v28H24z" fill="currentColor" opacity="0.8" />
                <path d="M28 6h8v4h-8z" fill="currentColor" opacity="0.9" />
              </svg>
              <svg className="pointer-events-none absolute right-16 top-6 h-[70px] w-[70px] text-gray-400 opacity-38 rotate-[-12deg] filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.12)]" viewBox="0 0 64 64" fill="none" aria-hidden="true">
                <path d="M16 18h32v8H16z" fill="currentColor" />
                <path d="M22 26h20v24H22z" fill="currentColor" opacity="0.8" />
                <path d="M18 50h28" stroke="currentColor" strokeWidth="4" strokeLinecap="round" opacity="0.9" />
              </svg>
              <svg className="pointer-events-none absolute left-4 bottom-24 h-[70px] w-[70px] text-gray-400 opacity-35 rotate-[10deg] filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.12)]" viewBox="0 0 64 64" fill="none" aria-hidden="true">
                <path d="M22 10h20v8H22z" fill="currentColor" />
                <path d="M28 18h8v34h-8z" fill="currentColor" opacity="0.8" />
                <path d="M18 40h28v10H18z" fill="currentColor" opacity="0.7" />
              </svg>
              <svg className="pointer-events-none absolute right-16 bottom-6 h-[75px] w-[75px] text-gray-400 opacity-36 rotate-[-10deg] filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.12)]" viewBox="0 0 64 64" fill="none" aria-hidden="true">
                <path d="M10 22h44v8H10z" fill="currentColor" />
                <path d="M18 30h28v18H18z" fill="currentColor" opacity="0.8" />
                <path d="M14 48h36" stroke="currentColor" strokeWidth="4" strokeLinecap="round" opacity="0.9" />
              </svg>
              <img
                src="/IMG_3025.PNG"
                alt="C.A.S.H. Handyman & Remodeling Logo"
                className="relative w-full max-w-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mx-auto w-full max-w-md overflow-hidden rounded-[32px] border border-gray-200 bg-white p-4 shadow-lg">
            <img
              src="/emoji-guy-2.png"
              alt="C.A.S.H. Handyman mascot"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-4">Our Services</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Professional handyman and remodeling services for homeowners, rental properties, commercial businesses, and new construction projects.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Kitchen Remodeling',
                description: 'Custom kitchen upgrades including cabinets, countertops, tile, lighting, and flooring.',
              },
              {
                title: 'Bathroom Renovations',
                description: 'Bathroom remodels with tile showers, vanities, fixtures, and waterproof flooring.',
              },
              {
                title: 'Flooring Installation',
                description: 'Luxury vinyl plank, laminate, hardwood, and tile flooring installation services.',
              },
              {
                title: 'Privacy Fence Installation',
                description: 'New privacy fence construction, fence replacements, repairs, and gate installation.',
              },
              {
                title: 'Skid Steer Work',
                description: 'New construction cleanups, lot cleanup, debris removal, grading, and material handling.',
              },
              {
                title: 'Carports & Exterior Structures',
                description: 'Custom carports, patio covers, and exterior structure installation services.',
              },
              {
                title: 'Drywall Services',
                description: 'Drywall hanging, repair, patching, finishing, texture matching, and trim work.',
              },
              {
                title: 'Roofing & Siding',
                description: 'Roof repairs, siding replacement, exterior upgrades, and weather damage repairs.',
              },
              {
                title: 'Commercial & Residential Renovations',
                description: 'Complete interior and exterior remodels for homes, offices, rentals, storefronts, and investment properties.',
              },
              {
                title: 'Commercial-Grade Christmas Lights',
                description: 'Custom commercial-grade holiday lighting design and installation for homes and businesses.',
              },
              {
                title: 'TV Mounting',
                description: 'Professional television mounting services - $75 per TV labor. Discounts available for military and first responders. Includes cable management and secure installation.',
              },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-3xl p-8 shadow-sm hover:shadow-lg transition"
              >
                <h4 className="text-2xl font-semibold mb-4">{service.title}</h4>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section id="projects" className="py-24 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-4">Featured Projects</h3>
            <p className="text-gray-600">Click on any project to see more photos</p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {projects.map((project, index) => (
              <div
                key={index}
                onClick={() => setSelectedProject(index)}
                className="overflow-hidden rounded-3xl shadow-lg bg-white cursor-pointer hover:shadow-2xl transition transform hover:scale-105"
              >
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="h-72 w-full object-cover"
                />

                <div className="p-6">
                  <h4 className="text-xl font-semibold mb-2">{project.title}</h4>
                  <p className="text-gray-600 text-sm mb-4">{project.description}</p>
                  <p className="text-blue-600 font-semibold text-sm">View {project.images.length} photos →</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Gallery Modal */}
      {selectedProject !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between">
              <h2 className="text-3xl font-bold">{projects[selectedProject].title}</h2>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-gray-500 hover:text-gray-900 text-3xl font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-6">
              <div className="grid gap-6 sm:grid-cols-2">
                {projects[selectedProject].images.map((image, idx) => (
                  <div key={idx} className="rounded-2xl overflow-hidden shadow-lg">
                    <img
                      src={image}
                      alt={`${projects[selectedProject].title} photo ${idx + 1}`}
                      className="w-full h-80 object-cover"
                    />
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-gray-50 rounded-2xl">
                <p className="text-gray-700 text-lg leading-relaxed">
                  {projects[selectedProject].description}
                </p>
              </div>

              <div className="mt-6 flex gap-4">
                <a
                  href="tel:3252674388"
                  className="flex-1 bg-gray-900 text-white px-6 py-3 rounded-2xl hover:bg-black transition text-center font-semibold"
                >
                  Call 325-267-4388
                </a>
                <a
                  href="mailto:Cameron.sargent@yahoo.com"
                  className="flex-1 border border-gray-900 px-6 py-3 rounded-2xl hover:bg-gray-100 transition text-center font-semibold"
                >
                  Email Us
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* About */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h3 className="text-4xl font-bold mb-6">Why Homeowners & Businesses Choose Us</h3>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            C.A.S.H. Handyman & Remodeling is built on family values. The name C.A.S.H. came from my beautiful wife, Angela, and it stands for our family: Cameron, Angela, Stiles, and Heaven. Some may think we only take cash, but it’s more than that — it’s the heart of our company and the reason we work so hard to help our community, our neighbors, and our friends.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            C.A.S.H. Handyman & Remodeling delivers dependable craftsmanship, honest communication, and quality results for residential and commercial projects. Whether it’s a small repair, fence installation, skid steer cleanup, office renovation, or a full property remodel, we focus on clean work, reliability, and customer satisfaction.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="bg-gray-50 rounded-3xl p-6">
              <h4 className="text-2xl font-bold mb-2">Established 2021</h4>
              <p className="text-gray-600">Proudly serving our community since 2021</p>
            </div>

            <div className="bg-gray-50 rounded-3xl p-6">
              <h4 className="text-2xl font-bold mb-2">Insured & Bonded</h4>
              <p className="text-gray-600">Professional, dependable, and protected service you can trust</p>
            </div>

            <div className="bg-gray-50 rounded-3xl p-6">
              <h4 className="text-2xl font-bold mb-2">Residential & Commercial</h4>
              <p className="text-gray-600">Reliable service for homes, offices, storefronts, rentals, and construction sites</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-4">What Our Customers Say</h3>
            <p className="text-gray-600">Read reviews from homeowners and businesses we've worked with</p>
          </div>

          <ReviewForm />
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6">
          <h3 className="text-4xl font-bold mb-6 text-center">Get a Free Estimate</h3>

          <p className="text-gray-300 mb-12 text-lg text-center">
            Contact us today to discuss your residential or commercial remodeling, fencing, roofing, or construction project.
          </p>

          <div className="grid md:grid-cols-2 gap-12 mb-12">
            {/* Contact Info */}
            <div>
              <h4 className="text-2xl font-bold mb-8">Contact Information</h4>
              <div className="space-y-6">
                <div className="bg-gray-800 rounded-3xl p-6">
                  <h5 className="font-semibold text-xl mb-2">Phone</h5>
                  <a href="tel:3252674388" className="text-gray-300 hover:text-white transition">325-267-4388</a>
                </div>

                <div className="bg-gray-800 rounded-3xl p-6">
                  <h5 className="font-semibold text-xl mb-2">Email</h5>
                  <a href="mailto:Cameron.sargent@yahoo.com" className="text-gray-300 hover:text-white transition">Cameron.sargent@yahoo.com</a>
                </div>

                <div className="bg-gray-800 rounded-3xl p-6">
                  <h5 className="font-semibold text-xl mb-2">Service Area</h5>
                  <p className="text-gray-300">Abilene, Texas and surrounding areas within a two-and-a-half hour radius</p>
                </div>
              </div>
            </div>

            {/* Service Request Form */}
            <div id="service-request">
              <h4 className="text-2xl font-bold mb-8">Request a Service</h4>
              <ServiceRequestForm />
            </div>
          </div>

          <div className="text-center">
            <a
              href="tel:3252674388"
              className="bg-white text-gray-900 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-200 transition inline-block"
            >
              Call Now
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-gray-400 py-6 text-center text-sm">
        <p>© 2026 C.A.S.H. Handyman & Remodeling. All rights reserved.</p>
        <p className="mt-2">Insured & Bonded • Established in 2021 • Residential & Commercial</p>
        <p className="mt-2">325-267-4388 • Cameron.sargent@yahoo.com</p>
      </footer>
    </div>
  )
}
