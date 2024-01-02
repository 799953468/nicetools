import React, { useMemo } from "react";

type SvgIconProps = {
  size?: string | number;
  color?: string;
  prefix?: string;
  name: string;
};

/**
 * @Svg组件
 * @props  color   图标颜色
 * @props  name 图标名称--文件名称
 * @props  size  图标大小
 * @props  prefix 前缀 默认icon
 */

export default function SvgIcon({
  color,
  name,
  size = 16,
  prefix = "icon",
}: SvgIconProps) {
  const symbolId = useMemo(() => `#${prefix}-${name}`, [prefix, name]);
  return (
    <svg aria-hidden="true" width={size} height={size} fill={color}>
      <use href={symbolId} fill={color} />
    </svg>
  );
}
