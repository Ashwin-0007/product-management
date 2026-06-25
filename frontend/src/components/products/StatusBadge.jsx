import { STOCK_STATUS_LABELS } from '../../constants/stockStatus';

const STATUS_STYLES = {
  IN_STOCK: 'bg-emerald-50 text-emerald-700',
  LOW_STOCK: 'bg-amber-100 text-amber-800',
  OUT_OF_STOCK: 'bg-red-50 text-red-700',
};

const StatusBadge = ({ value }) => {
  return (
    <span
      className={`inline-flex min-w-24 justify-center rounded-full px-2.5 py-1.5 text-xs font-extrabold ${STATUS_STYLES[value] || 'bg-slate-100 text-slate-700'}`}
    >
      {STOCK_STATUS_LABELS[value] || value}
    </span>
  );
};

export default StatusBadge;
