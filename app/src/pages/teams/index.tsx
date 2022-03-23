import type { NextPage } from 'next';
import useSWR from 'swr';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { fetchData } from 'src/utils/api/fetchData';
import { GreenEditButton } from 'src/components/atoms/buttons/GreenEditButton';
import { RedDeleteButton } from 'src/components/atoms/buttons/RedDeleteButton';

type Inputs = {
  name: string
}

const Team: NextPage = () => {
  const [nameSearchWord, setNameSearchWord] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = data => setNameSearchWord(data.name);

  const fetcher = async (path: string) => await fetchData(path);
  const { data: teams } = useSWR('/v1/teams' + `?q[name_cont]=${nameSearchWord}`, fetcher);
  const hitCount: number = teams ? teams.length : 0;

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="m-10" >
        <label htmlFor="name">チーム名</label>
        <br />
        <input type="text" defaultValue={nameSearchWord} {...register("name")} />
        <br />
        {errors.name && <span>エラー：{ errors }</span>}
        <button type='submit'>検索</button>
      </form>

      <div>{ hitCount }件</div>

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
            {teams?.map(team => (
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

export default Team
