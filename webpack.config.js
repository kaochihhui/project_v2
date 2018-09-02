var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var env,
    jsSources,
    jsLibrary;

env = 'production';
// process.env.NODE_ENV=env;
var env2 = env;
env = (env === "test" || env === "production")
    ? "production"
    : "development";
if (env === 'development') {
    outputDir = 'development/';
    sassStyle = 'expanded';
} else {
    outputDir = 'production/';
    sassStyle = 'compressed';
}

/*Start define all html, scss and js files*/
jsSources = ['./development/components/js/functions.js', './development/components/js/app.js'];

// jsLibrary = [''];
jsLibrary = ['jquery', 'd3'];

var optionsImg = "";
if (env === "development") {
    optionsImg = "limit=1&name=[name].[ext]&publicPath=../images/&outputPath=images/";
} else {
    optionsImg = "limit=10000&name=[name].[ext]&publicPath=../images/&outputPath=images/";
}

var extractCSS = new ExtractTextPlugin({filename: "[name].css", allChunks: true});
var HtmlWebpackPlugin = require('html-webpack-plugin');
var generateJs = {
    // devtool: "source-map",
    entry: {
        'js/app': jsSources,
        'js/components': jsLibrary
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, outputDir)
    },
    resolve: {
        extensions: [".js",'.css']
    },
    watch: true,
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    },
    plugins: [
        // new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['js/components'], // Specify the common bundle's name.
            // minChunks: function (module) {
            //   // this assumes your vendor imports exist in the node_modules directory
            //   return module.context && module.context.indexOf('node_modules') !== -1;
            // }
        }),
        new webpack.DefinePlugin({'process.env.NODE_ENV': '"production"'})
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: [
                    {
                        loader: "babel-loader?presets[]=env&presets[]=react&plugins[]=transform-object-assign"
                    }
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                exclude: /(node_modules)/,
                loader: [
                    'url-loader?' + optionsImg,
                    'img-loader'
                ]
            }
        ]
    }
};

var generateCss = {
    // devtool: "source-map",
    entry: {
        'css/app': './development/components/precss/app.css',
        'css/components': './development/components/precss/components.css',
        // 'index.html':'./development/index.html'
    },
    output: {
        filename: '[name].css',
        path: path.resolve(__dirname, outputDir)
    },
    resolve: {
        extensions: [".js",'.css']
    },
    watch: true,
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    },
    plugins: [
        // new webpack.optimize.UglifyJsPlugin(),
        new webpack.DefinePlugin({'process.env.NODE_ENV': '"production"'}),
        extractCSS
    ],
    module: {
        rules: [
          {
                test: /\.css$/,
                exclude: /(node_modules)/,
                include: path.resolve(__dirname, "development/components/precss"),
                use: extractCSS.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader'
                        }, {
                            loader: 'postcss-loader'
                        }
                    ]
                })
            },
            // {
            //   test: /\.html$/,
            //   use:[
            //     {
            //       loader:'file-loader?name=[name].html'
            //     },{
            //       loader:'html-loader'
            //     }
            //   ]
            // },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                exclude: /(node_modules)/,
                loader: [
                    'url-loader?' + optionsImg,
                    'img-loader'
                ]
            }
        ]
    }
};

var generateHtml = {
    // devtool: "source-map",
    entry:['./development/index.html'],
    output: {
        filename: '[name].html',
        path: path.resolve(__dirname, outputDir)
    },
    resolve: {
        extensions: [".js",'.css']
    },
    watch: true,
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    },
    plugins: [
        // new webpack.optimize.UglifyJsPlugin(),
        new webpack.DefinePlugin({'process.env.NODE_ENV': '"production"'}),
        extractCSS
    ],
    module: {
        rules: [
          {
                test: /\.css$/,
                exclude: /(node_modules)/,
                include: path.resolve(__dirname, "development/components/precss"),
                use: extractCSS.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader'
                        }, {
                            loader: 'postcss-loader'
                        }
                    ]
                })
            },
            {
              test: /\.html$/,
              use:[
                {
                  loader:'file-loader?name=[name].html'
                },{
                  loader:'html-loader'
                }
              ]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                exclude: /(node_modules)/,
                loader: [
                    'url-loader?' + optionsImg,
                    'img-loader'
                ]
            }
        ]
    }
};
module.exports = [generateHtml];
