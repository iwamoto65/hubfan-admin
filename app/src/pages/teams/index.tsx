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
  const [isAdvancedSearch, setIsAdvancedSearch] = useState<boolean>(false)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-5 rounded shadow-md">
      {isAdvancedSearch ?
        (
          <div className='grid grid-cols-12 grid-rows-2 gap-y-5'>
            <div className='col-start-1 col-span-9'>
              <input
                type="text"
                defaultValue={nameSearchWord}
                {...register("name")}
                placeholder="チーム名を入力"
                className="border-b p-2 border-gray-300 focus:border-blue-500 focus:outline-none w-full" />
              <p>{errors.name && <span>エラー：{errors}</span>}</p>
            </div>

            <div className='col-start-10 col-span-1 flex justify-center'>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mt-2 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1"
                onClick={() => setIsAdvancedSearch(!isAdvancedSearch)}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
              </svg>
            </div>

            <div className='col-start-1 col-span-10'>
              <label htmlFor="date-established" className='mr-5'>設立年月日</label>
              <input type="date" className='p-1 border border-gray-300 focus:border-blue-500 focus:outline-none' />
              <span className='mx-3'>~</span>
              <input type="date" className='p-1 border border-gray-300 focus:border-blue-500 focus:outline-none' />
            </div>

            <div className='col-start-11 col-span-2 text-center'>
              <button
                type='submit'
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
              >
                検索
              </button>
            </div>
          </div>
        ) : (
          <div className='grid grid-cols-12 grid-rows-1'>
            <div className='col-start-1 col-span-9'>
              <input
                type="text"
                defaultValue={nameSearchWord}
                {...register("name")}
                placeholder="チーム名を入力"
                className="border-b p-2 border-gray-300 focus:border-blue-500 focus:outline-none w-full" />
              <p>{errors.name && <span>エラー：{errors}</span>}</p>
            </div>

            <div className='col-start-10 col-span-1 flex justify-center'>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mt-2 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1"
                onClick={() => setIsAdvancedSearch(!isAdvancedSearch)}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            <div className='col-start-11 col-span-2 text-center'>
              <button
                type='submit'
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
              >
                検索
              </button>
            </div>
          </div>
        )
      }
    </form>
  )
}

const Team: NextPage = () => {
  const [nameSearchWord, setNameSearchWord] = useState<string>('');

  const fetcher = async (path: string) => await fetchData(path);
  const { data: teams } = useSWR('/v1/teams' + `?q[name_cont]=${nameSearchWord}`, fetcher);

  const hitCount: number = teams ? teams.length : 0;

  return (
    <>
      <section className='flex justify-center mt-10'>
        <div className='w-11/12'>
          <SearchForm
            nameSearchWord={nameSearchWord}
            setNameSearchWord={setNameSearchWord}
          />
          <p className='text-right mt-5'>
            <b>{hitCount}</b>
            件ヒット
          </p>
        </div>
      </section>

      <section className='flex justify-center mt-5'>
        <table className="w-11/12">
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
      </section>
    </>
  )
}

export default Team
