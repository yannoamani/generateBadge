export default function FormField({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  optional,
  options
}) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-gray-600 mb-1">
        {label}
        {optional && (
          <span className="font-normal text-gray-400 ml-1">
            (optionnel)
          </span>
        )}
      </label>

      {/* 🔥 SI OPTIONS → SELECT */}
      {options ? (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm
            focus:outline-none focus:border-indigo-500 focus:bg-indigo-50 transition-all"
        >
          <option value="">Sélectionner...</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm
            focus:outline-none focus:border-indigo-500 focus:bg-indigo-50 transition-all"
        />
      )}
    </div>
  );
}