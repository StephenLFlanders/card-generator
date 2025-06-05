# FIFA-Style Playing Card Generator (TypeScript)

A modern web application for creating custom FIFA-style playing cards with TypeScript backend and frontend.

## Features

- 🎨 **Custom Player Cards**: Upload character images and create FIFA-style cards
- ⚽ **Authentic FIFA Design**: Proper card shape with curved edges and gold gradient background
- 📊 **Player Stats**: Customizable player ratings, position, and statistics
- 🎯 **Perfect Positioning**: Centered character images with oval clipping
- 💾 **Download Ready**: Export high-quality PNG cards
- 🔒 **Type Safety**: Full TypeScript implementation for better development experience

## Technology Stack

- **Frontend**: TypeScript, HTML5 Canvas API, Tailwind CSS
- **Backend**: Node.js, Express.js, TypeScript
- **Development**: ts-node-dev for hot reloading
- **Build System**: TypeScript compiler (tsc)

## Project Structure

```
card-generator/
├── src/
│   ├── card-generator.ts    # Main TypeScript logic for card generation
│   └── server.ts           # Express server with TypeScript
├── dist/                   # Compiled JavaScript files
├── index.html             # Main HTML interface
├── card-template.png      # FIFA card background template
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
└── README.md             # This file
```

## Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation

1. **Clone or download the project**
2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```
   This starts the TypeScript development server with hot reloading.

4. **Open your browser:**
   ```
   http://localhost:3000
   ```

### Build for Production

1. **Compile TypeScript:**
   ```bash
   npm run build
   ```

2. **Start production server:**
   ```bash
   npm start
   ```

## Available Scripts

- `npm run dev` - Start development server with TypeScript hot reloading
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start production server (requires build first)
- `npm run dev:build` - Watch mode TypeScript compilation
- `npm run clean` - Remove compiled files

## TypeScript Features

### Type Safety
- Strong typing for all DOM elements and canvas operations
- Interface definitions for card statistics and parameters
- Proper error handling with typed exceptions

### Class-Based Architecture
- `CardGenerator` class encapsulates all functionality
- Private methods for better encapsulation
- Definite assignment assertions for strict mode compliance

### Modern Development
- ES2020 target for modern JavaScript features
- Strict TypeScript configuration
- Hot reloading for fast development

## How to Use

1. **Upload an Image**: Click "Upload Character Image" and select your player photo
2. **Enter Player Details**: Fill in the player name, overall rating, and position
3. **Set Statistics**: Add custom stats like RUN, DIS, PAC, etc.
4. **Generate Card**: Click "Generate Card" to create your custom FIFA card
5. **Download**: Use the "Download Card" button to save your creation

## Card Specifications

- **Dimensions**: 380x560 pixels (authentic FIFA ratio)
- **Format**: PNG with transparency support
- **Shape**: Authentic FIFA curved edges with smooth transitions
- **Background**: Gold gradient template matching real FIFA cards
- **Character**: Centered oval clipping for professional appearance

## Technical Details

### Canvas Implementation
- HTML5 Canvas with TypeScript for type-safe graphics
- Advanced path clipping for authentic card shapes
- Proper image scaling and positioning

### Server Architecture
- Express.js with TypeScript for better maintainability
- CORS enabled for cross-origin requests
- Static file serving with proper error handling
- Health check endpoint for monitoring

### Development Experience
- Full TypeScript intellisense and error checking
- Hot reloading for instant feedback
- Modular architecture for easy maintenance

## Browser Compatibility

- Modern browsers with Canvas API support
- Chrome, Firefox, Safari, Edge (latest versions)
- Mobile browsers supported

## Troubleshooting

### Common Issues

1. **Image not loading**: Ensure your image is in a supported format (JPG, PNG, WebP)
2. **Download not working**: Check that your browser allows downloads from localhost
3. **Server not starting**: Make sure port 3000 is not in use by another application

### Development Issues

1. **TypeScript errors**: Run `npm run build` to check for compilation errors
2. **Server crashes**: Check the console output for detailed error messages
3. **Hot reload not working**: Restart the dev server with `npm run dev`

## Contributing

Feel free to submit issues, feature requests, or pull requests to improve this project!

## License

MIT License - feel free to use this project for personal or commercial purposes. 

//