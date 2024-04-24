const parser = {
  dataUrlCondition: {
    maxSize: 4 * 1024,
  },
};

const generator = {
  filename: 'assets/[name].[contenthash][ext]',
};

function assetsRule() {
  return {
    module: {
      rules: [
        {
          test: /\.(png|jpe?g|gif)$/i,
          type: 'asset',
          parser,
          generator,
        },
        {
          test: /\.svg$/i,
          type: 'asset',
          resourceQuery: { not: [/react/] }, // exclude react component if *.svg?react
          parser,
          generator,
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator,
        },
        {
          test: /\.svg$/i, 
          issuer: /\.[jt]sx?$/,
          resourceQuery: /react/, // *.svg?react
          use: [{ loader: require.resolve('@svgr/webpack'), options: { icon: true } }],
        },
      ],
    },
  };
}

module.exports = {
  assetsRule,
};
