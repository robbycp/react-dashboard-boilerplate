declare global {
  type StatusLoad = 'idle' | 'loading' | 'failed'
  type SetState<T> = React.Dispatch<React.SetStateAction<T>>
}

export {};