import { TypedUseSelectorHook, useSelector } from 'react-redux';
import type { RootState } from 'app/redux';

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useAppSelector
