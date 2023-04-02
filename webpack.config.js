const path = require('path');

module.exports = [
  {
    mode: 'development',
    entry: './src/index.ts',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.js', '.tsx'],
    },
    output: {
      filename: 'index.js',
      path: path.resolve(__dirname, 'test'),
    },
  }, 
  // {
  //   mode: 'development',
  //   entry: './src/react-test.tsx',
  //   module: {
  //     rules: [
  //       {
  //         test: /\.tsx?$/,
  //         use: 'ts-loader',
  //         exclude: /node_modules/,
  //       },
  //     ],
  //   },
  //   resolve: {
  //     extensions: ['.ts', '.js', '.tsx'],
  //   },
  //   output: {
  //     filename: 'react-test.js',
  //     path: path.resolve(__dirname, 'test'),
  //   },
  // }
];