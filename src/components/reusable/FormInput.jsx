const FormInput = ({ label, id, type = "text", value, onChange, placeholder, required = true }) => {
  return (
    <div className="font-general-regular mb-4">
      <label className="block text-lg text-primary-dark dark:text-primary-light mb-1" htmlFor={id}>
        {label}
      </label>
      <input
        className="w-full px-5 py-2 border border-gray-300 dark:border-primary-dark border-opacity-50 text-primary-dark dark:text-secondary-light bg-ternary-light dark:bg-ternary-dark rounded-md shadow-sm text-md"
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export default FormInput;
