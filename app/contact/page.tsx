// pages/contact.tsx
'use client';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitStatus, setSubmitStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to an API)
    console.log('Form submitted:', formData);
    setSubmitStatus('Thank you for reaching out! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' }); // Reset form
  };

  return (
    <>
      <Head>
        <title>Contact Us | My E-commerce Site</title>
        <meta name="description" content="Get in touch with us for any inquiries, feedback, or support." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="container mx-auto p-4">
        <section className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg mb-4">We would love to hear from you. Please fill out the form below or reach out to us through the provided contact information.</p>
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
            <div className="mb-4">
              <label htmlFor="name" className="block text-lg font-medium mb-2">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-lg font-medium mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-lg font-medium mb-2">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            >
              Send Message
            </button>
          </form>
          {submitStatus && <p className="mt-4 text-green-500">{submitStatus}</p>}
        </section>
        <section className="text-center mt-8">
          <h2 className="text-2xl font-semibold mb-4">Our Contact Information</h2>
          <p className="text-lg">Email: support@example.com</p>
          <p className="text-lg">Phone: (123) 456-7890</p>
          <p className="text-lg">Address: 1234 Market St, San Francisco, CA 94103</p>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Contact;
