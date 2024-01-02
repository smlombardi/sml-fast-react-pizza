import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

export default function LinkButton({ children, to }) {
  const navigate = useNavigate();
  const classGoBack = "text-sm text-blue-500 hover:text-blue-800";
  if (to === -1) {
    return (
      <button onClick={() => navigate(-1)} className={classGoBack}>
        {children}
      </button>
    );
  }

  return (
    <Link to={to} className={classGoBack}>
      {children}
    </Link>
  );
}
