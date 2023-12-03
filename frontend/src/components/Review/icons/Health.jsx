const HealthIcon = function() {

  return (
    <span
      className="w-8 h-8 shrink-0 mr-4 rounded-full bg-blue-50 flex items-center justify-center"
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        height="1em"
        width="1em"
        className="w-5 h-5 text-blue-500"
      >
        <path d="M19.649 5.286L14 8.548V2.025h-4v6.523L4.351 5.286l-2 3.465 5.648 3.261-5.648 3.261 2 3.465L10 15.477V22h4v-6.523l5.649 3.261 2-3.465-5.648-3.261 5.648-3.261z" />
      </svg>

    </span>
  );
};

export default HealthIcon;