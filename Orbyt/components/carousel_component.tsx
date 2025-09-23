import React from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
  LayoutChangeEvent,
  ViewStyle,
} from "react-native";
import { ThemedText } from "./themed-text";
import { useOrbytColor } from "@/assets/colors/defaultColors";

interface CarouselItem {
  tag?: string;
  content: React.ReactNode;
}

interface CustomCarouselProps {
  items: CarouselItem[];
  spacing?: number;
  initialIndex?: number;
  activeTagColor: string;
  style?: ViewStyle;
}

interface CustomCarouselState {
  activeIndex: number;
  containerWidth: number;
}

export class CustomCarousel extends React.Component<
  CustomCarouselProps,
  CustomCarouselState
> {
  scrollRef = React.createRef<ScrollView>();

  state: CustomCarouselState = {
    activeIndex: this.props.initialIndex ?? 0,
    containerWidth: 0,
  };

  handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset } = event.nativeEvent;
    const spacing = this.props.spacing ?? 0;
    const { containerWidth } = this.state;

    if (containerWidth <= 0) return;

    const index = Math.round(contentOffset.x / (containerWidth + spacing));
    if (index !== this.state.activeIndex) {
      this.setState({ activeIndex: index });
    }
  };

  handleLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    if (width && width !== this.state.containerWidth) {
      this.setState({ containerWidth: width }, () => {
        const { activeIndex, containerWidth } = this.state;
        if (activeIndex > 0 && this.scrollRef.current) {
          const spacing = this.props.spacing ?? 0;
          const x = activeIndex * (containerWidth + spacing);
          this.scrollRef.current.scrollTo({ x, animated: false });
        }
      });
    }
  };

  scrollToIndex = (index: number) => {
    const spacing = this.props.spacing ?? 0;
    const { containerWidth } = this.state;
    if (!this.scrollRef.current || containerWidth <= 0) return;
    const x = index * (containerWidth + spacing);
    this.scrollRef.current.scrollTo({ x, animated: true });
    this.setState({ activeIndex: index });
  };

  render() {
    const { items, spacing = 0 } = this.props;
    const { activeIndex, containerWidth } = this.state;

    return (
      <View
        style={this.props.style}
        onLayout={this.handleLayout}
      >
        {containerWidth > 0 && (
          <>
            <ScrollView
              ref={this.scrollRef}
              horizontal
              showsHorizontalScrollIndicator={false}
              pagingEnabled={false}
              decelerationRate="fast"
              snapToInterval={containerWidth + spacing}
              snapToAlignment="start"
              onScroll={this.handleScroll}
              scrollEventThrottle={16}
              style={{ backgroundColor: "transparent" }}
              contentContainerStyle={{
                backgroundColor: "transparent",
              }}
            >
              {items.map((item, i) => (
                <View
                  key={i}
                  style={{
                    width: containerWidth,
                    marginHorizontal: spacing / 2,
                    backgroundColor: "transparent",
                  }}
                >
                  {item.content}
                </View>
              ))}
            </ScrollView>

                 <View style={styles.tagContainer}>
              {items.map((it, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => this.scrollToIndex(i)}
                  activeOpacity={0.7}
                >
                  <ThemedText
                    style={[
                      styles.tagText,
                      activeIndex === i && [styles.activeTag, { color:  this.props.activeTagColor}],
                    ]}
                  >
                    {(it.tag ? it.tag : "●")}
                  </ThemedText>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tagContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: 10,
    backgroundColor: "transparent", 
  },
  tagText: {
    marginHorizontal: 6,
    fontSize: 14,
    color: "#888",
  },
  activeTag: {
    fontWeight: "700",
    // color: useOrbytColor('activeTag'),
  },
});
