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
