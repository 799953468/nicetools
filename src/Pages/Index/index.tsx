import React from "react";
import Container from "@/Components/Container";
import Tools from "@/utils/tools";
import { nanoid } from "nanoid";
import DefaultLayout from "@/Components/DefaultLayout";
import Search from "@/Components/Search";

const Index = () => {
  return (
    <DefaultLayout>
      <Search />
      {Tools.map((item) => {
        return (
          <Container
            key={nanoid()}
            title={item.title}
            icon={item.icon}
            list={item.list}
          />
        );
      })}
    </DefaultLayout>
  );
};

export default Index;
