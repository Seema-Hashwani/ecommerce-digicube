// pages/about.tsx
'use client';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

const About = () => {
  return (
    <>
      <Head>
        <title>About Us | My E-commerce Site</title>
        <meta name="description" content="Learn more about our e-commerce store, our mission, and our team." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="container mx-auto p-4">
        <section className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="text-lg">
            Welcome to My E-commerce Site! We are dedicated to providing you with the best online shopping experience. Our mission is to offer high-quality products at competitive prices, ensuring customer satisfaction with every purchase.
          </p>
          <p className="text-lg mt-4">
            Our team is passionate about curating a selection of products that meet your needs and preferences. Whether you are looking for the latest trends or timeless classics, we strive to bring you a diverse range of options to choose from.
          </p>
          <p className="text-lg mt-4">
            Thank you for choosing us as your shopping destination. We look forward to serving you!
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default About;
