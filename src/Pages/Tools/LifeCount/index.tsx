import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { DatePicker, DatePickerProps, Form, Typography } from "antd";
import DefaultLayout from "@/Components/DefaultLayout";
import Container from "@/Components/Container";
import dayjs from "dayjs";
import { useLocation } from "react-router-dom";

const LifeCount: React.FC = () => {
  let date = dayjs();
  const location = useLocation();
  const [dateData, setDateData] = useState<LifeCountDateTimeType>();
  const [blockArr, setBlockArr] = useState<BlockType[]>();
  const [length, setLength] = useState<LifeCountDataType>();
  const [interval, setIntervalState] = useState<NodeJS.Timeout>();
  const [link, setLink] = useState<string>("");

  useEffect(() => {
    return () => {
      clearInterval(interval);
    };
  }, []);

  const generalDateTime = () => {
    if (date == null) {
      return;
    }
    const thisDay = dayjs();
    const deathDate = date.add(80, "year"); // 80岁的时候
    let dateData: LifeCountDateTimeType = {
      past: {
        year: thisDay.diff(date, "year", true).toFixed(1),
        month: thisDay.diff(date, "month", true).toFixed(1),
        day: thisDay.diff(date, "day", true).toFixed(1),
        hour: thisDay.diff(date, "hour", true).toFixed(1),
        minute: thisDay.diff(date, "minute", true).toFixed(1),
        second: thisDay.diff(date, "second", true).toFixed(1),
      },
      have: {
        year: deathDate.diff(thisDay, "year", true).toFixed(1),
        month: deathDate.diff(thisDay, "month", true).toFixed(1),
        day: deathDate.diff(thisDay, "day", true).toFixed(1),
        hour: deathDate.diff(thisDay, "hour", true).toFixed(1),
        minute: deathDate.diff(thisDay, "minute", true).toFixed(1),
        second: deathDate.diff(thisDay, "second", true).toFixed(1),
      },
    };
    setDateData(dateData);
  };

  const results = () => {
    if (date == null) {
      return;
    }
    const blockArr: BlockType[] = [];
    const thisDay = dayjs();

    const oneBlockHour = 24 * 72; // 一个方块代表的小时
    const haveChildren = 28; // 生孩子的年龄

    const pastDate = thisDay.diff(date, "day"); // 已经过去的时间(天)

    const deathDate = date.add(80, "year"); // 80岁的时候
    const fromDeathDate = deathDate.diff(thisDay, "day"); // 距离80岁还能活的时间(天)

    const retiredDate = date.add(65, "year"); // 65岁退休的时候
    const fromRetiredDate = retiredDate.diff(thisDay, "day"); // 距离65岁还能活的时间(天)

    const childrenDate = date.add(18 + haveChildren, "year"); // 如果28岁生孩子，孩子18岁的时候
    const fromChildrenDate = childrenDate.diff(thisDay, "day"); // 距离孩子18岁还能活的时间(天)

    const parentsDate = date.add(80 - haveChildren, "year"); // 距离父母死亡
    const fromParentsDate = parentsDate.diff(thisDay, "day"); // 距离父母死亡还能活的时间(天)

    const past = ~~(pastDate / 72); // 已经过去的方块

    const sleep = ~~((8 * fromDeathDate) / oneBlockHour); // 碎觉所需的方块
    const work =
      fromRetiredDate <= 0 ? 0 : ~~((8 * fromRetiredDate) / oneBlockHour); // 工作所需的方块
    const child =
      fromChildrenDate <= 0 ? 0 : ~~((5 * fromChildrenDate) / oneBlockHour); // 陪伴孩子
    const parents =
      fromParentsDate <= 0
        ? 0
        : ~~(((fromParentsDate / 31) * 24) / oneBlockHour); // 陪伴父母
    let surplus = 400 - (sleep + past + work + child + parents);
    if (surplus <= 0) surplus = 0;

    const data: LifeCountDataType = {
      past,
      sleep,
      work,
      child,
      parents,
      surplus,
    };

    Object.keys(data).forEach((e) => {
      const key = e as keyof LifeCountDataType;
      for (let i = 0; i < data[key]; i++) {
        blockArr.push({
          type: e,
        });
      }
    });
    setBlockArr(blockArr);
    setLength(data);
  };

  const handleChanged: DatePickerProps["onChange"] = (e, _) => {
    if (e == null) {
      const d = dayjs().add(-18, "years");
      date = d;
    } else {
      date = e;
    }
    generalLink();
    clearInterval(interval);
    generalDateTime();
    setIntervalState(setInterval(generalDateTime, 1000));
    results();
  };

  const generalLink = () => {
    setLink(
      `${import.meta.env.VITE_HOST}${location.pathname}?k=${date.format(
        "YYYY-MM-DD",
      )}`,
    );
  };

  return (
    <DefaultLayout>
      <div className={styles.lifeCount}>
        <Container title="人生小格">
          <Form layout={"vertical"} size={"large"}>
            <Form.Item name="date">
              <DatePicker
                placeholder={"选择你的生日"}
                style={{ width: "100%", marginTop: "10px" }}
                onChange={handleChanged}
              />
            </Form.Item>
          </Form>
        </Container>
        {dateData != null && (
          <Container title="剩下的时间">
            <div className={styles.card}>
              <div className="list">
                <div className="name">
                  {dateData.have.year}
                  <small>年</small>
                </div>
                <div className="date">
                  {dateData.have.hour}
                  <small>时</small>
                </div>
              </div>
              <div className="list">
                <div className="name">
                  {dateData.have.month}
                  <small>月</small>
                </div>
                <div className="date">
                  {dateData.have.minute}
                  <small>分</small>
                </div>
              </div>
              <div className="list">
                <div className="name">
                  {dateData.have.day}
                  <small>天</small>
                </div>
                <div className="date">
                  {dateData.have.second}
                  <small>秒</small>
                </div>
              </div>
            </div>
          </Container>
        )}
        {dateData != null && (
          <Container title="你的人生进度">
            <div className={styles.box}>
              {blockArr?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={`${styles.block}
                  ${styles[item.type]}
                  ${index == 323 && index >= length!.past ? styles.retired : ""}
                  ${index == length!.parents - 1 ? styles.flash : ""}`}
                  />
                );
              })}
            </div>
          </Container>
        )}
        {/*{dateData != null && (*/}
        {/*  <Container title="分享链接">*/}
        {/*    <div>*/}
        {/*      <Typography.Paragraph copyable={{ text: link }}>*/}
        {/*        点击复制*/}
        {/*      </Typography.Paragraph>*/}
        {/*      <Typography.Paragraph>*/}
        {/*        <code>{link}</code>*/}
        {/*      </Typography.Paragraph>*/}
        {/*    </div>*/}
        {/*  </Container>*/}
        {/*)}*/}
        <Container title="说明">
          <Typography.Paragraph>
            <small>
              参考了小程序<b> lifecount </b>而制作的网页版本
            </small>
          </Typography.Paragraph>
          <Typography.Paragraph>
            <b>假设我们的寿命是80岁,分为400个方块。</b>
            <li>
              <div className={`${styles.block} ${styles.past}`}></div>
              你已经走过的生命
            </li>
            <li>
              <div className={`${styles.block} ${styles.sleep}`}></div>
              如果你平均每天休息 8 小时，这是你余下生命里睡眠占用的时间
            </li>
            <li>
              <div className={`${styles.block} ${styles.work}`}></div>
              如果你 65 岁退休，退休前平均每天工作 8
              小时，这是你余下生命里工作占用的时间
            </li>
            <li>
              <div className={`${styles.block} ${styles.retired}`}></div>
              65 岁，你退休了
            </li>
            <li>
              <div className={`${styles.block} ${styles.child}`}></div>
              如果你 28 岁生孩子，孩子18岁出门上大学，这 18 年里你平均每天能花 5
              个小时陪伴孩子，这里是你余下生命里所用去的时间
            </li>
            <li>
              <div className={`${styles.block} ${styles.parents}`}></div>
              如果你每个月能看望父母一天，在他们 80
              岁前，这是你的余生里还能陪伴他们的时光
            </li>
            <li>
              <div className={`${styles.block} ${styles.surplus}`}></div>
              除了以上之外，你剩下的所有日子
            </li>
            <p>数据仅供娱乐，人生苦短，继续努力吧~</p>
          </Typography.Paragraph>
        </Container>
      </div>
    </DefaultLayout>
  );
};

export default LifeCount;
