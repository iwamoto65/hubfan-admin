import type { NextPage } from 'next';
import { useRouter } from 'next/router';

const TeamDetail: NextPage = () => {
  const router = useRouter();
  const { pid } = router.query;

  return (
    <>
      <p className='p-10 text-red-600'>
        Team: { pid }
      </p>
    </>
  )
}

export default TeamDetail
