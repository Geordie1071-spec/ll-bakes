import Nav from '../components/Nav';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import ShopHeaderDecor from '../components/ShopHeaderDecor';
import { products } from '../lib/products';
import './Shop.css';

export default function Shop() {
  return (
    <div className="page-overflow-clip">
      <Nav />

      <section className="shop-header">
        <ShopHeaderDecor />
        <div className="shop-header-inner">
          <h1>
            <span className="stroke-outline">Sweet</span> treats
            <br />
            made with
            <br />
            real ingredients.
          </h1>
          <p>This is where you stop thinking about dessert and finally get something worth craving.</p>
        </div>
      </section>

      <section className="shop-grid-section">
        <div className="product-cards-grid">
          {products.map((p) => (
            <div key={p.id} className="product-cards-grid-item">
              <ProductCard id={p.id} name={p.name} sub={p.sub} price={p.price} placeholder={p.placeholder} image={p.image} />
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
