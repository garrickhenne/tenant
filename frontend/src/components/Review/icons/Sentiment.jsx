const SentimentIcon = function() {

  return (
    <span
      className="w-8 h-8 shrink-0 mr-4 rounded-full bg-blue-50 flex items-center justify-center"
    >
      <svg
        fill="currentColor"
        viewBox="0 0 16 16"
        height="1em"
        width="1em"
        className="w-5 h-5 text-blue-500"
      >
        <path d="M2 1a1 1 0 00-1 1v8a1 1 0 001 1h9.586a2 2 0 011.414.586l2 2V2a1 1 0 00-1-1H2zm12-1a2 2 0 012 2v12.793a.5.5 0 01-.854.353l-2.853-2.853a1 1 0 00-.707-.293H2a2 2 0 01-2-2V2a2 2 0 012-2h12z" />
        <path d="M8 3.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132z" />
      </svg>

    </span>
  );
};

export default SentimentIcon;