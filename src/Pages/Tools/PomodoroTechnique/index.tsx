import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";
import DefaultLayout from "@/Components/DefaultLayout";
import Container from "@/Components/Container";
import {
  Button,
  Checkbox,
  Form,
  InputNumber,
  Progress,
  Select,
  Typography,
} from "antd";
import { useAppDispatch, useAppSelector } from "@/utils/store/hooks";
import { setPomodoroTechnique } from "@/utils/store/reducer/toolsReducer";
import { flushSync } from "react-dom";
import { PauseCircleOutlined, PlayCircleOutlined } from "@ant-design/icons";

const musicList = [
  { label: "森林", value: "forest" },
  { label: "海边", value: "ocean" },
  { label: "自然", value: "provence" },
];

const PomodoroTechnique: React.FC = () => {
  useEffect(() => {
    const listener = (e: BeforeUnloadEvent) => {
      clearInterval(interval);
      e.preventDefault();
    };
    window.addEventListener("beforeunload", listener);
    return () => {
      window.removeEventListener("beforeunload", listener);
    };
  }, []);
  const boxRef = useRef<HTMLDivElement>(null);
  const [showBox, setShowBox] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [progress, setProgress] = useState(0);
  const [time, setTime] = useState("");
  const [audioPaused, setAudioPaused] = useState(false);
  const data = useAppSelector((state) => state.tools.pomodoroTechnique);
  const dispatch = useAppDispatch();
  const audio: HTMLAudioElement = new Audio();
  let interval: any = null;
  const handleFinish = async (e: PomodoroTechniqueType) => {
    dispatch(setPomodoroTechnique(e));
    start();
  };

  const playMusic = () => {
    if (data.settings.includes("music")) {
      const audioSrc: AudioSrc = {
        forest: "/assets/audio/white-noise/preset_wakeup_forest.m4a",
        ocean: "/assets/audio/white-noise/preset_wakeup_ocean.m4a",
        provence: "/assets/audio/white-noise/preset_wakeup_provence.m4a",
      };
      audio.loop = true;
      audio.src = audioSrc[data.musicType];
      audio.play();
      setAudioPaused(false);
    }
  };

  const launchFullscreen = () => {
    if (!data.settings.includes("fullscreen")) {
      return false;
    }
    flushSync(() => {
      if (boxRef.current?.requestFullscreen) {
        boxRef.current.requestFullscreen();
      }
    });
  };

  const next = () => {
    start();
  };

  const cancel = () => {
    clearInterval(interval);
    setShowBox(false);
    audio.pause();
  };

  const musicSwitch = () => {
    audio.paused ? audio.play() : audio.pause();
    setAudioPaused(audio.paused);
  };

  const start = () => {
    playMusic();
    setShowBox(true);
    setSuccessful(false);
    launchFullscreen();
    let time = data.workTime * 60 - 0.1;
    let past = 0;
    let rest = false;
    const check = () => {
      if (time / 60 <= 0.1 && time % 60 <= 0.1) {
        if (data.settings.includes("auto")) {
          setProgress(0);
          past = 0;
          if (!rest) {
            time = data.restTime * 60 - 0.1;
          } else {
            time = data.workTime * 60 - 0.1;
          }
          setSuccessful(!successful);
          rest = !rest;
        } else {
          clearInterval(interval);
          setSuccessful(true);
          setProgress(100);
          setTime("成功");
          return false;
        }
      }
      const minutes = parseInt((time / 60).toString());
      const seconds = parseInt((time % 60).toString());
      if (minutes === 0 && seconds === 0) {
        setProgress(100);
      } else {
        setProgress(
          (past / ((rest ? data.restTime : data.workTime) * 60 - 1)) * 100,
        );
      }
      setTime(
        `${minutes > 9 ? minutes : "0" + minutes}:${
          seconds > 9 ? seconds : "0" + seconds
        }`,
      );
      time -= 0.1;
      past += 0.1;
    };
    check();
    clearInterval(interval);
    interval = setInterval(check, 100);
  };

  return (
    <DefaultLayout>
      <div className={styles.pomodoroTechnique}>
        <Container title={"番茄时钟"}>
          <Form
            layout={"vertical"}
            size={"large"}
            initialValues={data}
            onFinish={handleFinish}
          >
            <Form.Item
              name="restTime"
              className={styles.item}
              label={
                <Typography.Title level={5}>休息时间(分钟)</Typography.Title>
              }
            >
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              name="workTime"
              className={styles.item}
              label={
                <Typography.Title level={5}>工作时长(分钟)</Typography.Title>
              }
            >
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item name="settings" className={styles.item}>
              <Checkbox.Group>
                <Checkbox value="music">播放白噪音</Checkbox>
                <Checkbox value="fullscreen">全屏</Checkbox>
                <Checkbox value="auto">自动休息和开始下一个</Checkbox>
              </Checkbox.Group>
            </Form.Item>
            <Form.Item name="musicType" className={styles.item}>
              <Select options={musicList}></Select>
            </Form.Item>
            <Form.Item className={styles.button}>
              <Button type="primary" htmlType="submit">
                开始专注
              </Button>
            </Form.Item>
          </Form>
        </Container>
        <Container title={"番茄工作法"}>
          <Typography.Paragraph>
            <blockquote>
              <p>
                番茄工作法是简单易行的时间管理方法，是由弗朗西斯科·西里洛于1992年创立的一种相对于GTD更微观的时间管理方法。
              </p>
              <p>
                使用番茄工作法，选择一个待完成的任务，将番茄时间设为25分钟，专注工作，中途不允许做任何与该任务无关的事，直到番茄时钟响起，然后在纸上画一个X短暂休息一下（5分钟就行），每4个番茄时段多休息一会儿。
              </p>
              <p>番茄工作法极大地提高了工作的效率，还会有意想不到的成就感。</p>
            </blockquote>
          </Typography.Paragraph>
          <Typography.Title level={5}>
            番茄工作法有五个基本步骤：
          </Typography.Title>
          <Typography.Paragraph>
            <ol>
              <li>
                每天开始的时候规划今天要完成的几项任务，将任务逐项写在列表里（或记在软件的清单里）
              </li>
              <li>设定你的番茄钟（定时器、软件、闹钟等），时间是25分钟。</li>
              <li>开始完成第一项任务，直到番茄钟响铃或提醒（25分钟到）。</li>
              <li>停止工作，并在列表里该项任务后画个X。</li>
              <li>休息3~5分钟，活动、喝水、方便等等。</li>
              <li>
                开始下一个番茄钟，继续该任务。一直循环下去，直到完成该任务，并在列表里将该任务划掉。
              </li>
              <li>每四个番茄钟后，休息25分钟。</li>
            </ol>
          </Typography.Paragraph>
          <hr />
          <Typography.Title level={5}>
            在某个番茄钟的过程里，如果突然想起要做什么事情：
          </Typography.Title>
          <Typography.Paragraph>
            <ol>
              <li>
                非得马上做不可的话，停止这个番茄钟并宣告它作废（哪怕还剩5分钟就结束了），去完成这件事情，之后再重新开始同一个番茄钟；
              </li>
              <li>
                不是必须马上去做的话，在列表里该项任务后面标记一个逗号（表示打扰），并将这件事记在另一个列表里（比如叫“计划外事件”），然后接着完成这个番茄钟。
              </li>
            </ol>
          </Typography.Paragraph>
        </Container>
      </div>
      {showBox && (
        <div
          className={styles.box}
          style={{ background: successful ? "#40cc40" : "#f65f54" }}
        >
          <div ref={boxRef}>
            <div className={styles.music}>
              {audioPaused ? (
                <Button
                  shape="circle"
                  onClick={musicSwitch}
                  icon={<PauseCircleOutlined />}
                />
              ) : (
                <Button
                  shape="circle"
                  onClick={musicSwitch}
                  icon={<PlayCircleOutlined />}
                />
              )}
            </div>
            <Progress
              size={300}
              type="circle"
              percent={progress}
              format={() => {
                return (
                  <>
                    <div className="time">{time}</div>
                  </>
                );
              }}
            />
            {data.settings.includes("auto") && successful && (
              <div
                style={{
                  transform:
                    !data.settings.includes("auto") && successful
                      ? "translateY(50px)"
                      : "",
                }}
                onClick={next}
              >
                下一个
              </div>
            )}
            <Button className={styles.cancel} onClick={cancel}>
              取消
            </Button>
          </div>
        </div>
      )}
    </DefaultLayout>
  );
};

export default PomodoroTechnique;
