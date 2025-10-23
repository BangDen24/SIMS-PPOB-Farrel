const Button = ({ 
  children, 
  type = 'button', 
  variant = 'primary',
  disabled = false,
  onClick,
  className = '',
}) => {
  const baseStyle = 'bg-red-500 w-full py-3 px-4 rounded-md font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-red-600',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;