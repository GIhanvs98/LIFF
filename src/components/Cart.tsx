import { useCart } from '../context/CartContext';

interface CartProps {
  onPlaceOrder: () => void;
  isPlacingOrder?: boolean;
}

export function Cart({ onPlaceOrder, isPlacingOrder = false }: CartProps) {
  const { items, total, updateQuantity, removeItem } = useCart();

  return (
    <section className="space-y-4 rounded-3xl bg-slate-900/80 p-6 ring-1 ring-slate-800">
      <header>
        <h2 className="text-xl font-semibold text-white">Your Cart</h2>
        <p className="text-sm text-slate-400">
          Review your selections before placing your order.
        </p>
      </header>

      <div className="space-y-3">
        {items.length === 0 ? (
          <p className="text-sm text-slate-400">
            Your cart is empty. Add something delicious!
          </p>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-3 rounded-2xl bg-slate-900 p-4 ring-1 ring-slate-800"
            >
              <div>
                <p className="text-sm font-semibold text-white">{item.name}</p>
                <p className="text-xs text-slate-400">
                  ${item.price.toFixed(2)} × {item.quantity}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center rounded-full bg-slate-800">
                  <button
                    type="button"
                    className="h-8 w-8 rounded-full text-lg text-white hover:bg-slate-700"
                    onClick={() =>
                      updateQuantity(item.id, Math.max(0, item.quantity - 1))
                    }
                  >
                    −
                  </button>
                  <span className="w-8 text-center text-sm font-semibold text-white">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    className="h-8 w-8 rounded-full text-lg text-white hover:bg-slate-700"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-medium text-red-300 hover:bg-red-500/20"
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <footer className="space-y-3">
        <div className="flex items-center justify-between text-sm text-slate-300">
          <span>Subtotal</span>
          <span className="font-semibold text-white">${total.toFixed(2)}</span>
        </div>
        <button
          type="button"
          disabled={items.length === 0 || isPlacingOrder}
          onClick={onPlaceOrder}
          className="w-full rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:bg-slate-700"
        >
          {isPlacingOrder ? 'Placing Order...' : 'Place Order'}
        </button>
      </footer>
    </section>
  );
}

