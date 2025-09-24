import React, { useState } from 'react';
import { View, LayoutChangeEvent } from 'react-native';
import Svg, { Rect, Path, Circle, Text as SvgText } from 'react-native-svg';
import { useOrbytColor } from '@/assets/colors/defaultColors';
import { GraphC } from '@/model/mockModels';
import { ThemedText } from './themed-text';
import formatData from '@/util/formatData';
import { formatCompactNumber } from '@/util/formatNumber';

type CustomGraphProps = {
  values: GraphC[];
  qtdToShow?: number;
  showLabel?: boolean;
};

export default function CustomGraph({ 
  values, 
  qtdToShow = 8, 
  showLabel = true 
}: CustomGraphProps) {
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  
  const lastN = values.slice(-qtdToShow);
  const maxValue = Math.max(...lastN.map(m => Math.abs(m.value))) || 1;

  const colorW = useOrbytColor('gainGraph');
  const colorL = useOrbytColor('looseGraph');
  const colorLine = useOrbytColor('secondary');
  const colorText = useOrbytColor('primary');

  const handleLayout = (e: LayoutChangeEvent) => {
    setContainerWidth(e.nativeEvent.layout.width);
    setContainerHeight(e.nativeEvent.layout.height);
  };

  const labelsHeight = showLabel ? 30 : 0;
  const graphHeight = containerHeight - labelsHeight; 
  const zeroY = graphHeight / 2;

  const barWidth = lastN.length > 0 ? containerWidth / (lastN.length * 1.5) : 0;
  const spacing = barWidth * 0.5;
  const svgWidth = containerWidth;

  const graphData = lastN.map((month, i) => {
    const valueRatio = Math.abs(month.value) / maxValue;
    const barHeight = 0.8 * (valueRatio * (graphHeight / 2));
    const x = (1 / 6 + i) * (barWidth + spacing) + barWidth / 2;
    const rectX = (1 / 6 + i) * (barWidth + spacing);
    const y = month.value >= 0 ? zeroY - barHeight : zeroY + barHeight;
    const rectY = month.value >= 0 ? zeroY - barHeight : zeroY;
    
    return {
      month,
      x,         
      y,         
      rectX,     
      rectY,     
      rectWidth: barWidth,
      rectHeight: barHeight,
      value: month.value,
      color: month.value >= 0 ? colorW : colorL,
      textY: month.value >= 0 ? y - 8 : y + 14 
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

  if (values.length <= 0) {
    return (
      <View style={{ alignItems: 'center' }}>
        <ThemedText>No such data to plot graph</ThemedText>
      </View>
    );
  }

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

            {graphData.map((data, i) => (
              <React.Fragment key={`point-${i}`}>
                <Circle cx={data.x} cy={data.y} r={3} fill={colorLine} />
                <SvgText
                  x={data.x}
                  y={data.textY}
                  fontSize="10"
                  fill={colorText}
                  textAnchor="middle"
                >
                  {formatCompactNumber(data.value)}
                </SvgText>
              </React.Fragment>
            ))}
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
                  {formatData(data.month.label)}
                </ThemedText>
              ))}
            </View>
          )}
        </>
      )}
    </View>
  );
}
