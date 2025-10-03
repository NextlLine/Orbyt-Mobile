import React from 'react';
import { useOrbytColor } from '@/hooks/defaultColors';
import { CustomCarousel } from '../util/carousel';
import CustomBarGraph from '../util/barGraph';
import { View } from 'react-native';
import CustonPizzaGraph from '../util/pizzaGraph';
import { FinanceWallet } from '@/model/models';

type FinanceCarouselProps = {
  finances: FinanceWallet;
};

export default function FinanceCarousel({ finances }: FinanceCarouselProps) {
  return (
    <View style={{ width: '100%', height: '100%' }}>
      <CustomCarousel
        items={[
          {
            content: (
                <CustomBarGraph values={finances.monthReport} />
            ),
          },
          // {
          //   content: (
          //       <CustonPizzaGraph/>
          //   )
          // },

        ]}
        style={{ width: '100%', height: '100%' }}
        activeTagColor={useOrbytColor('activeTag')}
      />
    </View>
  );
}
