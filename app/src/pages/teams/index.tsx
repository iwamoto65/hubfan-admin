import type { NextPage } from 'next';
import useSWR from 'swr';
import { Dispatch, SetStateAction, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { fetchData } from 'src/utils/api/fetchData';
import { GreenEditButton } from 'src/components/atoms/buttons/GreenEditButton';
import { RedDeleteButton } from 'src/components/atoms/buttons/RedDeleteButton';

type NameStateType = {
  nameSearchWord: string
  setNameSearchWord: Dispatch<SetStateAction<string>>
}

type InputsType = {
  name: string
}

const SearchForm = (props: NameStateType) => {
  const { nameSearchWord, setNameSearchWord } = props;
  const { register, handleSubmit, formState: { errors } } = useForm<InputsType>();
  const onSubmit: SubmitHandler<InputsType> = data => setNameSearchWord(data.name);

  return (
    <div className='m-10'>
      <form onSubmit={handleSubmit(onSubmit)} >
        <label htmlFor="name">チーム名</label>
        <br />
        <input type="text" defaultValue={nameSearchWord} {...register("name")} />
        <br />
        {errors.name && <span>エラー：{ errors }</span>}
        <button type='submit'>検索</button>
      </form>
    </div>
  )
}

const Team: NextPage = () => {
  const [nameSearchWord, setNameSearchWord] = useState<string>('');

  const fetcher = async (path: string) => await fetchData(path);
  const { data: teams } = useSWR('/v1/teams' + `?q[name_cont]=${nameSearchWord}`, fetcher);

  const hitCount: number = teams ? teams.length : 0;

  return (
    <>
      <SearchForm
        nameSearchWord={nameSearchWord}
        setNameSearchWord={setNameSearchWord}
      />

      <p>{ hitCount }件</p>

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
