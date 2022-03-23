import camelcaseKeys from "camelcase-keys"

export const fetchData = async (path: string): Promise<{ [key: string]: string | number | null }[]> => {
  const endpoint = 'http://localhost:3000/api/admin' + path;
  const res = await fetch(endpoint, { method: 'GET' }).then(res => res.json());

  return camelcaseKeys(res);
}
