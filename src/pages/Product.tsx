import { useMemo, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import ImageSlot from '../components/ImageSlot';
import { getProduct, products, tasteNotesFor } from '../lib/products';
import { useCart } from '../lib/CartContext';
import './Product.css';

function ArrowLeftIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M19 12H5" />
      <path d="M12 19l-7-7 7-7" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14" />
      <path d="M12 5l7 7-7 7" />
    </svg>
  );
}

export default function Product() {
  const { id } = useParams<{ id: string }>();
  const product = getProduct(id);
  const { addToCart } = useCart();

  const [qty, setQty] = useState(1);
  const [slideDir, setSlideDir] = useState<'next' | 'prev'>('next');
  const [galleryKey, setGalleryKey] = useState(0);

  const related = useMemo(() => {
    if (!product) return [];
    return products.filter((p) => p.id !== product.id).slice(0, 3);
  }, [product]);

  if (!product) return <Navigate to="/shop" replace />;

  const total = product.price * qty;
  const tasteNotes = tasteNotesFor(product.cat);

  const onAdd = () =>
    addToCart({ id: product.id, name: product.name, sub: product.sub, price: product.price, qty, image: product.image });

  const goPrev = () => {
    setSlideDir('prev');
    setGalleryKey((k) => k + 1);
  };

  const goNext = () => {
    setSlideDir('next');
    setGalleryKey((k) => k + 1);
  };

  return (
    <div className="page-overflow-clip">
      <Nav />

      <Link to="/shop" className="product-back-btn">
        <span aria-hidden="true">&larr;</span>
        <span>Back to Shop</span>
      </Link>

      <section className="product-detail">
        <h1 className="product-title">{product.name}</h1>

        <div className="product-gallery">
          <div className="product-gallery-main">
            <div key={galleryKey} className={`product-gallery-slide product-gallery-slide-${slideDir}`}>
              {product.image ? (
                <img src={product.image} alt={product.name} className="product-gallery-photo" />
              ) : (
                <ImageSlot shape="rect" placeholder={product.placeholder} />
              )}
            </div>
            <div className="product-gallery-nav">
              <button onClick={goPrev} aria-label="Previous image" type="button">
                <ArrowLeftIcon />
              </button>
              <button onClick={goNext} aria-label="Next image" type="button">
                <ArrowRightIcon />
              </button>
            </div>
          </div>
        </div>

        <div className="product-info">
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

          <div className="product-controls">
            <div className="product-qty-stepper">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} type="button">
                &minus;
              </button>
              <span>{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} type="button">
                +
              </button>
            </div>

            <button onClick={onAdd} className="product-add-btn" type="button">
              <span>Add to Cart</span>
              <span className="product-card-price">${total}.00</span>
            </button>
          </div>
        </div>
      </section>

      <section className="product-related">
        <h2>You Might Also Love</h2>
        <div className="product-cards-grid">
          {related.map((p) => (
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
