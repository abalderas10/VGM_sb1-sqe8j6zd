# VillaGaleon - Luxury Villa & Yacht Experience

A luxury villa rental and yacht experience platform built with React, Vite, and Express.js.

## Features

- Responsive design with Tailwind CSS
- Admin dashboard for content management
- Photo management system
- Blog post system
- Interactive maps with Google Maps API
- Real-time chat system
- Booking system

## Tech Stack

### Frontend
- React 18
- Vite
- TypeScript
- Tailwind CSS
- React Router DOM
- Lucide React icons

### Backend
- Express.js
- SQLite with Prisma ORM
- JWT Authentication
- Multer for file uploads

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/villagaleon.git
cd villagaleon
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
DATABASE_URL="file:./prisma/dev.db"
JWT_SECRET="your-secret-key"
```

4. Initialize the database:
```bash
npm run prisma:generate
npm run prisma:migrate
```

5. Start the development server:
```bash
npm run dev:full
```

## Project Structure

```
villagaleon/
├── src/                  # Frontend source code
│   ├── components/       # React components
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # Page components
│   ├── services/        # API services
│   ├── types/           # TypeScript types
│   └── utils/           # Utility functions
├── server/              # Backend source code
│   ├── src/
│   │   ├── config/      # Server configuration
│   │   ├── middleware/  # Express middleware
│   │   ├── routes/      # API routes
│   │   └── utils/       # Server utilities
│   └── prisma/          # Database schema and migrations
├── public/              # Static assets
└── uploads/            # Uploaded files
```

## Available Scripts

- `npm run dev` - Start frontend development server
- `npm run dev:server` - Start backend development server
- `npm run dev:full` - Start both frontend and backend servers
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.