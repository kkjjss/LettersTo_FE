import React, {useMemo} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {PAPER_COLORS, PAPER_STYLES} from '../../Constants/letter';
import {SCREEN_HEIGHT} from '../../Constants/screen';

const paperGrid = require('../../Assets/paper/paper_grid.png');
const paperDotted = require('../../Assets/paper/paper_dotted.png');
const paperPlain = require('../../Assets/paper/paper_plane.png');

const checkMark = require('../../Assets/check.png');

type Props = {
  setPaperColor: React.Dispatch<React.SetStateAction<string>>;
  paperColor: string;
  setPaperStyle: React.Dispatch<
    React.SetStateAction<typeof PAPER_STYLES[number]>
  >;
  paperStyle: typeof PAPER_STYLES[number];
};

export const PaperSelector = ({
  setPaperColor,
  paperColor,
  setPaperStyle,
  paperStyle,
}: Props) => {
  const PaperColorSelector = () => {
    const PaperColorButton = ({color}: {color: string}) => {
      const isSelectedColor = useMemo(() => color === paperColor, [color]);

      return (
        <TouchableOpacity
          onPress={() => {
            setPaperColor(color);
          }}
          activeOpacity={0.7}
          style={[
            styles.paperColorButton,
            {
              backgroundColor: color,
            },
          ]}>
          {isSelectedColor && (
            <Image style={styles.checkMarkImage} source={checkMark} />
          )}
        </TouchableOpacity>
      );
    };

    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.paperColorSelector}>
        {PAPER_COLORS.map((color, index) => {
          return <PaperColorButton key={index} color={color} />;
        })}
      </ScrollView>
    );
  };

  const PaperStyleSelector = () => {
    const PaperStyleButton = ({
      style,
    }: {
      style: typeof PAPER_STYLES[number];
    }) => {
      let source: any;
      let name: string = '';

      switch (style) {
        case 'grid':
          source = paperGrid;
          name = '모눈노트';
          break;
        case 'dotted':
          source = paperDotted;
          name = '도트노트';
          break;
        case 'plain':
          source = paperPlain;
          name = '플레인노트';
          break;
      }

      const isSelectedStyle = useMemo(() => style === paperStyle, [style]);

      return (
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.paperStyleButton}
          onPress={() => {
            setPaperStyle(style);
          }}>
          <Image source={source} style={styles.paperStyleImage} />
          {isSelectedStyle ? (
            <View style={styles.checked}>
              <Image source={checkMark} style={styles.checkMarkImageSmall} />
            </View>
          ) : (
            <View style={styles.unchecked} />
          )}
          <Text style={styles.paperStyleName}>{name}</Text>
        </TouchableOpacity>
      );
    };
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.paperStyleSelector}>
        {PAPER_STYLES.map((style, index) => {
          return <PaperStyleButton key={index} style={style} />;
        })}
      </ScrollView>
    );
  };

  return (
    <View
      style={{
        height: SCREEN_HEIGHT * 0.4,
      }}>
      <PaperColorSelector />
      <PaperStyleSelector />
    </View>
  );
};

const styles = StyleSheet.create({
  paperColorSelector: {paddingVertical: 16, marginHorizontal: 16},
  paperColorButton: {
    marginRight: 12,
    height: 32,
    width: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkMarkImage: {height: 16, width: 16},
  paperStyleSelector: {marginHorizontal: 16},
  paperStyleButton: {marginRight: 16, position: 'relative'},
  paperStyleImage: {
    height: 160,
    width: 118,
  },
  checkMarkImageSmall: {height: 15, width: 15},
  checked: {
    backgroundColor: '#ff6ece',
    position: 'absolute',
    right: 5,
    top: 5,
    height: 22,
    width: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  unchecked: {
    backgroundColor: '#ffc7f0',
    position: 'absolute',
    right: 5,
    top: 5,
    height: 22,
    width: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#fff',
  },
  paperStyleName: {
    textAlign: 'center',
    fontFamily: 'Galmuri11',
    fontSize: 14,
    color: 'white',
  },
});
