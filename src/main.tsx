import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { persist, store } from "@/utils/store";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { useAppSelector } from "@/utils/store/hooks";
import { ConfigProvider, theme } from "antd";
import tools from "@/utils/tools";
import Index from "@/Pages/Index";
import "./main.module.scss";

const App = () => {
  const location = useLocation();
  const darkModel = useAppSelector((state) => state.user.darkModel);
  return (
    <ConfigProvider
      theme={{
        algorithm: darkModel ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <TransitionGroup>
        <CSSTransition
          key={location.pathname}
          classNames="page"
          timeout={300}
          unmountOnExit={true}
        >
          <Routes location={location.pathname}>
            <Route path={"/"} element={<Index />} />
            {tools.map((item) => {
              return item.list.map((tool) => {
                return <Route path={tool.path} element={tool?.component} />;
              });
            })}
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </ConfigProvider>
  );
};

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <Provider store={store}>
    <PersistGate persistor={persist}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
);
