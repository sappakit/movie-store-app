function MyCart({
  toggleCart,
  isCartOpen,
  cartItems,
  removeFromCart,
  clearCart,
}) {
  const IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

  return (
    <>
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
              {cartItems.length} {cartItems.length > 1 ? "Items" : "Item"}
            </p>
          </div>

          {cartItems.length > 0 && (
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
                            <p className="text-sm text-gray-400">Qty: 1</p>

                            <div className="flex gap-1">
                              <button className="flex h-4 w-4 items-center justify-center rounded-sm bg-gray-700 text-xs transition-colors duration-300 hover:bg-gray-600">
                                -
                              </button>
                              <button className="flex h-4 w-4 items-center justify-center rounded-sm bg-gray-700 text-xs transition-colors duration-300 hover:bg-gray-600">
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
          <div className="flex justify-between text-2xl">
            <p className="text-gray-400">Total</p>
            <p>$300.00</p>
          </div>

          <button className="w-full rounded-lg bg-violet-600 px-2 py-4">
            Checkout
          </button>
        </div>
      </div>

      {/* Darken elements below */}
      {isCartOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
          onClick={toggleCart}
        ></div>
      )}
    </>
  );
}

export default MyCart;
