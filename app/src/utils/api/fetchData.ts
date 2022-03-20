import camelcaseKeys from "camelcase-keys"

export const fetchData = async (path: string): Promise<{ [key: string]: any }[]> => {
  const endpoint = 'http://hubfan_rails_backend:3000/api/admin' + path;
  const res = await fetch(endpoint, { method: 'GET' }).then(res => res.json());

  return camelcaseKeys(res);
}
