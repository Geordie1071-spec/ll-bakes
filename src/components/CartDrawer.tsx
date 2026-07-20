import { useCart } from '../lib/CartContext';
import './CartDrawer.css';

export default function CartDrawer() {
  const { items, isOpen, total, closeCart, increment, decrement, remove } = useCart();

  return (
    <>
      <div className={`cart-overlay${isOpen ? ' cart-overlay-open' : ''}`} onClick={closeCart} />
      <aside data-lenis-prevent className={`cart-panel${isOpen ? ' cart-panel-open' : ''}`}>
        <div className="cart-panel-head">
          <h2>Your Cart</h2>
          <button onClick={closeCart} aria-label="Close" className="cart-close-btn">
            &times;
          </button>
        </div>
        <div className="cart-items">
          {items.length === 0 && (
            <div className="cart-empty">
              <div className="cart-empty-title">Empty!</div>
              <p>Add something sweet to get started.</p>
            </div>
          )}
          {items.map((it) => (
            <div key={it.id} className="cart-line">
              <div className="cart-line-thumb">
                {it.image ? (
                  <img src={it.image} alt="" className="cart-line-thumb-img" />
                ) : null}
              </div>
              <div className="cart-line-body">
                <h3>{it.name}</h3>
                <p>{it.sub}</p>
                <div className="cart-line-controls">
                  <div className="cart-qty-stepper">
                    <button onClick={() => decrement(it.id)} aria-label="Decrease">
                      &minus;
                    </button>
                    <span>{it.qty}</span>
                    <button onClick={() => increment(it.id)} aria-label="Increase">
                      +
                    </button>
                  </div>
                  <span className="cart-line-price">${(it.price * it.qty).toFixed(2)}</span>
                </div>
              </div>
              <button onClick={() => remove(it.id)} aria-label="Remove" className="cart-line-remove">
                &times;
              </button>
            </div>
          ))}
        </div>
        <div className="cart-footer">
          <div className="cart-row">
            <span className="cart-row-label">Shipping</span>
            <span className="cart-row-label">Calculated at checkout</span>
          </div>
          <div className="cart-row cart-total-row">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button className="cart-checkout-btn" type="button">
            <span>Proceed to Checkout</span>
            <span style={{ fontSize: 22 }}>&rarr;</span>
          </button>
        </div>
      </aside>
    </>
  );
}
