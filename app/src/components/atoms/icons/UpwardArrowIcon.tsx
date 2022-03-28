type PropsType = {
  callback: (value: any) => void
  arg: any
}

export const UpwardArrowIcon: React.FC<PropsType> = ({ callback, arg }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='h-6 w-6 cursor-pointer'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      strokeWidth='1'
      onClick={() => callback(arg)}
    >
      <path strokeLinecap='round' strokeLinejoin='round' d='M5 15l7-7 7 7' />
    </svg>
  )
}
