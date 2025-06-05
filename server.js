"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const PORT = parseInt(process.env.PORT || '3000', 10);
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Serve static files from the current directory
app.use(express_1.default.static(__dirname));
// Serve the main HTML file at the root
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, 'index.html'));
});
// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Card Generator Server is running!' });
});
// Handle 404s
app.use((req, res) => {
    res.status(404).send(`
        <h1>404 - Page Not Found</h1>
        <p>The page you're looking for doesn't exist.</p>
        <a href="/">Go back to Card Generator</a>
    `);
});
// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server Error:', err.stack);
    res.status(500).send(`
        <h1>500 - Server Error</h1>
        <p>Something went wrong on the server.</p>
        <a href="/">Go back to Card Generator</a>
    `);
});
// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Card Generator Server is running!`);
    console.log(`📍 Local: http://localhost:${PORT}`);
    console.log(`🔧 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`⏰ Started at: ${new Date().toLocaleString()}`);
    console.log('=====================================');
});
