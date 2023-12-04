// icon:write | System UIcons https://systemuicons.com/ | Corey Ginnivan
const IconWrite = (props) => {
  return (
    <span className="w-8 h-8 shrink-0 mr-4 rounded-full bg-blue-50 flex items-center justify-center">
      <svg
        viewBox="0 0 21 21"
        fill="currentColor"
        height="1em"
        width="1em"
        className="w-5 h-5 text-blue-500"
        {...props}
      >
        <g
          fill="none"
          fillRule="evenodd"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M17 4a2.121 2.121 0 010 3l-9.5 9.5-4 1 1-3.944 9.504-9.552a2.116 2.116 0 012.864-.125zM9.5 17.5h8M15.5 6.5l1 1" />
        </g>
      </svg>
    </span>
  );
};

export default IconWrite;
