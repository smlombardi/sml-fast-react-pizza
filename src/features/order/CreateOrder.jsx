import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import EmptyCart from "../cart/EmptyCart";
import { useDispatch, useSelector } from "react-redux";
import { getCart, clearCart, getTotalCartPrice } from "../cart/cartSlice";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import { fetchAddress } from "../user/userSlice";
import store from "../../store"; //HACK, see below

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isSubmitting = navigation.state === "submitting";
  const formErrors = useActionData();
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((state) => state.user);
  const isLoadingAddress = addressStatus === "loading";
  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  if (!cart.length) return <EmptyCart />;
  return (
    <div>
      <h1 className="mb-8 text-xl font-semibold">Ready to order? Lets go!</h1>

      <Form method="POST">
        <div className="flex items-center gap-2 mb-4">
          <label className="basis-40">First Name</label>
          <div className="grow">
            <input
              type="text"
              name="customer"
              required
              className="input"
              defaultValue={username}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <label className="basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" required className="input" />
          </div>
          {formErrors?.phone && (
            <p className="mt-2 text-sm text-red-500">{formErrors.phone}</p>
          )}
        </div>

        <div className="relative flex items-center gap-2 mb-5">
          <label className="basis-40">Address</label>
          <div className="grow">
            <input
              type="text"
              name="address"
              required
              className="input"
              disabled={isLoadingAddress}
              defaultValue={address}
            />
            {address.status === "error" && (
              <p className="mt-2 text-sm text-red-500">{errorAddress}</p>
            )}
          </div>
          {!position.latitude && !position.longitude && (
            <span className="absolute top-0 z-10 right-2">
              <Button
                type="small"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
                disabled={isLoadingAddress}
              >
                Get Location
              </Button>
            </span>
          )}
        </div>

        <div className="flex items-center gap-4 mb-12">
          <input
            className="w-6 h-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button type="primary" disabled={isSubmitting || isLoadingAddress}>
            {isSubmitting
              ? "Placing Order..."
              : `Order now for ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  const errors = {};
  if (!isValidPhone(order.phone)) {
    errors.phone = "Invalid phone number";
  }
  if (Object.keys(errors).length > 0) {
    return errors;
  }

  const newOrder = await createOrder(order);

  //HACK because you can't dispatch actions from outside of a component
  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
