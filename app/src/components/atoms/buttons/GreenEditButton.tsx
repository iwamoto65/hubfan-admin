import Router from 'next/router';

export const GreenEditButton = ({ path }: { path: string }) => {
  const pageToEdit = (): Promise<boolean> => Router.push(path);

  return (
    <button
      className="bg-transparent hover:bg-green-500 text-green-700 hover:text-white py-1 px-3 border border-green-500 hover:border-transparent rounded"
      onClick={() => pageToEdit()}
    >
      編集
    </button>
  )
}
