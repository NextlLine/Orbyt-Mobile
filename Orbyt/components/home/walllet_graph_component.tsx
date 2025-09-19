import React, { useState } from 'react';
import { View, LayoutChangeEvent } from 'react-native';
import Svg, { Rect } from 'react-native-svg';
import { Wallet } from '@/app/(tabs)/home';
import { useOrbytColor } from '@/assets/colors/defaultColors';
import { ThemedText } from '../themed-text';

type WalletsInfoGraphProps = {
  wallet: Wallet;
};

const formatMonth = (monthStr: string) => {
  const [month] = monthStr.split('-');
  const map: Record<string, string> = {
    '01': 'jan',
    '02': 'fev',
    '03': 'mar',
    '04': 'abr',
    '05': 'mai',
    '06': 'jun',
    '07': 'jul',
    '08': 'ago',
    '09': 'set',
    '10': 'out',
    '11': 'nov',
    '12': 'dez',
  };
  return map[month] || month;
};

export default function WalletsInfoGraph({ wallet }: WalletsInfoGraphProps) {
  const [containerWidth, setContainerWidth] = useState(0);
  const lastSix = wallet.totalMonth.slice(-6);
  const maxValue = Math.max(...lastSix.map(m => Math.abs(m.value))) || 1;

  const maxHeight = 150;
  const zeroY = maxHeight / 2;

  const colorW = useOrbytColor('gainGraph');
  const colorL = useOrbytColor('looseGraph');

  const handleLayout = (e: LayoutChangeEvent) => {
    setContainerWidth(e.nativeEvent.layout.width);
  };

  const barWidth = lastSix.length > 0 ? containerWidth / (lastSix.length * 1.5) : 0;
  const spacing = barWidth * 0.5;
  const svgWidth = lastSix.length * (barWidth + spacing);


  return (
    <View
      style={{ alignItems: 'center', width: '100%', backgroundColor: "transparent" }}
      onLayout={handleLayout}
    >
      <ThemedText style={{ marginBottom: 8 }}>
        Ganho de capital nos últimos 6 meses
      </ThemedText>

      {containerWidth > 0 && (
        <View style={{ backgroundColor: "transparent", alignSelf:'center' }}>
          <Svg height={maxHeight} width={svgWidth}>
            {lastSix.map((month, i) => {
              const valueRatio = Math.abs(month.value) / maxValue;
              const barHeight = valueRatio * (maxHeight) / 2;

              return (
                <Rect
                  key={i}
                  x={i * (barWidth + spacing)}
                  y={month.value >= 0 ? zeroY - barHeight : zeroY}
                  width={barWidth}
                  height={barHeight}
                  fill={month.value >= 0 ? colorW : colorL}
                  rx={4}
                />
              );
            })}
          </Svg>

          <View style={{ flexDirection: 'row', alignSelf:'center' }}>
            {lastSix.map((month, i) => (
              <ThemedText
                type="default"
                key={i}
                style={{
                  width: barWidth + spacing,
                  textAlign: 'center',
                }}
              >
                {formatMonth(month.month)}
              </ThemedText>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}
