import { Edit2, Trash2 } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { formatCurrency } from '../../utils/formatters';

const ProductTable = ({ products, onEdit, onDelete }) => {
  return (
    <div className="overflow-auto rounded-lg border border-slate-200 bg-white">
      <table className="w-full min-w-3xl border-collapse">
        <thead>
          <tr>
            <th className="border-b border-slate-200 bg-slate-50 px-5 py-4 text-left text-xs font-extrabold uppercase text-slate-500">Product Name</th>
            <th className="border-b border-slate-200 bg-slate-50 px-5 py-4 text-left text-xs font-extrabold uppercase text-slate-500">Category</th>
            <th className="border-b border-slate-200 bg-slate-50 px-5 py-4 text-left text-xs font-extrabold uppercase text-slate-500">Price</th>
            <th className="border-b border-slate-200 bg-slate-50 px-5 py-4 text-left text-xs font-extrabold uppercase text-slate-500">Stock Status</th>
            <th className="border-b border-slate-200 bg-slate-50 px-5 py-4 text-left text-xs font-extrabold uppercase text-slate-500" aria-label="Actions" />
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr className="hover:bg-slate-50" key={product.id}>
              <td className="border-b border-slate-200 px-5 py-4 align-middle last:border-b-0">
                <strong className="font-bold">{product.name}</strong>
              </td>
              <td className="border-b border-slate-200 px-5 py-4 align-middle">{product.category}</td>
              <td className="border-b border-slate-200 px-5 py-4 align-middle">{formatCurrency(product.price)}</td>
              <td className="border-b border-slate-200 px-5 py-4 align-middle">
                <StatusBadge value={product.stockStatus} />
              </td>
              <td className="border-b border-slate-200 px-5 py-4 align-middle">
                <div className="flex items-center justify-end gap-2">
                  <button
                    className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-900 transition hover:border-slate-300 hover:bg-slate-100 focus-visible:border-teal-700 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-teal-700/20"
                    type="button"
                    onClick={() => onEdit(product)}
                    title="Edit product"
                  >
                    <Edit2 size={17} />
                  </button>
                  <button
                    className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-transparent bg-white text-red-700 transition hover:border-red-100 hover:bg-red-50 focus-visible:border-teal-700 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-teal-700/20"
                    type="button"
                    onClick={() => onDelete(product)}
                    title="Delete product"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
