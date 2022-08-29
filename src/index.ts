const CRAFT_SHARE_URL = 'https://www.craft.do/s/14wcMZETfsxHf7';

const worker = {
  async fetch(request: Request) {
    try {
      const { pathname } = new URL(request.url);
      const proxyDestination = `${CRAFT_SHARE_URL}${pathname}`;
      return response.redirect(proxyDestination);
      // TODO:
      // - fetch from share url
      // - rewrite any urls _under the share url_ to point back through the proxy
      //return response.transform(fetch(new URL(proxyDestination)), (chunk) =>
      //  chunk.replaceAll(CRAFT_SHARE_URL, '')
      //);
    } catch (error) {
      if (error instanceof Error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        });
      } else {
        return new Response(JSON.stringify({ error }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }
  },
};

const response = {
  transform: async (
    source: Response | Promise<Response>,
    transform: (chunk: string) => string
  ) => {
    const { body } = await source;
    if (typeof body === 'undefined' || body === null) {
      return response.redirect('/404', 404);
    }
    return new Response(body.pipeThrough(stream.transformer(transform)));
  },
  redirect: (destination: string, statusCode: number = 307) =>
    Response.redirect(destination, statusCode),
  json: (json: Object) =>
    new Response(JSON.stringify(json), {
      headers: {
        'Content-Type:': 'application/json',
      },
    }),
};

const stream = {
  transformer: (transform: (chunk: string) => string) =>
    new TransformStream({
      transform: (
        chunk: unknown,
        controller: TransformStreamDefaultController
      ) => {
        if (typeof chunk === 'string') {
          controller.enqueue(transform(chunk));
        } else {
          controller.enqueue(chunk);
        }
      },
    }),
};

export default worker;
