import React, { ReactElement } from "react";
import Container from "@/Components/Container";
import Tools from "@/utils/tools";
import DefaultLayout from "@/Components/DefaultLayout";
import Search from "@/Components/Search";
import { useAppSelector } from "@/utils/store/hooks";

const Index = () => {
  const searchText = useAppSelector((state) => state.user.searchText);

  const renderTools = (): ReactElement[] => {
    const newList: ToolsType[] = [];
    Tools.forEach((tool) => {
      const newTool: ToolsType = {
        title: tool.title,
        icon: tool.icon,
        list: [],
      };
      if (searchText != undefined) {
        tool.list.forEach((listItem) => {
          if (listItem.name.indexOf(searchText) > -1) {
            newTool.list.push({
              name: listItem.name,
              path: listItem.path,
              component: listItem.component,
            });
          }
        });
      } else {
        newTool.list = tool.list;
      }
      newList.push(newTool);
    });
    return newList.map((item) => {
      return (
        <Container
          key={item.title}
          title={item.title}
          icon={item.icon}
          list={item.list}
        />
      );
    });
  };

  return (
    <DefaultLayout>
      <Search />
      {renderTools()}
    </DefaultLayout>
  );
};

export default Index;
