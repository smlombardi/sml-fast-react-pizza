import { Link } from "react-router-dom";

export default function Button({ children, disabled, to, type, onClick }) {
  const base =
    "inline-block px-4 py-2 font-semibold tracking-wide transition-colors duration-300 bg-yellow-400 rounded-full text-stone-800 hover:bg-yellow-500 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-yellow-400 focus:bg-yellow-300 disabled:opacity-50 disabled:pointer-events-none	";

  const styles = {
    primary:
      base +
      "bg-yellow-400 hover:bg-yellow-500 focus:ring-yellow-400 focus:bg-yellow-300",
    secondary:
      base +
      "bg-stone-200 hover:bg-stone-500 focus:ring-stone-400 focus:bg-stone-300",
    small: base + "px-4 py-2 text-xs",
  };

  if (to) {
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button disabled={disabled} className={styles[type]} onClick={onClick}>
        {children}
      </button>
    );
  }

  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}
