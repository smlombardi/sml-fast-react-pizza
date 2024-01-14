import LinkButton from "../../ui/LinkButton";

function EmptyCart() {
  return (
    <div>
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>
      <h1 className="text-xl font-semibold mt-7">
        Your cart is empty. Start adding some pizzas 🍕!
      </h1>
    </div>
  );
}

export default EmptyCart;
