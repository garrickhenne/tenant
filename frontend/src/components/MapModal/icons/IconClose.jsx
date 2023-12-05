// icon:close | CSS Icons https://css.gg/ | Astrit

const IconClose = (props) => {
  return (
    <span className="w-7 h-7 shrink-0 rounded-full bg-blue-50 flex items-center justify-center cursor-pointer self-end" onClick={props.onClick}>
      <svg fill="none" viewBox="0 0 24 24" height="0.5em" width="0.5em" className="w-4 h-4 text-blue-500" {...props}>
        <path
          fill="currentColor"
          d="M6.225 4.811a1 1 0 00-1.414 1.414L10.586 12 4.81 17.775a1 1 0 101.414 1.414L12 13.414l5.775 5.775a1 1 0 001.414-1.414L13.414 12l5.775-5.775a1 1 0 00-1.414-1.414L12 10.586 6.225 4.81z"
        />
      </svg>
    </span>
  );
};

export default IconClose;
