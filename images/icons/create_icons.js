const fs = require('fs');
const path = require('path');

const iconData = [
    { filename: 'favicon-16x16.png', data: 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAB5JREFUOE9jZKAQMFKon2HUqFEfCQAAAP//AwA29AAB' },
    { filename: 'favicon-32x32.png', data: 'iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAFBJREFUOE9jZKAQMFKon2HUqFEfCQAAAP//AwA29AAB' },
    { filename: 'icon-72x72.png', data: 'iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNnAAAAAXNSR0IArs4c6QAAAGJJREFUOE9jZKAQMFKon2HUqFEfCQAAAP//AwA29AAB' },
    { filename: 'icon-96x96.png', data: 'iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAAAXNSR0IArs4c6QAAAGJJREFUOE9jZKAQMFKon2HUqFEfCQAAAP//AwA29AAB' },
    { filename: 'icon-128x128.png', data: 'iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAAXNSR0IArs4c6QAAAGJJREFUOE9jZKAQMFKon2HUqFEfCQAAAP//AwA29AAB' },
    { filename: 'icon-144x144.png', data: 'iVBORw0KGgoAAAANSUhEUgAAAJAAAACQCAYAAADnRuK4AAAAAXNSR0IArs4c6QAAAGJJREFUOE9jZKAQMFKon2HUqFEfCQAAAP//AwA29AAB' },
    { filename: 'icon-152x152.png', data: 'iVBORw0KGgoAAAANSUhEUgAAAJgAAACYCAYAAAAYwiAhAAAAAXNSR0IArs4c6QAAAGJJREFUOE9jZKAQMFKon2HUqFEfCQAAAP//AwA29AAB' },
    { filename: 'apple-touch-icon.png', data: 'iVBORw0KGgoAAAANSUhEUgAAALQAAAC0CAYAAAA9zQYtAAAAAXNSR0IArs4c6QAAAGJJREFUOE9jZKAQMFKon2HUqFEfCQAAAP//AwA29AAB' },
    { filename: 'icon-192x192.png', data: 'iVBORw0KGgoAAAANSUhEUgAAAMAAAADACAYAAABS3GwHAAAAAXNSR0IArs4c6QAAAGJJREFUOE9jZKAQMFKon2HUqFEfCQAAAP//AwA29AAB' },
    { filename: 'icon-384x384.png', data: 'iVBORw0KGgoAAAANSUhEUgAAAYAAAAGACAYAAACkx7W/AAAAAXNSR0IArs4c6QAAAGJJREFUOE9jZKAQMFKon2HUqFEfCQAAAP//AwA29AAB' },
    { filename: 'icon-512x512.png', data: 'iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eP51AAAAAXNSR0IArs4c6QAAAGJJREFUOE9jZKAQMFKon2HUqFEfCQAAAP//AwA29AAB' }
];

const outputDir = __dirname;

iconData.forEach(icon => {
    const base64Data = icon.data.replace(/^data:image\/png;base64,/, "");
    const outputPath = path.join(outputDir, icon.filename);
    fs.writeFileSync(outputPath, base64Data, 'base64');
    console.log(`Created ${icon.filename}`);
});

console.log('All icons created successfully!');