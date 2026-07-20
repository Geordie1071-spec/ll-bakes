import { useMemo, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import ImageSlot from '../components/ImageSlot';
import { getProduct, productBadges, products, sizeLabels, sizeRatios, tasteNotesFor } from '../lib/products';
import { useCart } from '../lib/CartContext';
import './Product.css';

const shots = ['main photo', 'slice photo', 'top-down photo', 'detail photo'];

export default function Product() {
  const { id } = useParams<{ id: string }>();
  const product = getProduct(id);
  const { addToCart } = useCart();

  const [shot, setShot] = useState(0);
  const [sizeIdx, setSizeIdx] = useState(0);
  const [qty, setQty] = useState(1);

  const related = useMemo(() => {
    if (!product) return [];
    return products.filter((p) => p.id !== product.id).slice(0, 4);
  }, [product]);

  if (!product) return <Navigate to="/shop" replace />;

  const isCake = product.cat === 'Cakes';
  const sizePrice = isCake ? Math.round(product.price * sizeRatios[sizeIdx]) : product.price;
  const total = sizePrice * qty;
  const tasteNotes = tasteNotesFor(product.cat);
  const variantId = isCake ? `${product.id}-${sizeIdx}` : product.id;
  const variantSub = isCake ? sizeLabels[sizeIdx] : product.sub;

  const onAdd = () => addToCart({ id: variantId, name: product.name, sub: variantSub, price: sizePrice, qty });

  return (
    <div className="page-overflow-clip">
      <Nav />

      <div className="product-breadcrumb">
        <Link to="/shop">Shop</Link>
        <span className="crumb-sep">/</span>
        <Link to="/shop">{product.cat}</Link>
        <span className="crumb-sep">/</span>
        <span className="crumb-current">{product.name}</span>
      </div>

      <section className="product-detail">
        <div className="product-gallery">
          <div className="product-gallery-main">
            <ImageSlot shape="rect" placeholder={`${product.placeholder} — ${shots[shot]}`} />
            <div className="product-gallery-nav">
              <button onClick={() => setShot((s) => (s + shots.length - 1) % shots.length)} aria-label="Previous" type="button">
                &larr;
              </button>
              <button onClick={() => setShot((s) => (s + 1) % shots.length)} aria-label="Next" type="button">
                &rarr;
              </button>
            </div>
            <span className="product-gallery-tag">{shots[shot]}</span>
          </div>
          <div className="product-float product-float-1">
            <ImageSlot shape="circle" placeholder="treat" />
          </div>
          <div className="product-float product-float-2">
            <ImageSlot shape="circle" placeholder="berry" />
          </div>
          <div className="product-float product-float-3">
            <ImageSlot shape="circle" placeholder="crumb" />
          </div>
        </div>

        <div className="product-info">
          <h1>{product.name}</h1>
          <p className="product-tagline">Meet the treat that steals the party</p>

          <div className="product-info-cards">
            <div className="product-info-card">
              <div className="product-info-card-title">Taste Profile</div>
              <div className="product-taste-list">
                {tasteNotes.map((t) => (
                  <div key={t} className="product-taste-item">
                    <span>&bull;</span>
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="product-info-card">
              <div className="product-info-card-title">Perfect For</div>
              <p>Birthdays, baby showers, anniversaries, celebrations, afternoon tea, or any Tuesday that deserves a little something sweet.</p>
            </div>
          </div>

          <div className="product-badges">
            {productBadges.map((b) => (
              <div key={b.label} className="product-badge">
                <div className="product-badge-icon" dangerouslySetInnerHTML={{ __html: b.icon }} />
                <div className="product-badge-label">{b.label}</div>
              </div>
            ))}
          </div>

          <div className="product-controls">
            {isCake && (
              <div className="product-size-select-wrap">
                <select value={sizeIdx} onChange={(e) => setSizeIdx(Number(e.target.value))}>
                  {sizeLabels.map((label, i) => (
                    <option key={label} value={i}>
                      {label}
                    </option>
                  ))}
                </select>
                <span className="product-size-caret">&#9662;</span>
              </div>
            )}
            <div className="product-qty-stepper">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} type="button">
                &minus;
              </button>
              <span>{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} type="button">
                +
              </button>
            </div>
          </div>

          <button onClick={onAdd} className="product-add-btn" type="button">
            <span>Add to Cart</span>
            <span className="product-card-price">${total}.00</span>
          </button>
        </div>
      </section>

      <section className="product-related">
        <h2>You Might Also Love</h2>
        <div className="product-cards-grid">
          {related.map((p) => (
            <div key={p.id} className="product-cards-grid-item">
              <ProductCard id={p.id} name={p.name} sub={p.sub} price={p.price} placeholder={p.placeholder} />
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
