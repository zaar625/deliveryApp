import {combineReducers} from '@reduxjs/toolkit';

import userSlice from '../slice/user';

const rootReducer = combineReducers({
  user: userSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
