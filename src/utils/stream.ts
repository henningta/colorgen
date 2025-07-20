import { Readable } from 'stream';

export const nodeReadableToFetchReadable = (stream: Readable) =>
  new ReadableStream({
    start: (controller) => {
      stream.on('data', (chunk) => {
        controller.enqueue(
          typeof chunk === 'string' ? Buffer.from(chunk) : chunk,
        );
      });
      stream.on('end', () => controller.close());
      stream.on('error', (err) => controller.error(err));
    },
    cancel: (reason: Error) => {
      stream.destroy(reason);
    },
  });
