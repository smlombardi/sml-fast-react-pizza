import { Link } from "react-router-dom";

export default function Button({ children, disabled, to }) {
  const classes =
    "inline-block px-4 py-2 mt-8 font-semibold tracking-wide transition-colors duration-300 bg-yellow-400 rounded-full text-stone-800 hover:bg-yellow-500 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-yellow-400 focus:bg-yellow-300 disabled:opacity-50 disabled:cursor-not-allowed";

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
