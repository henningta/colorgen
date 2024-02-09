import chroma from 'chroma-js';
import { IncomingMessage, ServerResponse } from 'http';
import { PNG } from 'pngjs';

const SEO_IMG_SIZE = 80;

const fileRegex = /^\/api\/(?<hex>[0-9a-fA-F]{6})\.png$/;

export default function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== 'GET' || !req.url) {
    return;
  }

  res.setHeader('Content-Type', 'image/png');

  const match = req.url.match(fileRegex);

  const hex = match?.groups?.hex;

  if (!hex) {
    res.writeHead(404, 'File not found');
    res.end();
    return;
  }

  const [red, green, blue] = chroma(hex).rgb();

  const png = new PNG({
    width: SEO_IMG_SIZE,
    height: SEO_IMG_SIZE,
    filterType: -1,
    bitDepth: 8, // 0-255
    colorType: 2, // color, no alpha
    bgColor: { red, green, blue },
  });

  png.pack().pipe(res);
}
