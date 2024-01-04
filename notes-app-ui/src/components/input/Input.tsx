interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  placeholder?: string;
  required?: boolean;
}

const Input = ({
  value,
  onChange,
  className,
  placeholder = '',
  required = false
}: InputProps) => (
  <input
    onChange={onChange}
    value={value}
    placeholder={placeholder}
    required={required}
    className={`h-10 border rounded-md focus:outline-none ${className}`}
  />
);

export default Input;
