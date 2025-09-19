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
} from "react-native";

interface CarouselItem {
  tag: string;
  content: React.ReactNode;
}

interface CustomCarouselProps {
  items: CarouselItem[];
  spacing?: number; // espaço entre itens em px
  initialIndex?: number;
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

  // quando o usuário rola, atualiza activeIndex com base no containerWidth
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

  // mede o espaço que o pai deu pro carrossel
  handleLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    // só setar se mudou (evita re-renders infinitos)
    if (width && width !== this.state.containerWidth) {
      this.setState({ containerWidth: width }, () => {
        // se initialIndex foi passado e > 0, posiciona o scroll nele
        const { activeIndex, containerWidth } = this.state;
        if (activeIndex > 0 && this.scrollRef.current) {
          const spacing = this.props.spacing ?? 0;
          const x = activeIndex * (containerWidth + spacing);
          this.scrollRef.current.scrollTo({ x, animated: false });
        }
      });
    }
  };

  // rola programaticamente para um índice (quando clica na tag)
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
      <View style={{ width: "100%", backgroundColor: "rgba(255, 255, 255, 0)" }} onLayout={this.handleLayout}>
        {containerWidth > 0 && (
          <>
           <View style={styles.tagContainer}>
              {items.map((it, i) => (
                <TouchableOpacity key={i} onPress={() => this.scrollToIndex(i)} activeOpacity={0.7}>
                  <Text style={[styles.tagText, activeIndex === i && styles.activeTag]}>
                    {it.tag}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
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
              contentContainerStyle={{ paddingHorizontal: spacing / 2 }}
            >
              {items.map((item, i) => (
                <View
                  key={i}
                  style={{
                    width: containerWidth,
                    marginHorizontal: spacing / 2,
                    backgroundColor: "rgba(255, 0, 0, 0)"
                  }}
                >
                  {item.content}
                </View>
              ))}
            </ScrollView>

           
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
    backgroundColor: "rgba(255, 0, 0, 0)"
  },
  tagText: {
    marginHorizontal: 6,
    fontSize: 14,
    color: "#888",
  },
  activeTag: {
    fontWeight: "700",
    color: "#111",
    textDecorationLine: "underline",
  },
});
