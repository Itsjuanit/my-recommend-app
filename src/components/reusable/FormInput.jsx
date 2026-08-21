// Clase compartida por input, textarea y select para que todos
// los campos del sitio se vean igual.
export const fieldClass =
  "w-full rounded-sm border border-line bg-surface px-4 py-3.5 text-bone placeholder:text-faint transition-colors focus:border-acid focus:outline-none";

export const labelClass = "label-tech mb-2 block text-dim";

const FormInput = ({
  label,
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  required = true,
  hint,
}) => {
  return (
    <div className="mb-6">
      <label className={labelClass} htmlFor={id}>
        {label}
      </label>
      <input
        className={fieldClass}
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
      {hint && <p className="mt-2 text-xs text-faint">{hint}</p>}
    </div>
  );
};

export default FormInput;
