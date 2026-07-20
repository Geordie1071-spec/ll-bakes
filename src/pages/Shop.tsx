import Nav from '../components/Nav';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { categoryColor, products } from '../lib/products';
import './Shop.css';

export default function Shop() {
  return (
    <div className="page-overflow-clip">
      <Nav showCookie />

      <section className="shop-header">
        <h1>
          <span className="stroke-outline">Sweet</span> treats
          <br />
          made with
          <br />
          real ingredients.
        </h1>
        <p>This is where you stop thinking about dessert and finally get something worth craving.</p>
      </section>

      <section className="shop-grid-section">
        <div className="shop-grid">
          {products.map((p) => (
            <ProductCard key={p.id} id={p.id} name={p.name} sub={p.sub} price={p.price} tag={p.tag || undefined} cardBg={categoryColor[p.cat]} placeholder={p.placeholder} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
