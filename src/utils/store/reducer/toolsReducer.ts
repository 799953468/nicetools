import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  screenRecord: ScreenRecordType;
  pomodoroTechnique: PomodoroTechniqueType;
}

// 使用该类型定义初始 state
const initialState: CounterState = {
  screenRecord: {
    aspectRatio: "default",
    frameRate: "default",
    resolutions: "default",
  },
  pomodoroTechnique: {
    workTime: 25,
    restTime: 5,
    settings: ["music", "fullscreen", "auto"],
    musicType: "forest",
  },
};

export const toolsSlice = createSlice({
  name: "toolsReducer",
  initialState,
  reducers: {
    setScreenRecord: (state, action: PayloadAction<ScreenRecordType>) => {
      state.screenRecord = action.payload;
    },
    setPomodoroTechnique: (
      state,
      action: PayloadAction<PomodoroTechniqueType>,
    ) => {
      state.pomodoroTechnique = action.payload;
    },
  },
});

export const { setScreenRecord, setPomodoroTechnique } = toolsSlice.actions;
export default toolsSlice.reducer;
