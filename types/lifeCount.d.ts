type BlockType = {
  type: string;
};

type LifeCountDataType = {
  past: number;
  sleep: number;
  work: number;
  child: number;
  parents: number;
  surplus: number;
};

type LifeCountDateTimeType = {
  past: {
    year: string;
    month: string;
    day: string;
    hour: string;
    minute: string;
    second: string;
  };
  have: {
    year: string;
    month: string;
    day: string;
    hour: string;
    minute: string;
    second: string;
  };
};
