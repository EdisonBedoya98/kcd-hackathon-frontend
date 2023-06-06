export const FullScreenLoading = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <svg
        className="animate-spin h-8 w-8 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042.343 5.998 1 8.823l5.046-1.386zm10-5.291a7.962 7.962 0 01-2 5.291l5.045 1.386C19.657 17.998 20 15.042 20 12h-4a7.963 7.963 0 01-2-5.291z"
        ></path>
      </svg>
    </div>
  );
};
