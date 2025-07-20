import { createServerFileRoute } from '@tanstack/react-start/server';
import chroma from 'chroma-js';
import { PNG } from 'pngjs';
import { nodeReadableToFetchReadable } from '~/utils';

const SEO_IMG_SIZE = 80;

export const ServerRoute = createServerFileRoute('/api/$color').methods({
  GET: ({ params }) => {
    const { color } = params;

    if (!/^[0-9a-fA-F]{6}\.png$/.test(color)) {
      return new Response('Invalid file name.', { status: 404 });
    }

    const hex = color.split('.')[0];

    const [red, green, blue, alpha] = chroma(hex).rgba();

    const png = new PNG({
      width: SEO_IMG_SIZE,
      height: SEO_IMG_SIZE,
      filterType: -1,
      bitDepth: 8,
      colorType: alpha === 1 ? 6 : 2,
    });

    for (let y = 0; y < png.height; y++) {
      for (let x = 0; x < png.width; x++) {
        const idx = (png.width * y + x) << 2;
        png.data[idx] = red;
        png.data[idx + 1] = green;
        png.data[idx + 2] = blue;
        png.data[idx + 3] = alpha * 255;
      }
    }

    const stream = nodeReadableToFetchReadable(png.pack());
    return new Response(stream, {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
      },
    });
  },
});
