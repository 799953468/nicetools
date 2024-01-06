type ToolsType = {
  title: string;
  icon: Component;
  list: ListType[];
};

type ListType = {
  name: string;
  path: string;
  component: any;
};

type ScreenRecordType = {
  aspectRatio: string;
  frameRate: string;
  resolutions: string;
};

type PomodoroTechniqueType = {
  settings: string[];
  workTime: number;
  restTime: number;
  musicType: string;
};

type AudioSrc = {
  forest: string;
  ocean: string;
  provence: string;
};
