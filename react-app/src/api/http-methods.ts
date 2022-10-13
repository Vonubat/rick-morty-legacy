class HttpMethods {
  public async get(link: RequestInfo | URL): Promise<Response> {
    const props: RequestInit = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    const response: Response = await fetch(link, props);
    return response;
  }
}

export default HttpMethods;
