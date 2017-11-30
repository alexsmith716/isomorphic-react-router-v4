const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');

// webpack-isomorphic-tools is extensible,
// and finding the real paths for assets is the simplest example of what it can do inside require() calls.
// Using custom configuration one can make require() calls (on the server) return anything
// (not just a String; it may be a JSON object, for example).

module.exports = {
  // debug: see debugging messages in the console.
  debug: false,
  // webpack_assets_file_path: webpack-assets.json is created by webpack-isomorphic-tools
  // webpack_assets_file_path: webpack-assets.json keeps track of the real paths to your assets
  webpack_assets_file_path: './webpack-assets.json',
  // assets:  define all asset types
  // keys of this object will appear in:
  //  * webpack-assets.json
  //  * .assets() method call result
  //  * .regularExpression(key) method call
  assets: {
    // images: which file types belong to this asset type
    images: {
      extensions: ['jpeg', 'jpg', 'png', 'gif', 'svg'],
      parser: WebpackIsomorphicToolsPlugin.url_loader_parser
    },
    // fonts: which file types belong to this asset type
    fonts: {
      extensions: ['woff', 'woff2', 'eot', 'ttf'],
      parser: WebpackIsomorphicToolsPlugin.url_loader_parser
    },
    style_modules: {
      extensions: ['css', 'less', 'scss'],
      filter: function(module, regex, options, log) {
        if (options.development) {
          // in development mode there's webpack "style-loader",
          // so the module.name is not equal to module.name
          return WebpackIsomorphicToolsPlugin.style_loader_filter(
            module,
            regex,
            options,
            log
          );
        } else {
          // in production mode there's no webpack "style-loader",
          // so the module.name will be equal to the asset path
          return regex.test(module.name);
        }
      },
      path: function(module, options, log) {
        if (options.development) {
          // in development mode there's webpack "style-loader",
          // so the module.name is not equal to module.name
          return WebpackIsomorphicToolsPlugin.style_loader_path_extractor(
            module,
            options,
            log
          );
        } else {
          // in production mode there's no webpack "style-loader",
          // so the module.name will be equal to the asset path
          return module.name;
        }
      },
      parser: function(module, options, log) {
        if (options.development) {
          return WebpackIsomorphicToolsPlugin.css_modules_loader_parser(
            module,
            options,
            log
          );
        } else {
          // in production mode there's Extract Text Loader which extracts CSS text away
          return module.source;
        }
      }
    }
  },
  // if you're using Webpack's `resolve.modulesDirectories`
  // then you should also put them here.
  modulesDirectories: ['node_modules'],
  // enables support for `require.context()` and `require.ensure()` functions.
  // is turned off by default
  // to skip unnecessary code instrumentation
  // because not everyone uses it.
  patch_require: false
};
