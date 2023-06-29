import chroma from 'chroma-js';
import { IncomingMessage, ServerResponse } from 'http';
import { PNG } from 'pngjs';
import url from 'url';

const SEO_IMG_SIZE = 80;

export default function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method === 'GET') {
    if (req.url) {
      const parsed = url.parse(req.url);
      const split = parsed.path ? parsed.path.split('/') : undefined;

      const file = split?.[split.length - 1];
      const fileSplit = file?.split('.');

      const hex = fileSplit?.[0];
      const ext = fileSplit?.[1];

      if (hex?.length !== 6 || ext !== 'png') {
        res.writeHead(404, 'File not found');
        res.end();
        return;
      }

      res.setHeader('Content-Type', 'image/png');

      const [r, g, b] = chroma(hex).rgb();

      const png = new PNG({
        width: SEO_IMG_SIZE,
        height: SEO_IMG_SIZE,
        filterType: -1,
      });

      for (let y = 0; y < png.height; y++) {
        for (let x = 0; x < png.width; x++) {
          const idx = (png.width * y + x) << 2;
          png.data[idx] = r; // red
          png.data[idx + 1] = g; // green
          png.data[idx + 2] = b; // blue
          png.data[idx + 3] = 255; // alpha (0 is transparent)
        }
      }
      png.pack().pipe(res);
    } else {
      return;
    }
  }
}
