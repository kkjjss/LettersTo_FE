module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '~': './src',
          '@screens': './src/Screens',
          '@components': './src/Components',
          '@hooks': './src/Hooks',
          '@stores': './src/Store',
          '@types': './src/types',
          '@utils': './src/Utils',
          '@constants': './src/Constants',
          '@assets': './src/Assets',
          '@apis': './src/APIs',
        },
      },
    ],
  ],
};
