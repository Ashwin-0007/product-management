import { useEffect, useMemo, useState } from 'react';
import { X } from 'lucide-react';
import { STOCK_STATUS, STOCK_STATUS_OPTIONS } from '../../constants/stockStatus';

const initialFormState = {
  name: '',
  category: '',
  price: '',
  stockStatus: STOCK_STATUS.IN_STOCK,
};

const validateProduct = form => {
  const errors = {};
  const price = Number(form.price);

  if (form.name.trim().length < 2) {
    errors.name = 'Product name must be at least 2 characters.';
  }

  if (form.category.trim().length < 2) {
    errors.category = 'Category must be at least 2 characters.';
  }

  if (Number.isNaN(price) || price < 0) {
    errors.price = 'Price must be 0 or greater.';
  }

  if (!form.stockStatus) {
    errors.stockStatus = 'Choose a stock status.';
  }

  return errors;
};

const ProductFormModal = ({ product, isOpen, isSaving, apiError, onClose, onSubmit }) => {
  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const isEditing = Boolean(product);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setForm(
      product
        ? {
            name: product.name,
            category: product.category,
            price: product.price,
            stockStatus: product.stockStatus,
          }
        : initialFormState
    );
    setErrors({});
  }, [isOpen, product]);

  const title = useMemo(
    () => (isEditing ? 'Edit product' : 'Add product'),
    [isEditing]
  );

  if (!isOpen) {
    return null;
  }

  const handleChange = event => {
    const { name, value } = event.target;
    setForm(current => ({ ...current, [name]: value }));
  };

  const handleSubmit = event => {
    event.preventDefault();

    const nextErrors = validateProduct(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    onSubmit({
      name: form.name.trim(),
      category: form.category.trim(),
      price: Number(form.price),
      stockStatus: form.stockStatus,
    });
  };

  return (
    <div className="fixed inset-0 z-30 grid place-items-center bg-slate-900/55 p-5" role="presentation">
      <section
        className="max-h-[calc(100vh-40px)] w-full max-w-2xl overflow-auto rounded-lg bg-white shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-form-title"
      >
        <div className="flex items-center justify-between gap-3.5 border-b border-slate-200 px-5 py-5">
          <div>
            <p className="mb-1 text-xs font-bold uppercase text-slate-500">
              {isEditing ? 'Update catalog item' : 'Create catalog item'}
            </p>
            <h2 className="text-2xl font-bold text-slate-950" id="product-form-title">
              {title}
            </h2>
          </div>
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-900 transition hover:border-slate-300 hover:bg-slate-100 focus-visible:border-teal-700 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-teal-700/20"
            type="button"
            onClick={onClose}
            title="Close"
          >
            <X size={18} />
          </button>
        </div>

        {apiError ? (
          <div className="mx-5 mt-5 rounded-lg border border-red-200 bg-red-50 px-3.5 py-3 text-sm font-semibold text-red-700">
            {apiError}
          </div>
        ) : null}

        <form className="grid gap-5 p-5 md:grid-cols-2" onSubmit={handleSubmit}>
          <label className="flex flex-col gap-2 text-sm font-bold text-slate-900">
            <span>Product Name</span>
            <input
              className="min-h-11 w-full rounded-lg border border-slate-200 bg-white px-3 outline-none focus:border-teal-700 focus:ring-3 focus:ring-teal-700/20"
              name="name"
              value={form.name}
              onChange={handleChange}
              autoFocus
            />
            {errors.name ? <small className="font-semibold text-red-700">{errors.name}</small> : null}
          </label>

          <label className="flex flex-col gap-2 text-sm font-bold text-slate-900">
            <span>Category</span>
            <input
              className="min-h-11 w-full rounded-lg border border-slate-200 bg-white px-3 outline-none focus:border-teal-700 focus:ring-3 focus:ring-teal-700/20"
              name="category"
              value={form.category}
              onChange={handleChange}
            />
            {errors.category ? <small className="font-semibold text-red-700">{errors.category}</small> : null}
          </label>

          <label className="flex flex-col gap-2 text-sm font-bold text-slate-900">
            <span>Price</span>
            <input
              className="min-h-11 w-full rounded-lg border border-slate-200 bg-white px-3 outline-none focus:border-teal-700 focus:ring-3 focus:ring-teal-700/20"
              name="price"
              type="number"
              min="0"
              step="0.01"
              value={form.price}
              onChange={handleChange}
            />
            {errors.price ? <small className="font-semibold text-red-700">{errors.price}</small> : null}
          </label>

          <label className="flex flex-col gap-2 text-sm font-bold text-slate-900">
            <span>Stock Status</span>
            <select
              className="min-h-11 w-full rounded-lg border border-slate-200 bg-white px-3 outline-none focus:border-teal-700 focus:ring-3 focus:ring-teal-700/20"
              name="stockStatus"
              value={form.stockStatus}
              onChange={handleChange}
            >
              {STOCK_STATUS_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.stockStatus ? <small className="font-semibold text-red-700">{errors.stockStatus}</small> : null}
          </label>

          <div className="flex flex-col-reverse gap-3 pt-1 md:col-span-2 md:flex-row md:justify-end">
            <button
              className="inline-flex min-h-11 items-center justify-center rounded-lg border border-slate-200 bg-white px-4 font-bold text-slate-900 transition hover:border-slate-300 hover:bg-slate-100 focus-visible:border-teal-700 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-teal-700/20"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="inline-flex min-h-11 items-center justify-center rounded-lg bg-teal-700 px-4 font-bold text-white transition hover:bg-teal-800 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-teal-700/25"
              type="submit"
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : isEditing ? 'Save changes' : 'Create product'}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default ProductFormModal;
