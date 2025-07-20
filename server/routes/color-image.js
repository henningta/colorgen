import chroma from 'chroma-js';
import { PNG } from 'pngjs';

// const hexChars = [
//   '0',
//   '1',
//   '2',
//   '3',
//   '4',
//   '5',
//   '6',
//   '7',
//   '8',
//   '9',
//   'A',
//   'B',
//   'C',
//   'D',
//   'E',
//   'F',
//   'a',
//   'b',
//   'c',
//   'd',
//   'e',
//   'f',
// ];

/**
 * Checks a value to ensure it is a proper rgb or rgba hex code, short or long.
 * @param {string} value
 * @returns True for valid hex codes (3, 4, 6, or 8 characters)
 */
// const checkHex = (value) => {
//   if (!value || typeof value !== 'string') {
//     return false;
//   }

//   if (![3, 4, 6, 8].includes(value.length)) {
//     return false;
//   }

//   for (const c in value) {
//     if (!(c in hexChars)) {
//       return false;
//     }
//   }

//   return true;
// };

// const parseHex = (value) => {

// }

/** SEO Image Size */
const SEO_IMG_SIZE = 80;

/**
 *
 * @param {import('fastify').FastifyInstance} app
 */
export default async function colorImageRoute(app) {
  app.get('/api/:hex.png', async (req, reply) => {
    const { hex } = req.params;

    // Validate hex code
    if (!/^[0-9a-fA-F]{6}$/.test(hex)) {
      // if (!checkHex(hex)) {
      reply.code(404).send('Invalid hex code');
      return;
    }

    const [red, green, blue, alpha] = chroma(hex).rgba();
    // const [red, green, blue, alpha] = parseHex(hex);

    console.log(alpha);

    // Create PNG image
    const png = new PNG({
      width: SEO_IMG_SIZE,
      height: SEO_IMG_SIZE,
      filterType: -1,
      bitDepth: 8, // 0-255
      colorType: alpha === 1 ? 6 : 2, // rgba (6) or rgb (2)
      // bgColor: { red, green, blue },
    });

    // Set all pixels to be fully transparent (or partially transparent)
    for (let y = 0; y < png.height; y++) {
      for (let x = 0; x < png.width; x++) {
        const idx = (png.width * y + x) << 2;

        // Set RGB values
        png.data[idx] = red;
        png.data[idx + 1] = green;
        png.data[idx + 2] = blue;

        // Set Alpha value (0 for fully transparent, 255 for fully opaque, or any value in between)
        png.data[idx + 3] = alpha * 255; // Fully transparent
      }
    }

    reply.header('Content-Type', 'image/png').send(png.pack());
  });
}
