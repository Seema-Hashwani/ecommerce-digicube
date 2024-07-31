import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI as string; 
const client = new MongoClient(uri);

export async function GET() {
  try {
    await client.connect();
    const database = client.db('ecommerce');
    const productsCollection = database.collection('products');
    const products = await productsCollection.find({}).toArray();
    
    const transformedProducts = products.map(product => ({
      id: product._id.toString(),
      name: product.name,
      price: product.price,
      image: product.image,
    }));

    return new Response(JSON.stringify(transformedProducts), { status: 200 });
  } catch (error) {
    const message = (error as Error).message || 'Unknown error';
    console.error('Error fetching products:', message);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch products', details: message }),
      { status: 500 }
    );
  } finally {
    await client.close(); // Ensure the connection is always closed
  }
}
