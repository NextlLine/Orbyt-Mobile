import React, { useState } from 'react';
import { View, LayoutChangeEvent } from 'react-native';
import Svg, { Rect, Path, Circle } from 'react-native-svg';
import { useOrbytColor } from '@/assets/colors/defaultColors';
import { GraphC } from '@/model/mockModels';
import { ThemedText } from './themed-text';
import formatData from '@/util/formatData';

type WalletsInfoGraphProps = {
  values: GraphC[];
};

export default function CustomGraph({ values }: WalletsInfoGraphProps) {
  const [containerWidth, setContainerWidth] = useState(0);
  const lastSix = values.slice(-6);
  const maxValue = Math.max(...lastSix.map(m => Math.abs(m.value))) || 1;

  const maxHeight = 150;
  const zeroY = maxHeight / 2;

  const colorW = useOrbytColor('gainGraph');
  const colorL = useOrbytColor('looseGraph');
  const colorLine = useOrbytColor('activeTag');

  const handleLayout = (e: LayoutChangeEvent) => {
    setContainerWidth(e.nativeEvent.layout.width);
  };

  const barWidth = lastSix.length > 0 ? containerWidth / (lastSix.length * 1.5) : 0;
  const spacing = barWidth * 0.5;
  const svgWidth = lastSix.length * (barWidth + spacing);

  const points = lastSix.map((month, i) => {
    const valueRatio = Math.abs(month.value) / maxValue;
    const barHeight = valueRatio * (maxHeight / 2);
    const x = (1 / 6 + i) * (barWidth + spacing) + barWidth / 2;
    const y = month.value >= 0 ? zeroY - barHeight : zeroY + barHeight;
    return { x, y };
  });

  const createSmoothPath = (pts: { x: number; y: number }[]) => {
    if (pts.length < 2) return "";
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i];
      const p1 = pts[i + 1];
      const midX = (p0.x + p1.x) / 2;
      const midY = (p0.y + p1.y) / 2;
      d += ` Q ${p0.x},${p0.y} ${midX},${midY}`;
    }
    d += ` T ${pts[pts.length - 1].x},${pts[pts.length - 1].y}`;
    return d;
  };

  const smoothPath = createSmoothPath(points);

  return (
    <View
      style={{ alignItems: 'center', backgroundColor: "transparent" }}
      onLayout={handleLayout}
    >
      <ThemedText style={{ marginBottom: 8 }}>
        Capital gain in the last 6 months
      </ThemedText>

      {containerWidth > 0 && (
        <View>
          <Svg height={maxHeight} width={svgWidth}>

            {lastSix.map((month, i) => {
              const valueRatio = Math.abs(month.value) / maxValue;
              const barHeight = valueRatio * (maxHeight / 2);

              return (
                <Rect
                  key={i}
                  x={(1 / 6 + i) * (barWidth + spacing)}
                  y={month.value >= 0 ? zeroY - barHeight : zeroY}
                  width={barWidth}
                  height={barHeight}
                  fill={month.value >= 0 ? colorW : colorL}
                  rx={4}
                />
              );
            })}

            <Path
              d={smoothPath}
              fill="none"
              stroke={colorLine}
              strokeWidth={2}
            />

            {points.map((p, i) => (
              <Circle key={i} cx={p.x} cy={p.y} r={3} fill={colorLine} />
            ))}
          </Svg>

          <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
            {lastSix.map((m, i) => (
              <ThemedText
                type="default"
                key={i}
                style={{
                  width: barWidth + spacing,
                  textAlign: 'center',
                }}
              >
                {formatData(m.label)}
              </ThemedText>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}
