export const helpHttp = () => {
  const customFetch = (endpoint:any, options:any) => {
    const defaultHeader = {
      accept: "application/json",
    };

    const controller = new AbortController();
    options.signal = controller.signal;

    options.method = options.method || "GET";
    options.headers = options.headers
      ? { ...defaultHeader, ...options.headers }
      : defaultHeader;

    options.body = JSON.stringify(options.body) || false;
    if (!options.body) delete options.body;

    //console.log(options);
    setTimeout(() => controller.abort(), 3000);

    return fetch(endpoint, options)
      .then((res) =>
        res.ok
          ? res.json()
          : Promise.reject({
              err: true,
              status: res.status || "00",
              statusText: res.statusText || "Ocurrió un error",
            })
      )
      .catch((err) => err);
  };

  const get = (url:string, options = {}) => customFetch(url, options);

  const post = (url:string, options : {
    method: string;
    headers: { "Content-Type": string; };
    body: string;
    signal: AbortSignal;
  }) => {
    options.method = "POST";
    return customFetch(url, options);
  };

  const put = (url:string, options : {
    method: string;
    headers: { "Content-Type": string; };
    body: string;
    signal: AbortSignal;
  }) => {
    options.method = "PUT";
    return customFetch(url, options);
  };

  const del = (url:string, options:{
    method: string;
    headers: { "Content-Type": string; };
    body: string;
    signal: AbortSignal;
  }) => {
    options.method = "DELETE";
    return customFetch(url, options);
  };

  return {
    get,
    post,
    put,
    del,
  };
};
