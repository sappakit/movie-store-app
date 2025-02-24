import { useRef, useState } from "react";

function MyCart({
  toggleCart,
  isCartOpen,
  cartItems,
  removeFromCart,
  clearCart,
  updateQuantity,
}) {
  const IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const timerRef = useRef(null);

  // Calculate total quantity
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.qty, 0);

  // Calculate total price
  const calculateTotal = () => {
    return cartItems
      .reduce((total, movie) => total + parseFloat(movie.price) * movie.qty, 0)
      .toFixed(2);
  };

  // Apply discount
  const applyDiscount = (total) => {
    let discount = 0;
    let finalPrice = parseFloat(total);

    if (totalQuantity > 5) {
      discount = 20;
      finalPrice *= 0.8; // 20% discount
    } else if (totalQuantity > 3) {
      discount = 10;
      finalPrice *= 0.9; // 10% discount
    }

    return { price: finalPrice.toFixed(2), discount };
  };

  // Handle Checkout Click
  const handleCheckout = () => {
    setIsCheckoutOpen(true);
    setCountdown(60);

    // Clear timer before starting a new one
    if (timerRef.current) clearInterval(timerRef.current);

    // Start countdown timer
    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timerRef.current);
          setIsCheckoutOpen(false);
        }
        return prev - 1;
      });
    }, 1000);
  };

  const totalPrice = calculateTotal();
  const discountedPrice = applyDiscount(totalPrice);

  return (
    <>
      {/* My cart */}
      <div className="fixed right-0 top-0 z-50 flex h-full w-[24rem] transform flex-col justify-between gap-6 bg-[#030712] px-6 py-8 text-white">
        <div className="flex flex-col gap-4 overflow-y-auto">
          {/* My Cart text */}
          <div className="flex flex-col px-2">
            <div className="flex items-center justify-between">
              <p className="text-2xl">My Cart</p>
              <button
                className="text-lg transition-colors duration-300 hover:text-gray-300"
                onClick={toggleCart}
              >
                ✖
              </button>
            </div>

            <p className="text-sm text-gray-400">
              {totalQuantity} {totalQuantity > 1 ? "Items" : "Item"}
            </p>
          </div>

          {totalQuantity > 0 && (
            <div className="flex flex-col">
              <button
                className="w-fit self-end px-2 text-sm text-gray-400 transition-colors duration-300 hover:text-gray-300"
                onClick={clearCart}
              >
                Clear
              </button>

              {/* Items */}
              <div className="flex flex-grow flex-col gap-3 overflow-y-auto p-2">
                {cartItems.map((movie) => {
                  const shortenTitle =
                    movie.title.length > 20
                      ? movie.title.slice(0, 20) + "..."
                      : movie.title;

                  return (
                    <div
                      key={movie.id}
                      className="flex min-h-[7rem] w-full gap-3 rounded-lg bg-gray-800 p-3"
                    >
                      <div className="h-full w-16">
                        <img
                          src={`${IMAGE_BASE_URL}/w500${movie.poster_path}`}
                          alt={movie.title}
                          className="aspect-[2/3] h-full w-full rounded-md object-cover"
                        />
                      </div>

                      <div className="flex flex-grow flex-col justify-between">
                        <div className="flex flex-col gap-1">
                          <p>{shortenTitle}</p>

                          <div className="flex items-center gap-2">
                            <p className="text-sm text-gray-400">
                              Qty: {movie.qty}
                            </p>

                            <div className="flex gap-1">
                              <button
                                className="flex h-4 w-4 items-center justify-center rounded-sm bg-gray-700 text-xs transition-colors duration-300 hover:bg-gray-600"
                                onClick={() => updateQuantity(movie.id, -1)}
                              >
                                -
                              </button>
                              <button
                                className="flex h-4 w-4 items-center justify-center rounded-sm bg-gray-700 text-xs transition-colors duration-300 hover:bg-gray-600"
                                onClick={() => updateQuantity(movie.id, 1)}
                              >
                                +
                              </button>
                            </div>

                            <p className="text-gray-500">|</p>

                            <button
                              className="w-fit text-xs text-gray-400 transition-colors duration-300 hover:text-gray-300"
                              onClick={() => removeFromCart(movie.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>

                        <p className="text-right text-xl">${movie.price}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Checkout */}
        <div className="flex flex-col gap-2">
          {totalQuantity > 3 && (
            <div className="flex justify-between text-gray-400">
              <p>{discountedPrice.discount}% discount</p>
              <p className="line-through">${totalPrice}</p>
            </div>
          )}

          <div className="flex justify-between text-2xl">
            <p className="text-gray-400">Total</p>

            <p>${totalQuantity > 3 ? discountedPrice.price : totalPrice}</p>
          </div>

          <button
            className="w-full rounded-lg bg-violet-600 px-2 py-4 transition-colors duration-300 hover:bg-violet-700"
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </div>
      </div>

      {/* Checkout Popup */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-16 backdrop-blur-sm">
          <div className="flex h-auto w-full min-w-fit max-w-[45rem] flex-col items-center gap-5 rounded-2xl bg-gray-800 p-6 text-white">
            <div className="flex flex-col items-center">
              <p className="text-center text-2xl font-semibold">Send Payment</p>
              <p className="text-sm text-gray-400">Time left: {countdown}s</p>
            </div>

            <img
              src="/checkout_qrcode_image.png"
              alt="Bank account QR Code"
              className="h-full w-full max-w-[20rem] object-contain"
            />

            <div className="flex flex-col items-center text-lg">
              <p className="text-gray-400">
                Address:{" "}
                <span className="text-gray-300">1-2345-67890-12-3</span>
              </p>

              <p className="text-gray-400">
                Total:{" "}
                <span className="text-gray-300">
                  ${totalQuantity > 3 ? discountedPrice.price : totalPrice}
                </span>
              </p>
            </div>

            <button
              className="mt-4 rounded-md bg-red-600 px-4 py-2 transition-colors duration-300 hover:bg-red-700"
              onClick={() => setIsCheckoutOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Darken elements below */}
      {isCartOpen && (
        <div
          className={`fixed inset-0 z-40 bg-black/50 ${!isCheckoutOpen ? "backdrop-blur-sm" : ""}`}
          onClick={toggleCart}
        ></div>
      )}
    </>
  );
}

export default MyCart;
