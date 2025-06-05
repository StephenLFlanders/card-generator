import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';

const app = express();
const PORT: number = parseInt(process.env.PORT || '3000', 10);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the parent directory (where index.html and assets are)
app.use(express.static(path.join(__dirname, '..')));

// Serve the main HTML file at the root
app.get('/', (req: Request, res: Response): void => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// Health check endpoint
app.get('/health', (req: Request, res: Response): void => {
    res.json({ status: 'OK', message: 'Card Generator Server is running!' });
});

// Handle 404s
app.use((req: Request, res: Response): void => {
    res.status(404).send(`
        <h1>404 - Page Not Found</h1>
        <p>The page you're looking for doesn't exist.</p>
        <a href="/">Go back to Card Generator</a>
    `);
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
    console.error('Server Error:', err.stack);
    res.status(500).send(`
        <h1>500 - Server Error</h1>
        <p>Something went wrong on the server.</p>
        <a href="/">Go back to Card Generator</a>
    `);
});

// Start the server
app.listen(PORT, (): void => {
    console.log(`🚀 Card Generator Server is running!`);
    console.log(`📍 Local: http://localhost:${PORT}`);
    console.log(`🔧 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`⏰ Started at: ${new Date().toLocaleString()}`);
    console.log('=====================================');
}); 