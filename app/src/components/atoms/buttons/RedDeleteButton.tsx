import { useRouter } from "next/router";
import { deleteData } from "src/utils/api/deleteData";

export const RedDeleteButton = ({ path }: { path: string }) => {
  const router = useRouter();
  const displayLatestData = async () => {
    await deleteData(path)
    router.reload()
  };

  return (
    <button
      className="bg-transparent hover:bg-red-500 text-red-700 hover:text-white py-1 px-3 border border-red-500 hover:border-transparent rounded"
      onClick={() => displayLatestData()}
    >
      削除
    </button>
  )
}
