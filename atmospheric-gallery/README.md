# Atmospheric Gallery

A modern and visually appealing gallery to showcase photos in a beautifully structured grid layout, enhanced with smooth animations and transitions.

## Features

- **Responsive Grid Layout**: Automatically adjusts columns based on screen size
- **Multiple Layout Options**: Choose between grid and masonry layouts
- **Dark Mode Support**: Toggle between light and dark themes with persistent preferences
- **Image Filtering**: Filter images by category
- **Search Functionality**: Search images by description
- **Full-Screen Modal**: View images in a full-screen modal with navigation
- **Image Download**: Download images directly from the modal view
- **Gallery Statistics**: View statistics about the image collection
- **Smooth Animations**: Powered by Framer Motion for fluid transitions
- **Dynamic Hover Effects**: Interactive elements with subtle animations
- **Optimized Images**: Using query parameters for better performance
- **Scroll to Top**: Easily return to the top of the page

## Technologies Used

- React.js
- Tailwind CSS
- Framer Motion
- Vite

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/atmospheric-gallery.git
   ```

2. Navigate to the project directory:

   ```
   cd atmospheric-gallery
   ```

3. Install dependencies:

   ```
   npm install
   ```

4. Start the development server:

   ```
   npm run dev
   ```

5. Open your browser and visit:
   ```
   http://localhost:5173
   ```

## Customization

### Adding Your Own Images

Edit the `src/data.js` file to include your own image URLs, descriptions, and categories.

### Styling

The application uses Tailwind CSS for styling. You can customize the appearance by modifying the Tailwind configuration in `tailwind.config.js`.

## Key Components

- **Gallery**: Main component that renders the grid of images
- **ImageCard**: Displays a single image with animations and hover effects
- **ImageModal**: Full-screen modal for viewing images with navigation
- **FilterBar**: Allows filtering images by category
- **SearchBar**: Enables searching images by description
- **GalleryStats**: Displays statistics about the image collection
- **Header**: Contains the logo and dark mode toggle
- **Footer**: Contains links and copyright information
- **ScrollToTop**: Button to scroll back to the top of the page

## Deployment

This application can be easily deployed to platforms like Vercel or Netlify.

## License

MIT
