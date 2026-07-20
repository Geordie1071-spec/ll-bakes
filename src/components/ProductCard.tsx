import { Link } from 'react-router-dom';
import ImageSlot from './ImageSlot';
import { useCart } from '../lib/CartContext';
import { PRODUCT_CARD_COLOR } from '../lib/products';
import './ProductCard.css';

interface ProductCardProps {
  id: string;
  name: string;
  sub: string;
  price: number;
  cardBg?: string;
  placeholder: string;
}

export default function ProductCard({ id, name, sub, price, cardBg = PRODUCT_CARD_COLOR, placeholder }: ProductCardProps) {
  const { addToCart } = useCart();
  const href = `/product/${id}`;

  return (
    <div className="product-card" style={{ background: cardBg }}>
      <div className="product-card-ring" />
      <div className="product-card-head">
        <h3 className="product-card-title">
          {name.split(' ').map((word, i) => (
            <span key={i} className="product-card-title-line">{word}</span>
          ))}
        </h3>
        <p className="product-card-sub">{sub}</p>
      </div>
      <Link to={href} className="product-card-image">
        <ImageSlot shape="rect" placeholder={placeholder} />
      </Link>
      <div className="product-card-actions">
        <button className="product-card-add" onClick={() => addToCart({ id, name, sub, price })} type="button">
          <span>Add to Cart</span>
          <span className="product-card-price">${price}</span>
        </button>
        <Link to={href} className="arrow-btn product-card-view">
          View Product{' '}
          <span className="arr">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7" />
              <path d="M8 7h9v9" />
            </svg>
          </span>
        </Link>
      </div>
    </div>
  );
}
