import type { NextPage } from 'next';
import { Dispatch, SetStateAction, useState } from 'react';
import useSWR from 'swr';
import { useForm, SubmitHandler } from 'react-hook-form';
import { fetchData } from 'src/utils/api/fetchData';
import { TrashIcon } from 'src/components/atoms/icons/TrashIcon';
import { GreenEditButton } from 'src/components/atoms/buttons/GreenEditButton';
import { RedDeleteButton } from 'src/components/atoms/buttons/RedDeleteButton';

type StateTypes = {
  nameSearchWord: string
  setNameSearchWord: Dispatch<SetStateAction<string>>
  dateEstablishedGreaterThanSearch: string
  setDateEstablishedGreaterThanSearch: Dispatch<SetStateAction<string>>
  dateEstablishedLessThanSearch: string
  setDateEstablishedLessThanSearch: Dispatch<SetStateAction<string>>
}

type InputsType = {
  name: string
  greaterThanDateEstablished: string
  lessThanDateEstablished: string
}

const SearchForm = (props: StateTypes) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<InputsType>();
  const onSubmit: SubmitHandler<InputsType> = (data) => {
    props.setNameSearchWord(data.name);
    props.setDateEstablishedGreaterThanSearch(data.greaterThanDateEstablished);
    props.setDateEstablishedLessThanSearch(data.lessThanDateEstablished);
  };
  const [isAdvancedSearch, setIsAdvancedSearch] = useState<boolean>(false);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='bg-white p-5 rounded shadow-md'>
      {isAdvancedSearch ?
        (
          <div className='grid grid-cols-12 grid-rows-2 gap-y-5'>
            <div className='col-start-1 col-span-8'>
              <input
                type='text'
                {...register('name')}
                placeholder='チーム名を入力'
                className='border-b p-2 border-gray-300 focus:border-blue-500 focus:outline-none w-full' />
              <p>{errors.name && <span>エラー：{errors}</span>}</p>
            </div>

            <div className='col-start-9 col-span-1 flex justify-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6 mt-2 cursor-pointer'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth='1'
                onClick={() => setIsAdvancedSearch(!isAdvancedSearch)}
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M5 15l7-7 7 7' />
              </svg>
            </div>

            <div className='col-start-10 col-span-1 flex justify-center mt-2'>
              <TrashIcon callback={reset} />
            </div>

            <div className='col-start-1 col-span-10'>
              <label htmlFor='date-established' className='mr-5'>設立年月日</label>
              <input
                type='date'
                className='p-1 border border-gray-300 focus:border-blue-500 focus:outline-none'
                {...register('greaterThanDateEstablished')}
              />
              <span className='mx-3'>~</span>
              <input
                type='date'
                className='p-1 border border-gray-300 focus:border-blue-500 focus:outline-none'
                {...register('lessThanDateEstablished')}
              />
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
            <div className='col-start-1 col-span-8'>
              <input
                type='text'
                {...register('name')}
                placeholder='チーム名を入力'
                className='border-b p-2 border-gray-300 focus:border-blue-500 focus:outline-none w-full' />
              <p>{errors.name && <span>エラー：{errors}</span>}</p>
            </div>

            <div className='col-start-9 col-span-1 flex justify-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6 mt-2 cursor-pointer'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth='1'
                onClick={() => setIsAdvancedSearch(!isAdvancedSearch)}
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M19 9l-7 7-7-7' />
              </svg>
            </div>

            <div className='col-start-10 col-span-1 flex justify-center mt-2'>
              <TrashIcon callback={reset} />
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
  const [dateEstablishedGreaterThanSearch, setDateEstablishedGreaterThanSearch] = useState<string>('')
  const [dateEstablishedLessThanSearch, setDateEstablishedLessThanSearch] = useState<string>('')

  const stateProps = {
    nameSearchWord,
    setNameSearchWord,
    dateEstablishedGreaterThanSearch,
    setDateEstablishedGreaterThanSearch,
    dateEstablishedLessThanSearch,
    setDateEstablishedLessThanSearch
  }

  const fetcher = async (path: string) => await fetchData(path);
  const searchQuery = `?q[name_cont]=${nameSearchWord}&q[date_established_gteq]=${dateEstablishedGreaterThanSearch}&q[date_established_lteq]=${dateEstablishedLessThanSearch}`
  const { data: teams } = useSWR('/v1/teams' + searchQuery, fetcher);

  const hitCount: number = teams ? teams.length : 0;

  return (
    <>
      <section className='flex justify-center mt-10'>
        <div className='w-11/12'>
          <SearchForm {...stateProps} />
          <p className='text-right mt-5'>
            <b>{hitCount}</b>
            件ヒット
          </p>
        </div>
      </section>

      <section className='flex justify-center mt-5'>
        <table className='w-11/12'>
          <thead>
            <tr className='text-left'>
              <th className='px-3 py-3 text-white bg-gray-700 rounded-tl'>チーム名</th>
              <th className='w-2/12 px-3 py-3 text-white bg-gray-700'>設立年月日</th>
              <th className='w-1/12 px-3 py-3 bg-gray-700'></th>
              <th className='w-1/12 px-3 py-3 bg-gray-700 rounded-tr'></th>
            </tr>
          </thead>
          <tbody>
            {teams?.map(team => (
              <tr className='text-left border-b border-gray-300' key={team.id}>
                <td className='px-3 py-3'>{ team.name }</td>
                <td className='px-3 py-3'>{ team.dateEstablished }</td>
                <td className='px-3 py-3'><GreenEditButton path={`teams/${team.id}`} /></td>
                <td className='px-3 py-3'><RedDeleteButton path={`teams/${team.id}`} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  )
}

export default Team
