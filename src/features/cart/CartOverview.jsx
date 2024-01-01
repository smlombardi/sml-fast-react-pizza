import { Link } from "react-router-dom";

function CartOverview() {
  return (
    <div className="flex items-center justify-between px-4 py-4 text-sm uppercase bg-stone-800 text-stone-200 sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold sm:space-x-6 text-stone-300">
        <span>23 pizzas</span>
        <span>$23.45</span>
      </p>
      <Link to="/cart"> Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
