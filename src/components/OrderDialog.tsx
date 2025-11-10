import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useCart } from '../context/CartContext';

interface OrderDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isSubmitting?: boolean;
  submitError?: string | null;
}

export function OrderDialog({
  open,
  onClose,
  onConfirm,
  isSubmitting = false,
  submitError = null
}: OrderDialogProps) {
  const { items, total } = useCart();

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-3xl bg-slate-900 p-6 text-left align-middle shadow-xl transition-all ring-1 ring-slate-800">
                <Dialog.Title className="text-lg font-semibold text-white">
                  Confirm your order
                </Dialog.Title>
                <div className="mt-3 space-y-3 text-sm text-slate-300">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between"
                    >
                      <span>
                        {item.name}{' '}
                        <span className="text-slate-500">
                          × {item.quantity}
                        </span>
                      </span>
                      <span className="font-medium text-white">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between border-t border-slate-700 pt-3 text-sm font-semibold text-white">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {submitError && (
                  <p className="mt-3 text-sm text-red-400">{submitError}</p>
                )}

                <div className="mt-6 grid gap-2 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-full border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 hover:border-slate-500 hover:text-white"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={onConfirm}
                    disabled={isSubmitting}
                    className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting…' : 'Confirm Order'}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

