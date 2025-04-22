# Optimized Virtualized Masonry Grid with Detailed Photo View

This Single Page Application (SPA) is built using Vite, React, and TypeScript to showcase a responsive and optimized masonry grid layout of photos fetched from the Pexels API. It includes a detailed view for individual photos and emphasizes performance and responsiveness.

## Setup Instructions

1.  **Installation:**
    ```bash
    git clone https://github.com/garik-s/react-masonry-grid.git
    cd react-masonry-grid
    npm install
    ```
2.  **Create an `.env.local` file in the root of the project and add your Pexels API key:**
    ```bash
    VITE_PEXELS_API_KEY=your_actual_api_key
    ```
    You can get your API key from [Pexels API](https://www.pexels.com/api/key/).

3.  **Build and Preview:**
    ```bash
    npm run build
    npm run preview
    ```

4.  **Run in development**
    ```bash
    npm run dev
    ```
5.  **Run tests**
    ```bash
    npm run test
    ```

## Tech Stack
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Styled Components](https://styled-components.com/)
- [Pexels API](https://www.pexels.com/api/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vitest](https://vitest.dev/)

## Features & Design Decisions

-    **Virtualized Grid** Custom logic renders only visible images, minimizing DOM nodes for large datasets
-    **Infinite Scroll** Intersection Observer with throttling to load pages of photos as the user nears the bottom.
-    **Photo Details:** Click a photo to see a larger image with photographer info; navigate back to the grid.
-    **Error Handling:** Global `ErrorBoundary` wraps the app to catch runtime errors.
-    **TypeScript:**  Strong typing ensures maintainability.
-    **Responsive Design:** Grid adapts to different screen sizes.
-    **Debounced Search:** Delays API calls until typing pauses, preventing unnecessary requests during rapid input.
-    **Unit Testing:** Core hooks and components tested with Vitest and Testing Library, mocking API and observer behaviors.


## Performance Considerations

-    **Lighthouse Performance** Ensured the application passed key performance metrics on Lighthouse, including First Contentful Paint (FCP) and Largest Contentful Paint (LCP).
-    **Infinite Scroll Optimization:** Uses IntersectionObserver with throttling to efficiently load more content only when necessary.
-    **Code Splitting:**: Vite’s built-in code-splitting ensures that only the necessary JavaScript is loaded, reducing initial bundle size.
-    **Debounced Search:**: Minimizes unnecessary requests by limiting the frequency of API calls during search input.
-    **Memoization:**: `useCallback` and `React.memo` prevent unnecessary re-renders.
-    **Lazy Loading:**: Images and data are loaded only when needed, reducing initial load time and improving perceived performance.