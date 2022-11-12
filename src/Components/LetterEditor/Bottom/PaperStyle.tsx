import React from 'react';
import {View} from 'react-native';
import {Dotted} from '../../PaperStyle/Dotted';
import {Grid} from '../../PaperStyle/Grid';

interface Props {
  lineColor: string;
  paperStyle?: 'dotted' | 'grid' | 'plain';
}

export const PaperStyle = React.memo(({lineColor, paperStyle}: Props) => {
  return (
    <View style={{position: 'relative'}}>
      {paperStyle === 'grid' && <Grid lineColor={lineColor} />}
      {paperStyle === 'dotted' && <Dotted lineColor={lineColor} />}
    </View>
  );
});
