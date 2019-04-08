module.exports = {
  modify: function(config, {target, dev}, webpack) {
    return {
      ...config,
      module: {
        ...config.module,
        rules: [
          ...config.module.rules,
          {
            test: require.resolve('jquery'),
            use: [
              {
                loader: 'expose-loader',
                options: 'jQuery',
              },
              {
                loader: 'expose-loader',
                options: '$',
              },
            ],
          },
        ],
      },
    };
  },
};
