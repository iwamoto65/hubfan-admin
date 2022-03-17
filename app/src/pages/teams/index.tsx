import type { NextPage } from 'next';
import Router from 'next/router';

const Team: NextPage = () => {
  const pageToEdit = (name: string): Promise<boolean> => Router.push(`/teams/${name}`);
  const destroyData = (id: number): number => id;

  const teams = [
    { id: 1, name: '123', dateEstablished: '2021/12/12', numberOfMembers: 3 },
    { id: 2, name: '456', dateEstablished: '2012/12/12', numberOfMembers: 2 },
    { id: 3, name: '789', dateEstablished: '2045/12/12', numberOfMembers: 1 },
  ]

  return (
    <>
      <div className='flex justify-center'>
        <table className="w-11/12 mt-10">
          <thead>
            <tr className='text-left'>
              <th className="px-3 py-3 text-white bg-gray-700 rounded-tl">チーム名</th>
              <th className="w-2/12 px-3 py-3 text-white bg-gray-700">設立年月日</th>
              <th className="w-1/12 px-3 py-3 text-white bg-gray-700">所属人数</th>
              <th className="w-1/12 px-3 py-3 bg-gray-700"></th>
              <th className="w-1/12 px-3 py-3 bg-gray-700 rounded-tr"></th>
            </tr>
          </thead>
          <tbody>
            {teams.map(team => (
              <tr className='text-left border-b border-gray-300' key={team.id}>
                <td className="px-3 py-3">{ team.name }</td>
                <td className="px-3 py-3">{ team.dateEstablished }</td>
                <td className="px-3 py-3">{ team.numberOfMembers }</td>
                <td className="px-3 py-3">
                  <button
                    className="bg-transparent hover:bg-green-500 text-green-700 hover:text-white py-1 px-3 border border-green-500 hover:border-transparent rounded"
                    onClick={() => pageToEdit(team.name)}
                  >
                    編集
                  </button>
                </td>
                <td className="px-3 py-3">
                  <button
                    className="bg-transparent hover:bg-red-500 text-red-700 hover:text-white py-1 px-3 border border-red-500 hover:border-transparent rounded"
                    onClick={() => destroyData(team.id)}
                  >
                    削除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Team
