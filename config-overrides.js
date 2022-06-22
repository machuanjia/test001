const path = require('path')

const {
  override,
  addDecoratorsLegacy,
  disableEsLint,
  addBundleVisualizer,
  addWebpackAlias,
  adjustWorkbox,
  addLessLoader,
  overrideDevServer,
  // watchAll,
  fixBabelImports,
  addPostcssPlugins,
} = require('customize-cra')
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent')
const getStyleLoaders = (cssOptions, preProcessor, lessOptions) => {
  // 这个是use里要设置的，封装了下
  const loaders = [
    require.resolve('style-loader'),
    {
      loader: require.resolve('css-loader'),
      options: cssOptions,
    },
    {
      // Options for PostCSS as we reference these options twice
      // Adds vendor prefixing based on your specified browser support in
      // package.json
      loader: require.resolve('postcss-loader'),
      options: {
        // Necessary for external CSS imports to work
        // https://github.com/facebook/create-react-app/issues/2677
        ident: 'postcss',
        plugins: () => [
          require('postcss-flexbugs-fixes'),
          require('postcss-preset-env')({
            autoprefixer: {
              flexbox: 'no-2009',
            },
            stage: 3,
          }),
        ],
      },
    },
  ]
  if (preProcessor) {
    loaders.push({
      loader: require.resolve(preProcessor),
      options: lessOptions,
    })
  }
  return loaders
}

const devConfig = () => {
  return (config) => {
    return {
      ...config,
      before(app) {
        // apiMocker(app, path.resolve(__dirname, './mock/index.js'))
      },
      proxy:{
        '/apis/v1alpha1':{
          target: process.env.REACT_APP_APISERVER,
          changeOrigin: true,
        },
        '/apis/v1':{
          target: process.env.REACT_APP_APISERVER,
          changeOrigin: true,
        },
        '/oauth2':{
          target: process.env.REACT_APP_APISERVER,
          changeOrigin: true,
        },
        '/cvat':{
          target: process.env.REACT_APP_CVAT,
          changeOrigin: true,
        }
      }
    }
  }
}
module.exports = {
  webpack: override(
    // enable legacy decorators babel plugin
    addDecoratorsLegacy(),

    // disable eslint in webpack
    disableEsLint(),

    // add webpack bundle visualizer if BUNDLE_VISUALIZE flag is enabled
    process.env.BUNDLE_VISUALIZE == 1 && addBundleVisualizer(),

    // add an alias for "ag-grid-react" imports
    addWebpackAlias({
      '@': path.resolve(__dirname, 'src'),
    }),
    addLessLoader({
      lessOptions: {
        javascriptEnabled: true,
        modifyVars: {
          'primary-color': '#2249C0',
          'link-color': '#2249C0',
          'success-color': '#21b58c',
          'warning-color':'#FFAB04',
          'error-color':'#e31818',
          'font-size-base':'14px',
          'heading-color':'#626E85',
          'text-color':'#111830',
          'text-color-secondary':'#f3A4861',
          'disabled-color':'#d9d9d9',
          'border-radius-base':'2px',
          'border-color-base':'#d9d9d9',
          'height-base': '36px',
          // 'pagination-item-bg-active': '#2249C0'
        }
      },
    }),
    fixBabelImports('antd', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true,
    }),
    fixBabelImports('otter-pro', {
      libraryName: 'otter-pro',
      libraryDirectory: 'es/components',
      style: true //(module) => `${module}/index.less`,
    }),
    addPostcssPlugins([require('tailwindcss'), require('autoprefixer')]),

    // adjust the underlying workbox
    adjustWorkbox((wb) =>
      Object.assign(wb, {
        skipWaiting: true,
        exclude: (wb.exclude || []).concat('index.html'),
      }),
    ),
    (config) => {
      const oneOf_loc = config.module.rules.findIndex((n) => n.oneOf) // 这里的config是全局的
      config.module.rules[oneOf_loc].oneOf = [
        {
          test: /\.module\.less$/,
          use: getStyleLoaders(
            {
              importLoaders: 2,
              modules: {
                getLocalIdent: getCSSModuleLocalIdent,
              },
            },
            'less-loader',
          ),
        },
        ...config.module.rules[oneOf_loc].oneOf,
      ]
      return config
    },
  ),
  devServer: overrideDevServer(
    // dev server plugin
    devConfig(),
    // watchAll(),
  ),
}
