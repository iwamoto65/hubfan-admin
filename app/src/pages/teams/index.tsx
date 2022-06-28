import type { NextPage } from 'next';
import type { StateTypes, InputsType } from 'src/types/team';
import { useState } from 'react';
import useSWR from 'swr';
import { useForm, SubmitHandler } from 'react-hook-form';
import { fetchData } from 'src/utils/api/fetchData';
import { buildRansackQuery } from 'src/utils/query/ransackQuery';
import { UpwardArrowIcon } from 'src/components/atoms/icons/UpwardArrowIcon';
import { DownwardArrowIcon } from 'src/components/atoms/icons/DownwardArrowIcon';
import { TrashIcon } from 'src/components/atoms/icons/TrashIcon';
import { BlueSearchButton } from 'src/components/atoms/buttons/BlueSearchButton';
import { GreenEditButton } from 'src/components/atoms/buttons/GreenEditButton';
import { RedDeleteButton } from 'src/components/atoms/buttons/RedDeleteButton';

const SearchForm: React.FC<StateTypes> = ({
  setNameSearchWord,
  setDateEstablishedGreaterThanSearch,
  setDateEstablishedLessThanSearch
}) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<InputsType>();
  const onSubmit: SubmitHandler<InputsType> = (data) => {
    setNameSearchWord(data.name);
    setDateEstablishedGreaterThanSearch(data.greaterThanDateEstablished);
    setDateEstablishedLessThanSearch(data.lessThanDateEstablished);
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

            <div className='col-start-9 col-span-1 flex justify-center mt-2'>
              <UpwardArrowIcon callback={setIsAdvancedSearch} arg={!isAdvancedSearch} />
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
              <BlueSearchButton />
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

            <div className='col-start-9 col-span-1 flex justify-center mt-2'>
              <DownwardArrowIcon callback={setIsAdvancedSearch} arg={!isAdvancedSearch} />
            </div>

            <div className='col-start-10 col-span-1 flex justify-center mt-2'>
              <TrashIcon callback={reset} />
            </div>

            <div className='col-start-11 col-span-2 text-center'>
              <BlueSearchButton />
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

  const stateProps = { setNameSearchWord, setDateEstablishedGreaterThanSearch, setDateEstablishedLessThanSearch }

  const fetcher = async (path: string) => await fetchData(path);
  const searchQuery = buildRansackQuery({
    name_cont: nameSearchWord,
    date_established_gteq: dateEstablishedGreaterThanSearch,
    date_established_lteq: dateEstablishedLessThanSearch
  });
  const { data: teams } = useSWR('/v1/teams' + searchQuery, fetcher);

  return (
    <>
      <section className='flex justify-center mt-10'>
        <div className='w-11/12'>
          <SearchForm {...stateProps} />
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
              <tr className='text-left border-b border-gray-400 bg-white' key={team.id}>
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
