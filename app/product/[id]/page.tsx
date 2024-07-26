// app/products/[id]/page.tsx
'use client';
import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { Product } from '../../types'; // Adjust the import path based on your structure

interface Props {
  product: Product;
}

const ProductPage = ({ product }: Props) => {
  return (
    <div>
      <Head>
        <title>{product.name} | Product Details</title>
        <meta name="description" content={`Details about ${product.name}`} />
      </Head>
      <Header />
      <main className="container mx-auto p-4">
        <h1 className="text-4xl font-bold">{product.name}</h1>
        <img src={product.image} alt={product.name} className="w-full h-auto mt-4" />
        <p className="text-xl mt-2">Price: ${product.price.toFixed(2)}</p>
      </main>
      <Footer />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const { id } = context.params!;
  const res = await fetch(`http://localhost:3000/api/products/${id}`); // Adjust API URL based on your setup
  if (!res.ok) {
    return {
      notFound: true,
    };
  }
  const product: Product = await res.json();

  return {
    props: {
      product,
    },
  };
};

export default ProductPage;
