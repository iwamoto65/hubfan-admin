import type { NextPage } from 'next';
import useSWR, { SWRConfig } from 'swr';
import { fetchData } from 'src/utils/api/fetchData';
import { GreenEditButton } from 'src/components/atoms/buttons/GreenEditButton';
import { RedDeleteButton } from 'src/components/atoms/buttons/RedDeleteButton';

export const getStaticProps = async () => {
  const res = await fetchData('/v1/teams');

  return {
    props: {
      fallback: {
        '/teams': res
      }
    }
  }
}

const TeamContainer: NextPage = () => {
  const { data } = useSWR('/teams')
  const teams:  { id: number, name: string, dateEstablished: string }[] = data;

  return (
    <>
      <div className='flex justify-center'>
        <table className="w-11/12 mt-10">
          <thead>
            <tr className='text-left'>
              <th className="px-3 py-3 text-white bg-gray-700 rounded-tl">チーム名</th>
              <th className="w-2/12 px-3 py-3 text-white bg-gray-700">設立年月日</th>
              <th className="w-1/12 px-3 py-3 bg-gray-700"></th>
              <th className="w-1/12 px-3 py-3 bg-gray-700 rounded-tr"></th>
            </tr>
          </thead>
          <tbody>
            {teams.map(team => (
              <tr className='text-left border-b border-gray-300' key={team.id}>
                <td className="px-3 py-3">{ team.name }</td>
                <td className="px-3 py-3">{ team.dateEstablished }</td>
                <td className="px-3 py-3"><GreenEditButton path={`teams/${team.id}`} /></td>
                <td className="px-3 py-3"><RedDeleteButton path={`teams/${team.id}`} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

const Team = ({ fallback }: { [key: string]: any }) => {
  return (
    <SWRConfig value={{ fallback }}>
      <TeamContainer />
    </SWRConfig>
  )
}

export default Team
