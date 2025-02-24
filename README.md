# Movie Store App

A web application that allows users to search for movies, manage a shopping cart, and apply discounts based on the number of selected movies.
The app uses [The Movie Database (TMDB) API](https://www.themoviedb.org/) to fetch movie details.

## Features

- **Movie Search**: Search for movies by title using the TMDB API.
- **Shopping Cart**:
  - Add movies to the cart.
  - Persist cart data even after closing and reopening the browser.
  - Apply discounts:
    - **10% off** when buying **more than 3 movies**.
    - **20% off** when buying **more than 5 movies**.
  - Clear the cart with a single click.
  - Checkout with a payment popup displaying the bank details and a **1-minute countdown timer**.

## Installation & Setup

1. **Clone the repository:**

   ```sh
   git clone https://github.com/sappakit/movie-store-app.git
   cd movie-store-app
   ```

2. **Set up environment variables:**

   - Create a `.env` file in the project root.
   - Add the following:

     ```sh
     # TMDB API KEY
     VITE_TMDB_API_KEY=your_api_key_here

     # TMDB URL
     VITE_TMDB_BASE_URL="https://api.themoviedb.org/3"
     VITE_TMDB_IMAGE_BASE_URL="https://image.tmdb.org/t/p"
     ```

3. **Install dependencies:**

   ```sh
   npm install
   ```

4. **Run the application:**
   ```sh
   npm run dev
   ```
