import React, { useState } from 'react';
import { View, LayoutChangeEvent } from 'react-native';
import Svg, { Rect, Path, Circle, Text as SvgText } from 'react-native-svg';
import { useOrbytColor } from '@/hooks/defaultColors';
import formatData from '@/util/formatData';
import { formatCompactNumber } from '@/util/formatNumber';
import { getHeaderTitle } from '@react-navigation/elements';
import { ThemedText } from './themed-text';
import { MonthReport } from '@/model/models';

type CustomBarGraphProps = {
  values: MonthReport[];
  qtdToShow?: number;
  showLabel?: boolean;
};

export default function CustomBarGraph({
  values,
  qtdToShow = 12,
  showLabel = true
}: CustomBarGraphProps) {
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  const lastN = values.slice(-qtdToShow);
  const maxValue = Math.max(...lastN.map(m => Math.abs(m.monthBalance))) || 1;

  const colorW = useOrbytColor('gainGraph');
  const colorL = useOrbytColor('looseGraph');
  const colorLine = useOrbytColor('primary');
  const colorText = useOrbytColor('secondary');

  const handleLayout = (e: LayoutChangeEvent) => {
    setContainerWidth(e.nativeEvent.layout.width);
    setContainerHeight(e.nativeEvent.layout.height);
  };

  const labelsHeight = showLabel ? 60 : 0;
  const graphHeight = containerHeight - labelsHeight;
  const zeroY = graphHeight / 2;

  const barWidth = lastN.length > 0 ? containerWidth / (lastN.length * 1.5) : 0;
  const spacing = barWidth * 0.5;
  const svgWidth = containerWidth;

  const graphData = lastN.map((data, i) => {
    const valueRatio = Math.abs(data.monthBalance) / maxValue;
    const barHeight = 0.8 * (valueRatio * (graphHeight / 2));
    const x = (1 / 6 + i) * (barWidth + spacing) + barWidth / 2;
    const rectX = (1 / 6 + i) * (barWidth + spacing);
    const y = data.monthBalance >= 0 ? zeroY - barHeight : zeroY + barHeight;
    const rectY = data.monthBalance >= 0 ? zeroY - barHeight : zeroY;

    return {
      data,
      x,
      y,
      rectX,
      rectY,
      rectWidth: barWidth,
      rectHeight: barHeight,
      value: data.monthBalance,
      color: data.monthBalance >= 0 ? colorW : colorL,
      textY: data.monthBalance >= 0 ? y - 8 : y + 14
    };
  });

  const createSmoothPath = (data: typeof graphData) => {
    if (data.length < 2) return "";
    const pts = data.map(d => ({ x: d.x, y: d.y }));

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

  const smoothPath = createSmoothPath(graphData);

  return (
    <View
      style={{ width: '100%', height: '100%' }}
      onLayout={handleLayout}
    >
      <ThemedText style={{ marginBottom: 8 }}>
        Capital gain in the last {qtdToShow} months
      </ThemedText>

      {containerWidth > 0 && containerHeight > 0 && (
        <>
          <Svg height={graphHeight + 5} width={svgWidth}>
            {graphData.map((data, i) => (
              <Rect
                key={`rect-${i}`}
                x={data.rectX}
                y={data.rectY}
                width={data.rectWidth}
                height={data.rectHeight}
                fill={data.color}
                rx={4}
              />
            ))}

            <Path
              d={`M 0 ${zeroY} L ${svgWidth} ${zeroY}`}
              stroke={colorLine}
              strokeWidth={1}
              strokeDasharray="4,2"
            />

            <Path
              d={smoothPath}
              fill="none"
              stroke={colorLine}
              strokeWidth={2}
            />

            {showLabel && (graphData.map((d, i) => (
              <React.Fragment key={`point-${i}`}>
                <Circle cx={d.x} cy={d.y} r={3} fill={colorLine} />
                <SvgText
                  x={d.x}
                  y={d.textY}
                  fontSize="10"
                  fill={colorText}
                  textAnchor="middle"
                >
                  {formatCompactNumber(d.value)}
                </SvgText>

              </React.Fragment>
            )))}

          </Svg>

          {showLabel && (
            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
              {graphData.map((data, i) => (
                <ThemedText
                  key={i}
                  style={{
                    width: barWidth + spacing,
                    textAlign: 'center',
                    fontSize: 10,
                  }}
                >
                  {data.data.month}/{data.data.year % 100}
                </ThemedText>
              ))}
            </View>
          )}
        </>
      )}
    </View>
  );
}
