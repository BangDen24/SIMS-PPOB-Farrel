import { forwardRef } from "react";

const Input = forwardRef(
  ({ type = "text", placeholder, error, icon: Icon, ...props }, ref) => {
    return (
      <div className="mb-4">
        <div className="flex items-center relative">
          {Icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Icon size={20} />
            </div>
          )}
          <input
            ref={ref}
            type={type}
            placeholder={placeholder}
            className={`
            w-full py-3 px-4 border rounded-md
            ${Icon ? "pl-10" : ""}
            ${error ? "border-red-500" : "border-gray-300"}
            focus:outline-gray-800 focus:ring-2
            placeholder:text-gray-400
            text-gray-700
          `}
            {...props}
          />
        </div>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
