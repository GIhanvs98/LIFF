import { useEffect, useMemo, useState } from 'react';
import type { OrderPayload } from './types';
import { Banner } from './components/Banner';
import { Cart } from './components/Cart';
import { Menu } from './components/Menu';
import { OrderDialog } from './components/OrderDialog';
import { PlainLogin } from './components/PlainLogin';
import { CartProvider, useCart } from './context/CartContext';
import { initLiff, sendMessage, type LiffProfile } from './lib/liff';

interface AppState {
  loading: boolean;
  profile: LiffProfile | null;
  error: string | null;
}

function AppContent() {
  const { items, total, addItem, clearCart } = useCart();
  const [appState, setAppState] = useState<AppState>({
    loading: true,
    profile: null,
    error: null
  });
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const apiBaseUrl = useMemo(
    () => (import.meta.env.VITE_API_BASE_URL as string | undefined)?.trim(),
    []
  );
  const canUseLiff = useMemo(
    () => Boolean(import.meta.env.VITE_LIFF_ID),
    []
  );

  useEffect(() => {
    let isMounted = true;

    async function bootstrapLiff() {
      try {
        const profile = await initLiff();
        if (isMounted) {
          setAppState({
            loading: false,
            profile,
            error: null
          });
        }
      } catch (error) {
        console.error(error);
        if (isMounted) {
          setAppState({
            loading: false,
            profile: null,
            error:
              error instanceof Error
                ? error.message
                : 'Unable to load LIFF session.'
          });
        }
      }
    }

    bootstrapLiff();

    return () => {
      isMounted = false;
    };
  }, []);

  const handlePlaceOrder = () => {
    setSubmitError(null);
    setDialogOpen(true);
  };

  const handlePlainLogin = (profile: {
    displayName: string;
    pictureUrl?: string;
  }) => {
    setAppState({
      loading: false,
      profile: {
        userId: `manual-${Date.now()}`,
        displayName: profile.displayName,
        pictureUrl: profile.pictureUrl
      },
      error: null
    });
  };

  const handleConfirmOrder = async () => {
    setSubmitting(true);
    setSubmitError(null);

    const payload: OrderPayload = {
      items: items.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      total: Number(total.toFixed(2)),
      customerName: appState.profile?.displayName,
      customerPictureUrl: appState.profile?.pictureUrl
    };

    try {
      if (apiBaseUrl) {
        await fetch(`${apiBaseUrl}/order`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });
      }

      if (canUseLiff) {
        await sendMessage({
          type: 'text',
          text: `Thank you for your order!\n\n${payload.items
            .map(
              (item) =>
                `• ${item.name} × ${item.quantity} — $${(
                  item.price * item.quantity
                ).toFixed(2)}`
            )
            .join('\n')}\n\nTotal: $${payload.total.toFixed(2)}`
        });
      } else {
        console.info(
          'Order placed in manual mode. Skipping liff.sendMessages call.',
          payload
        );
      }

      clearCart();
      setDialogOpen(false);
      alert('Order placed successfully! Check your LINE chat for confirmation.');
    } catch (error) {
      console.error('Failed to place order', error);
      setSubmitError(
        error instanceof Error
          ? error.message
          : 'Unable to complete your order. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (appState.loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-200">
        <div className="space-y-3 text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm text-slate-400">Initializing LINE session…</p>
        </div>
      </div>
    );
  }

  if (!canUseLiff && !appState.profile) {
    return <PlainLogin onSubmit={handlePlainLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4 pb-24 sm:p-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <Banner
          name={appState.profile?.displayName}
          pictureUrl={appState.profile?.pictureUrl}
        />

        {appState.error && (
          <div className="rounded-2xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-200">
            {appState.error}
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <Menu onAddToCart={addItem} />
          <div className="lg:sticky lg:top-8">
            <Cart
              onPlaceOrder={handlePlaceOrder}
              isPlacingOrder={isSubmitting}
            />
          </div>
        </div>
      </div>

      <OrderDialog
        open={isDialogOpen}
        onClose={() => setDialogOpen(false)}
        onConfirm={handleConfirmOrder}
        isSubmitting={isSubmitting}
        submitError={submitError}
      />
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

export default App;

