/* eslint-disable react/prop-types */
import ButtonLoader from '../utils/ButtonLoader';

const Button = ({ children, onClick, isLoading = false, disabled = false, className = '', type = 'button' }) => {
  const baseClasses = 'px-4 py-1 rounded-full w-full text-lg text-white bg-primary hover:opacity-80';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isLoading || disabled}
      style={{ height: '35px' }}
      className={`${baseClasses} ${className} flex items-center justify-center`}
    >
      {isLoading ? (
        <div className="flex justify-center items-center">
          <ButtonLoader />
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
