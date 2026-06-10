import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { clearCart, removeFromCart } from "../../redux/Slices/cartSlice";
// import { XMarkIcon } from '@heroicons/react/24/outline'
import { Button } from "@headlessui/react";
// const products = [
//   {
//     id: 1,
//     name: "Throwback Hip Bag",
//     href: "#",
//     color: "Salmon",
//     price: " 90.00",
//     quantity: 1,
//     imageSrc:
//       "https://tailwindcss.com/plus-assets/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
//     imageAlt:
//       "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
//   },
//   {
//     id: 2,
//     name: "Medium Stuff Satchel",
//     href: "#",
//     color: "Blue",
//     price: " 32.00",
//     quantity: 1,
//     imageSrc:
//       "https://tailwindcss.com/plus-assets/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
//     imageAlt:
//       "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
//   },
//   {
//     id: 3,
//     name: "Zip Tote Basket",
//     href: "#",
//     color: "White and black",
//     price: " 140.00",
//     quantity: 1,
//     imageSrc:
//       "https://tailwindcss.com/plus-assets/img/ecommerce-images/shopping-cart-page-04-product-03.jpg",
//     imageAlt:
//       "Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.",
//   },
// ];

const Cart = () => {
  const navigate = useNavigate();
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const totalPrice = useAppSelector((state) => state.cart.totalPrice);
  const dispatch = useAppDispatch();
  //   const [open, setOpen] = useState(true);

  const removeProduct = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const checkoutCart = () => {
    console.log("checkout clicked");
  };

  const clearAll = () => {
    dispatch(clearCart());
  };

  return (
    <div className="flex flex-col bg-gray-900 shadow-xl items-center">
      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
        <div className="flex items-start justify-between my-2">
          <h1 className="text-lg font-medium text-gray-900">Shopping cart</h1>
        </div>
      </div>
      {cartItems.length ? (
        <div className="w-3/4">
          <div className="mt-8 px-4">
            <div className="flow-root my-4">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {cartItems.map((game) => (
                  <li key={game.id} className="flex py-6">
                    <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        alt={game.image}
                        src={game.title}
                        className="size-full object-cover"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-white-900">
                          <h3>
                            <a href="#">{game.title}</a>
                          </h3>
                          <p className="ml-4"> ₹{game.price}</p>
                        </div>
                        <p className="mt-1 text-sm text-white-500">
                          {game.genre}
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <p className="text-white-500">Qty {game.quantity}</p>

                        <div className="flex">
                          <button
                            type="button"
                            onClick={() => removeProduct(game.id)}
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 py-6">
            <div className="flex items-end justify-end gap-4 text-base font-medium text-white-900">
              <p>Subtotal</p>
              <p> ₹ {totalPrice}</p>
            </div>
            <div className="my-4 text-sm text-white-500 text-right">
              Shipping and taxes calculated at checkout.
            </div>
            <div className="flex gap-1 items-center justify-between">
              <Button
                className="items-center rounded-md cursor-pointer bg-red-700 mx-1 py-1.5 w-1/4 text-sm font-semibold text-white"
                onClick={() => clearAll()}
              >
                Clear All
              </Button>

              <Button
                className="items-center rounded-md cursor-pointer bg-green-700 mx-1 py-1.5 w-1/4 text-sm font-semibold text-white"
                onClick={() => checkoutCart()}
              >
                Checkout
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div>Please add games to cart!</div>
      )}
      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
        <p>
          or{" "}
          <button
            type="button"
            onClick={() => navigate("/")}
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Continue Shopping
            <span aria-hidden="true"> &rarr;</span>
          </button>
        </p>
      </div>
    </div>
  );
};

export default Cart;
