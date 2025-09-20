# Library App

A modern, responsive web application for discovering and exploring books. Built with React and Material-UI, this application provides a seamless experience for browsing trending books, searching through a vast collection, and discovering random books across different genres.

## Features

### 📚 Trending Books
- View daily trending books
- Categorized sections:
  - Popular Fiction
  - Science & Technology
  - History & Biography
- Real-time trending rankings
- Book ratings and author information

### 🔍 Book Search
- Search by title, author, or ISBN
- Advanced filtering options
- Real-time search results
- Beautiful book card displays
- Detailed book information overlay 

### 🎲 Random Discovery
- Discover random books from different genres
- Genre-based exploration
- "Surprise Me" feature for serendipitous finds
- Automatic genre rotation

### 💫 User Interface
- Modern, responsive design
- Dark/Light mode support
- Smooth animations and transitions
- Loading states and error handling
- Mobile-friendly layout

## Technologies Used

- **React**: Frontend library for building user interfaces
- **Material-UI**: React UI framework for faster and easier web development
- **Axios**: Promise based HTTP client for making API requests
- **Open Library API**: Comprehensive book database and API
- **Vite**: Next generation frontend tooling

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm package manager

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd library_app
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm dev
```

4. Build for production
```bash
npm build
```

## Project Structure

```
library_app/
├── src/
│   ├── components/         # Reusable components
│   │   ├── BookCard.jsx
│   │   ├── BookDetailsOverlay.jsx
│   │   ├── Header.jsx
│   │   └── SkeletonLoading.jsx
│   ├── pages/             # Page components
│   │   ├── About.jsx
│   │   ├── Browse.jsx
│   │   ├── Random.jsx
│   │   └── Trending.jsx
│   ├── styles/            # Global styles
│   │   └── theme.js
│   ├── App.jsx           # Root component
│   └── main.jsx         # Entry point
├── public/              # Static assets
├── index.html
├── package.json
└── vite.config.js
```

## Features in Detail

### Book Cards
- Dynamic book cover display
- Title and author information
- Rating system
- Trending rank indicator (when applicable)
- Hover effects and animations
- Click to view detailed information

### Book Details Overlay
- Large cover image display
- Comprehensive book information
- Book description
- Author details
- Loading states
- Error handling with retry options

### Error Handling
- Graceful error states
- User-friendly error messages
- Retry functionality
- Network error handling
- Loading states
- Fallback UI components

## API Integration

The application uses the Open Library API for fetching book data:
- Trending books: `/trending/daily.json`
- Search: `/search.json`
- Book details: `/{bookKey}.json`

## Acknowledgments

- Open Library API for providing comprehensive book data
- Material-UI team for the excellent UI components