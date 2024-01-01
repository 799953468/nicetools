import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 为 slice state 定义一个类型
interface CounterState {
  darkModel: boolean;
}

// 使用该类型定义初始 state
const initialState: CounterState = {
  darkModel: false,
};

export const counterSlice = createSlice({
  name: "usersReducer",
  // `createSlice` 将从 `initialState` 参数推断 state 类型
  initialState,
  reducers: {
    // 使用 PayloadAction 类型声明 `action.payload` 的内容
    setDarkModel: (state, action: PayloadAction<boolean>) => {
      const content = document.getElementsByTagName("body")[0];
      content.setAttribute(
        "class",
        action.payload ? "darkModel" : "lightModel"
      );
      state.darkModel = action.payload;
    },
  },
});

export const { setDarkModel } = counterSlice.actions;
export default counterSlice.reducer;
