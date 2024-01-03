// Test ID: IIDSAT
// CQE92U
import OrderItem from "./OrderItem";
import { useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";

function Order() {
  const order = useLoaderData();
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-24">
        <h1 className="text-xl font-semibold ">Order #{id} Status</h1>

        <div className="space-x-2">
          {priority && (
            <span className="px-3 py-2 text-sm uppercase bg-red-500 rounded-full text-red-50">
              Priority
            </span>
          )}
          <span className="px-3 py-2 text-sm uppercase bg-green-500 rounded-full text-green-50">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between p-6 space-y-2 bg-stone-200">
        <p className="font-semibold">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p>(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>

      <ul className="border-t border-b divide-y divide-stone-200">
        {cart.map((item) => (
          <OrderItem item={item} key={item.id} />
        ))}
      </ul>

      <div className="p-6 space-y-2 bg-stone-200">
        <p className="text-sm font-medium text-stone-600">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-sm font-medium text-stone-600">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-bold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
    </div>
  );
}

export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  console.log(order);
  return order;
}

export default Order;
