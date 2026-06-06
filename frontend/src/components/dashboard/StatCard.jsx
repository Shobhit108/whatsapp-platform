const StatCard = ({
  title,
  value,
  icon,
}) => {
  const Icon =
    icon;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 hover:border-emerald-500/30 transition">

      <div className="flex items-center justify-between">

        <div>
          <p className="text-slate-400 text-sm">
            {title}
          </p>

          <h2 className="text-3xl font-bold mt-2 text-white">
            {value}
          </h2>
        </div>

        <div className="h-14 w-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
          <Icon size={28} />
        </div>
      </div>
    </div>
  );
};

export default
StatCard;