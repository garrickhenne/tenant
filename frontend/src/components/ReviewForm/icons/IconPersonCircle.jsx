// icon:person-circle | Bootstrap https://icons.getbootstrap.com/ | Bootstrap
const IconPersonCircle = (props) => {
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
        <path d="M11 6a3 3 0 11-6 0 3 3 0 016 0z" />
        <path
          fillRule="evenodd"
          d="M0 8a8 8 0 1116 0A8 8 0 010 8zm8-7a7 7 0 00-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 008 1z"
        />
      </svg>
    </span>
  );
};

export default IconPersonCircle;
