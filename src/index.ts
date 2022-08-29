const CRAFT_SHARE_URL = 'https://www.craft.do/s/14wcMZETfsxHf7';

const worker = {
  async fetch(request: Request) {
    const url = new URL(request.url);
    switch (true) {
      case url.pathname === '/':
        return Response.redirect(CRAFT_SHARE_URL, 307);
      default:
        return response.json({ pathname: url.pathname });
    }
  },
};

const response = {
  json: (json: Object) =>
    new Response(JSON.stringify(json), {
      headers: {
        'Content-Type:': 'application/json',
      },
    }),
};

export default worker;
