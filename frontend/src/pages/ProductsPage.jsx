import { useEffect, useState } from 'react';
import { Plus, RefreshCcw, Search } from 'lucide-react';
import DeleteProductModal from '../components/products/DeleteProductModal';
import Pagination from '../components/products/Pagination';
import ProductFormModal from '../components/products/ProductFormModal';
import ProductTable from '../components/products/ProductTable';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import { useProducts } from '../hooks/useProducts';
import { productService } from '../services/productService';

const ProductsPage = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebouncedValue(search);
  const { products, meta, isLoading, error, refetchProducts } = useProducts(debouncedSearch, page);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [formError, setFormError] = useState('');
  const [actionError, setActionError] = useState('');

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const openCreateModal = () => {
    setSelectedProduct(null);
    setFormError('');
    setIsModalOpen(true);
  };

  const openEditModal = product => {
    setSelectedProduct(product);
    setFormError('');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (!isSaving) {
      setIsModalOpen(false);
    }
  };

  const handleSubmit = async payload => {
    setIsSaving(true);
    setFormError('');

    try {
      if (selectedProduct) {
        await productService.updateProduct(selectedProduct.id, payload);
      } else {
        await productService.createProduct(payload);
      }

      setIsModalOpen(false);
      if (page !== 1) {
        setPage(1);
      } else {
        await refetchProducts();
      }
    } catch (err) {
      setFormError(err.message || 'Unable to save product');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async product => {
    setProductToDelete(product);
    setActionError('');
  };

  const closeDeleteModal = () => {
    if (!isDeleting) {
      setProductToDelete(null);
      setActionError('');
    }
  };

  const confirmDelete = async () => {
    if (!productToDelete) {
      return;
    }

    setIsDeleting(true);
    setActionError('');

    try {
      await productService.deleteProduct(productToDelete.id);
      setProductToDelete(null);

      if (products.length === 1 && page > 1) {
        setPage(page - 1);
      } else {
        await refetchProducts();
      }
    } catch (err) {
      setActionError(err.message || 'Unable to delete product');
    } finally {
      setIsDeleting(false);
    }
  };

  const handlePageChange = nextPage => {
    const totalPages = meta?.totalPages || 1;
    const normalizedPage = Math.min(Math.max(nextPage, 1), totalPages);

    if (normalizedPage !== page) {
      setPage(normalizedPage);
    }
  };

  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-1 text-xs font-bold uppercase text-slate-500">Catalog</p>
          <h2 className="text-3xl font-bold text-slate-950">Products</h2>
        </div>
        <div className="flex items-center justify-between gap-2.5 md:justify-end">
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-900 transition hover:border-slate-300 hover:bg-slate-100 focus-visible:border-teal-700 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-teal-700/20"
            type="button"
            onClick={refetchProducts}
            title="Refresh"
          >
            <RefreshCcw size={18} />
          </button>
          <button
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-teal-700 px-4 font-bold text-white transition hover:bg-teal-800 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-teal-700/25"
            type="button"
            onClick={openCreateModal}
          >
            <Plus size={18} />
            Add Product
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3">
        <div className="flex h-11 w-full max-w-md items-center gap-2.5 rounded-lg border border-slate-200 bg-white px-3.5">
          <Search className="text-slate-500" size={18} />
          <input
            className="h-full w-full bg-transparent outline-none"
            value={search}
            onChange={event => setSearch(event.target.value)}
            placeholder="Search by product name"
            aria-label="Search products by name"
          />
        </div>
      </div>

      {actionError ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-3.5 py-3 text-sm font-semibold text-red-700">
          {actionError}
        </div>
      ) : null}
      {error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-3.5 py-3 text-sm font-semibold text-red-700">
          {error}
        </div>
      ) : null}

      {isLoading ? (
        <div className="grid min-h-64 place-items-center rounded-lg border border-slate-200 bg-white p-8 text-center">
          <div
            className="h-9 w-9 animate-spin rounded-full border-3 border-slate-300 border-t-teal-700"
            aria-label="Loading products"
          />
        </div>
      ) : products.length > 0 ? (
        <>
          <ProductTable products={products} onEdit={openEditModal} onDelete={handleDelete} />
          <Pagination meta={meta} isLoading={isLoading} onPageChange={handlePageChange} />
        </>
      ) : (
        <div className="grid min-h-64 place-items-center rounded-lg border border-slate-200 bg-white p-8 text-center">
          <div>
            <h3 className="text-lg font-bold">No products found</h3>
            <p className="mt-2 text-slate-500">
              {search ? 'Try a different search term.' : 'Create your first product to start managing the catalog.'}
            </p>
          </div>
        </div>
      )}

      <ProductFormModal
        product={selectedProduct}
        isOpen={isModalOpen}
        isSaving={isSaving}
        apiError={formError}
        onClose={closeModal}
        onSubmit={handleSubmit}
      />
      <DeleteProductModal
        product={productToDelete}
        isDeleting={isDeleting}
        error={actionError}
        onCancel={closeDeleteModal}
        onConfirm={confirmDelete}
      />
    </section>
  );
};

export default ProductsPage;
