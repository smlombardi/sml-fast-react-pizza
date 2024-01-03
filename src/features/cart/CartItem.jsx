import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li className="py-3">
      <p>
        {quantity}&times; {name}
      </p>
      <div className="flex justify-between item">
        <p>{formatCurrency(totalPrice)}</p>
        <Button type="small">Remove</Button>
      </div>
    </li>
  );
}

export default CartItem;
