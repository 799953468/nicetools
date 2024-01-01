import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/utils/store/hooks";
import { Button, Form, message, Select, Typography } from "antd";
import { setScreenRecord } from "@/utils/store/reducer/toolsReducer";
import DefaultLayout from "@/Components/DefaultLayout";
import Container from "@/Components/Container";

import styles from "./index.module.scss";

const aspectRatioList = [
  { value: "default", label: "默认" },
  { value: "1.77", label: "16/9" },
  { value: "1.33", label: "4/3" },
  { value: "2.35", label: "21/9" },
  { value: "1.4", label: "14/10" },
  { value: "1.9", label: "19/10" },
];

const frameRateList = [
  { label: "默认", value: "default" },
  { label: "60", value: "60" },
  { label: "30", value: "30" },
  { label: "25", value: "25" },
  { label: "15", value: "15" },
  { label: "5", value: "5" },
];

const resolutionsList = [
  { label: "默认", value: "default" },
  { label: "屏幕尺寸", value: "fit-screen" },
  { label: "4k", value: "4K" },
  { label: "1080p", value: "1080p" },
  { label: "720p", value: "720p" },
];

const ScreenRecord = () => {
  let mediaRecorder = null;
  let mediaStream: MediaStream | undefined = undefined;
  let recordeBlods: any[] = [];
  const [previewUrl, setPreviewUrl] = useState<string>();
  const data = useAppSelector((state) => state.tools.screenRecord);
  const dispatch = useAppDispatch();

  const handleFinish = async (e: ScreenRecordType) => {
    dispatch(setScreenRecord(e));
    try {
      const displayMediaOptions = getDisplayMediaOptions(e);

      mediaStream = await navigator.mediaDevices.getDisplayMedia(
        displayMediaOptions
      );
      // mediaStream.onaddtrack = function () {
      //   stop();
      // }.bind(this);
      mediaRecorder = new MediaRecorder(mediaStream);
      mediaRecorder.ondataavailable = handleDataAvailable;
      mediaRecorder.start();
    } catch (e: any) {
      message.error(e.message);
    }
  };

  const getDisplayMediaOptions = (e: ScreenRecordType) => {
    let videoConstraints: MediaTrackConstraintSet = {};

    if (e.aspectRatio !== "default") {
      videoConstraints.aspectRatio = parseFloat(e.aspectRatio);
    }
    if (e.frameRate !== "default") {
      videoConstraints.frameRate = parseInt(e.frameRate);
    }

    if (e.resolutions !== "default") {
      if (e.resolutions === "fit-screen") {
        videoConstraints.width = screen.width;
        videoConstraints.height = screen.height;
      }
      if (e.resolutions === "4K") {
        videoConstraints.width = 3840;
        videoConstraints.height = 2160;
      }
      if (e.resolutions === "1080p") {
        videoConstraints.width = 1920;
        videoConstraints.height = 1080;
      }
      if (e.resolutions === "720p") {
        videoConstraints.width = 1280;
        videoConstraints.height = 720;
      }
    }
    return {
      video: videoConstraints,
      audio: false,
    };
  };

  const handleDataAvailable = (event: { data: { size: number } }) => {
    if (event.data.size > 0) {
      recordeBlods.push(event.data);
      createPreviewVideo();
    }
  };

  const createPreviewVideo = () => {
    const blob = new Blob(recordeBlods, {
      type: "video/webm",
    });
    recordeBlods = [];
    setPreviewUrl(URL.createObjectURL(blob));
  };

  return (
    <DefaultLayout>
      <div className={styles.screenRecord}>
        <Container title={"屏幕录制"}>
          <Form
            initialValues={data}
            layout={"vertical"}
            size={"large"}
            onFinish={handleFinish}
          >
            <Form.Item
              className={styles.item}
              name="aspectRatio"
              label={<Typography.Title level={5}>选择长宽比</Typography.Title>}
            >
              <Select>
                {aspectRatioList.map((item) => {
                  return (
                    <Select.Option key={item.value} value={item.value}>
                      {item.label}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item
              className={styles.item}
              name="frameRate"
              label={<Typography.Title level={5}>选择帧率</Typography.Title>}
            >
              <Select>
                {frameRateList.map((item) => {
                  return (
                    <Select.Option key={item.value} value={item.value}>
                      {item.label}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item
              className={styles.item}
              name="resolutions"
              label={<Typography.Title level={5}>选择分辨率</Typography.Title>}
            >
              <Select>
                {resolutionsList.map((item) => {
                  return (
                    <Select.Option key={item.value} value={item.value}>
                      {item.label}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item className={styles.button}>
              <Button type="primary" htmlType="submit">
                开始
              </Button>
            </Form.Item>
          </Form>
        </Container>
        <Container title={"说明"}>
          <ul>
            <li>
              出现无法使用的情况请更换 Chrome
              浏览器最新版，仅支持PC端，不支持录制系统/麦克风音频。
            </li>
            <li>录制完后可鼠标右键另存为下载</li>
          </ul>
        </Container>
      </div>
    </DefaultLayout>
  );
};

export default ScreenRecord;
