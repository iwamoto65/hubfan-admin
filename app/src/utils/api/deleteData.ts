export const deleteData = async (path: string) => {
  const endpoint = 'http://localhost:3000/api/admin/v1/' + path;

  await fetch(endpoint, { method: 'DELETE' })
    .then(res => res.json())
    .catch(error => console.log(error));
}
