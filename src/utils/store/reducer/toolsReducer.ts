import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface CounterState {
  screenRecord: ScreenRecordType;
}

// 使用该类型定义初始 state
const initialState: CounterState = {
  screenRecord: {
    aspectRatio: "default",
    frameRate: "default",
    resolutions: "default",
  }
};

export const toolsSlice = createSlice({
  name: "toolsReducer",
  initialState,
  reducers: {
    setScreenRecord: (state, action: PayloadAction<ScreenRecordType>) => {
      state.screenRecord = action.payload;
    },
  },
});

export const { setScreenRecord } = toolsSlice.actions;
export default toolsSlice.reducer;
