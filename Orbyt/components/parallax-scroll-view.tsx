import { Dimensions, StyleSheet } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollOffset,
} from 'react-native-reanimated';
import { Image } from 'expo-image';
import { ThemedView } from '@/components/themed-view';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useThemeColor } from '@/hooks/use-theme-color';
import { ThemedText } from './themed-text';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React, { PropsWithChildren } from 'react';
import { opacity } from 'react-native-reanimated/lib/typescript/Colors';
import { useOrbytColor } from '@/hooks/defaultColors';

export const SCREEN_SIZE = Dimensions.get('window');
const IMAGE_SIZE = SCREEN_SIZE.height * 0.15;
const HEADER_HEIGHT = IMAGE_SIZE * 1.2;

type Props = PropsWithChildren<{
  headerBackgroundColor: { color: string };
}>;

export default function ParallaxScrollView({
  children,
  headerBackgroundColor,
}: Props) {

  const iconSource = require('@/assets/images/whiteIcon.png')
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollOffset(scrollRef);
  const insets = useSafeAreaInsets();
  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [2, 1, 1]
          ),
        },
      ],
    };
  });

  return (
    <Animated.ScrollView
      ref={scrollRef}
      style={{ backgroundColor: useOrbytColor('background'), flex: 1 }}
      scrollEventThrottle={10}>
      <Animated.View
        style={[
          styles.header,
          {
            backgroundColor: headerBackgroundColor.color,
          },
          headerAnimatedStyle,
        ]}>
        <Image
          source={iconSource}
          style={[
            styles.objectInsideHeader,
            {
              marginTop: insets.top
            },
          ]}
        />
      </Animated.View>
      <ThemedView style={[
        styles.content,
        {
          backgroundColor: useOrbytColor('background'),
        }
      ]}>
        {children}
      </ThemedView>
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    height: HEADER_HEIGHT,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  objectInsideHeader: {
    width: IMAGE_SIZE,
    aspectRatio: 1,
    // tintColor: "red" 
  },
  content: {
    flex: 1,
    padding: 10,
    gap: 16,
    overflow: 'hidden',
  },
});

