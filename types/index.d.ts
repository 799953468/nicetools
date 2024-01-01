type ToolsType = {
  title: string;
  icon: JSX.Element;
  list: ListType[];
}[];

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
