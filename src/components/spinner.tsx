export const Spinner: React.FC = () => (
  <div className="flex justify-center items-center w-full h-full" data-testid="spinner">
    <div className="w-6 h-6 animate-spin rounded-full border-2 border-solid border-slate-900 border-r-transparent"></div>
  </div>
);
