import { Dispatch, SetStateAction } from 'react'

type StateTypes = {
  setNameSearchWord: Dispatch<SetStateAction<string>>
  setDateEstablishedGreaterThanSearch: Dispatch<SetStateAction<string>>
  setDateEstablishedLessThanSearch: Dispatch<SetStateAction<string>>
}

type InputsType = {
  name: string
  greaterThanDateEstablished: string
  lessThanDateEstablished: string
}

export type { StateTypes, InputsType }
