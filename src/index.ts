const CRAFT_SHARE_URL = 'https://www.craft.do/s/14wcMZETfsxHf7';

const worker = {
  async fetch(request: Request) {
    const url = new URL(request.url);
    switch (true) {
      case url.pathname === '/':
        return response.redirect(CRAFT_SHARE_URL);
      default:
        return response.json({ pathname: url.pathname });
    }
  },
};

const response = {
  redirect: (destination: string, statusCode: number = 307) =>
    Response.redirect(destination, statusCode),
  json: (json: Object) =>
    new Response(JSON.stringify(json), {
      headers: {
        'Content-Type:': 'application/json',
      },
    }),
};

export default worker;
