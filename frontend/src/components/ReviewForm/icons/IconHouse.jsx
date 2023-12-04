// icon:house | Bootstrap https://icons.getbootstrap.com/ | Bootstrap
const IconHouse = (props) => {
  return (
    <span className="w-8 h-8 shrink-0 mr-4 rounded-full bg-blue-50 flex items-center justify-center">
      <svg
        fill="currentColor"
        viewBox="0 0 16 16"
        height="1em"
        width="1em"
        className="w-5 h-5 text-blue-500"
        {...props}
      >
        <path
          fillRule="evenodd"
          d="M2 13.5V7h1v6.5a.5.5 0 00.5.5h9a.5.5 0 00.5-.5V7h1v6.5a1.5 1.5 0 01-1.5 1.5h-9A1.5 1.5 0 012 13.5zm11-11V6l-2-2V2.5a.5.5 0 01.5-.5h1a.5.5 0 01.5.5z"
        />
        <path
          fillRule="evenodd"
          d="M7.293 1.5a1 1 0 011.414 0l6.647 6.646a.5.5 0 01-.708.708L8 2.207 1.354 8.854a.5.5 0 11-.708-.708L7.293 1.5z"
        />
      </svg>
    </span>
  );
};

export default IconHouse;
