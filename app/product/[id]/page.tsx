// pages/products/[id].tsx
'use client';
import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { Product } from '..//../types';

interface Props {
  product: Product;
}

const ProductPage = ({ product }: Props) => {
  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const { id } = context.params!;
  const res = await fetch(`https://api.example.com/products/${id}`);
  const product: Product = await res.json();

  return {
    props: {
      product,
    },
  };
};

export default ProductPage;
