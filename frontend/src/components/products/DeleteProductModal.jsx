import { AlertTriangle, Trash2, X } from 'lucide-react';

const DeleteProductModal = ({ product, isDeleting, error, onCancel, onConfirm }) => {
  if (!product) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/55 px-4 py-6 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-lg bg-red-50 text-red-700">
              <AlertTriangle size={22} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-950">Delete product?</h3>
              <p className="text-sm font-medium text-slate-500">Please confirm yes or no.</p>
            </div>
          </div>
          <button
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
            type="button"
            onClick={onCancel}
            disabled={isDeleting}
            title="Close"
          >
            <X size={18} />
          </button>
        </div>
        <div className="px-5 py-5">
          <p className="text-slate-600">
            Are you sure you want to delete <span className="font-bold text-slate-950">"{product.name}"</span>?
            This action cannot be undone.
          </p>
          {error ? (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3.5 py-3 text-sm font-semibold text-red-700">
              {error}
            </div>
          ) : null}
        </div>
        <div className="flex flex-col-reverse gap-2.5 border-t border-slate-200 bg-slate-50 px-5 py-4 sm:flex-row sm:justify-end">
          <button
            className="inline-flex min-h-11 items-center justify-center rounded-lg border border-slate-200 bg-white px-4 font-bold text-slate-800 transition hover:border-slate-300 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
            type="button"
            onClick={onCancel}
            disabled={isDeleting}
          >
            No, keep it
          </button>
          <button
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-red-700 px-4 font-bold text-white transition hover:bg-red-800 disabled:cursor-wait disabled:opacity-70"
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
          >
            <Trash2 size={18} />
            {isDeleting ? 'Deleting...' : 'Yes, delete'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProductModal;
