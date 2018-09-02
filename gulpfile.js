"use strict";

var gulp = require('gulp'),
  gutil = require('gulp-util'),
  webpack = require('webpack'),
  gulpWebpack = require('webpack-stream'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  // streamify = require('gulp-streamify'),
  // browserify = require('browserify'),
  compass = require('gulp-compass'),
  connect = require('gulp-connect'),
  open = require("gulp-open"),
  gulpif = require('gulp-if'),
  uglyfly = require('gulp-uglyfly'),

  // htmlmin = require('gulp-htmlmin'),
  // source = require('vinyl-source-stream'),
  path = require('path'),
  ftp = require('vinyl-ftp'),
  // reactify = require('reactify'),
  // babelify = require("babelify"),
  lint = require('gulp-eslint'),
  // imagemin = require('gulp-imagemin'),
  glob = require("glob"),
  // PurifyCSSPlugin = require('purifycss-webpack'),
  infoserver = require('../infoserver.json');
var concatFiles = require('gulp-concat-multi');
var plumber = require('gulp-plumber');

var env,
  jsSources,
  sassSources,
  htmlSources,
  outputDir,
  sassStyle,
  jsSourcesST,
  jsSourcesReuters,
  jsLibrary,
  jsLibraryReuters,
  projectSource,
  objEntry;

// values for ENV development,test,production
env = 'development';
// values for projectSource st or reuters
projectSource = 'st';

var env2 = env;
env = (env === "test" || env === "production") ?
  "production" :
  "development";

/*Start define all html, scss and js files*/
jsSources = ['./components/js/global.js'];
jsSourcesST = ['./components/js/functions.js', './components/js/app.js'];

// only for reuters files
jsSourcesReuters = ["development/components/js/main.js", "development/components/js/functions.js"];
jsLibraryReuters = ["development/components/js/vendor/vendor-top.js", "development/components/js/vendor.js"];
//
// only for sliders template
jsSourcesReuters = ["development/components/js/slides.js", "development/components/js/functions.js"];
jsLibraryReuters = ["development/components/js/plugins.js"];

jsLibrary = ['jquery', 'd3'];

sassSources = ['development/components/scss/app.scss', 'development/components/scss/components.scss'];
// htmlSources = [outputDir + '*.html'];
/*End define all html, scss and js files*/

var optionsImg = "";
var optionsImgHtml = "";
var optionsHtml = "";

var optionsFonts;
if (env2 === "development" || env2 === "test") {
  optionsFonts = "limit=1&name=[path][name].[ext]&publicPath=../../../fonts/&context=../fonts/";
} else {
  optionsFonts = "limit=1&name=[path][name].[ext]&publicPath=https://graphics.straitstimes.com/STI/STIMEDIA/Interactives/commons/fonts/&context=../fonts/";
}

var extractCSS = new ExtractTextPlugin({
  filename: "[name].css",
  allChunks: true
});
var extractSCSS = new ExtractTextPlugin({
  filename: "[name].css",
  allChunks: true
});

var optionsPluginsJS = [];

var optionsPluginsCSS = [extractCSS, extractSCSS];

if (projectSource !== 'reuters') {
  jsSources = jsSources.concat(jsSourcesST);
  objEntry = {
    'js/app': jsSources,
    'js/components': jsLibrary
  }

  optionsPluginsJS.push(new webpack.optimize.CommonsChunkPlugin({
    names: ['js/components'], // Specify the common bundle's name.
    // minChunks: function (module) {
    //   // this assumes your vendor imports exist in the node_modules directory
    //   return module.context && module.context.indexOf('node_modules') !== -1;
    // }
  }));
  optionsPluginsJS.push(new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: (env === "development") ? '"development"' : '"production"'
    }
  }));
} else {
  objEntry = {
    'js/app2': jsSources
  }
}

if (env !== "development") {
  outputDir = 'production/';
  sassStyle = 'compressed';

  optionsImg = "limit=10000&name=[path][name].[ext]&publicPath=../&outputPath=";
  optionsImgHtml = "limit=10000&name=[path][name].[ext]&publicPath=&outputPath=";

  optionsPluginsJS.push(new webpack.optimize.UglifyJsPlugin());
  // optionsPluginsCSS.push(new PurifyCSSPlugin({
  //   minimize: true,
  //   // Give paths to parse for rules. These should be absolute!
  //   paths: glob.sync(path.join(__dirname, '/development/*.html')).concat(glob.sync(path.join(__dirname, '/development/components/js/**/*.js')))
  // }));
} else {
  outputDir = 'development/';
  sassStyle = 'expanded';

  optionsHtml = "&emitFile=false";
  optionsImg = "emitFile=false&limit=1&name=[path][name].[ext]&publicPath=../&outputPath=";
  optionsImgHtml = "emitFile=false&limit=1&name=[path][name].[ext]&publicPath=&outputPath=";
}

gulp.task("bundle", function() {
  console.log(outputDir);
  concatFiles({
      "js/components.js": jsLibraryReuters,
      "js/app.js": jsSourcesReuters
    })
    .pipe(gulpif(env2 !== 'development', uglyfly()))
    .pipe(gulp.dest(outputDir));

});

gulp.task("js", function() {
  return gulp.src([])
    .pipe(plumber())
    .pipe(gulpWebpack({
      context: __dirname + '/development',
      entry: objEntry,
      output: {
        filename: '[name].js'
      },
      resolve: {
        extensions: [".js", '.css'],
        alias: {
          'images': path.resolve(__dirname, 'development/images'),
        }
      },
      watch: true,
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
      },
      bail: false,
      module: {
        loaders: [{
          test: /\.js$/,
          exclude: /(node_modules)/,
          include: path.resolve(__dirname, "development/components/js"),
          loader: "babel-loader?presets[]=env&presets[]=react&plugins[]=transform-object-assign"
        }, {
          test: /\.css$/,
          exclude: /(node_modules)/,
          include: path.resolve(__dirname, "development/components/precss"),
          use: extractCSS.extract({
            fallback: 'style-loader',
            use: [{
              loader: 'css-loader'
            }, {
              loader: 'postcss-loader'
            }]
          })
        }, {
          test: /\.html$/,
          use: [{
            loader: 'file-loader?name=[name].html' + optionsHtml
          }, {
            loader: 'extract-loader'
          }, {
            loader: 'html-loader',
            options: {
              minimize: (env === "development") ?
                false : true
            }
          }]
        }, {
          test: /\.(jpe?g|png|gif|svg)$/,
          exclude: /(node_modules)/,
          include: path.resolve(__dirname, "development/images"),
          loader: [
            'url-loader?' + optionsImgHtml,
            'img-loader'
          ]
        }]
      },
      plugins: optionsPluginsJS
    }, webpack))
    .pipe(gulp.dest(outputDir));
});

gulp.task("css", function() {
  return gulp.src([])
    .pipe(plumber())
    .pipe(gulpWebpack({
      context: __dirname + '/development',
      entry: {
        'css/app2': './components/precss/app.css',
        'css/app': './components/scss/app.scss',
        'css/components': './components/scss/components.scss'
      },
      output: {
        filename: '[name].css'
      },
      resolve: {
        extensions: [
          ".js", '.css'
        ],
        alias: {
          '../images': path.resolve(__dirname, 'development/images'),
        }
      },
      watch: true,
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
      },
      bail: false,
      module: {
        loaders: [{
          test: /\.js$/,
          exclude: /(node_modules)/,
          loader: "babel-loader?presets[]=env&presets[]=react&plugins[]=transform-object-assign"
        }, {
          test: /\.css$/,
          exclude: /(node_modules)/,
          include: path.resolve(__dirname, "development/components/precss"),
          use: extractCSS.extract({
            fallback: 'style-loader',
            use: [{
              // loader: 'css-loader?url=false&minimize=true'
              loader: 'css-loader',
              options: {
                minimize: (env === "development") ?
                  false : true,
                root: __dirname + '/development/'
              }
            }, {
              loader: 'postcss-loader'
            }]
          })
        }, {
          test: /\.scss$/,
          exclude: /(node_modules)/,
          include: path.resolve(__dirname, "development/components/scss"),
          use: extractSCSS.extract({
            fallback: 'style-loader',
            use: [{
              // loader: 'css-loader?url=false&minimize=true'
              loader: 'css-loader',
              options: {
                minimize: (env === "development") ?
                  false : true,
                root: __dirname + '/development/'
              }
            }, {
              loader: 'postcss-loader'
            }, {
              loader: 'sass-loader'
            }]
          })
        }, {
          test: /\.(eot|woff|ttf|woff2|svg)$/,
          exclude: /(node_modules)/,
          include: path.resolve(__dirname, "../fonts"),
          loader: ['url-loader?emitFile=false&' + optionsFonts]
        }, {
          test: /\.(jpe?g|png|gif|svg)$/,
          exclude: /(node_modules)/,
          include: path.resolve(__dirname, "development/images"),
          loader: [
            'url-loader?' + optionsImg,
            'img-loader'
          ]
        }]
      },
      plugins: optionsPluginsCSS
    }, webpack))
    .pipe(gulp.dest(outputDir));

});

gulp.task('compass', function() {
  var path_font = (env2 === "development" || env2 === "test") ?
    "/" :
    "https://graphics.straitstimes.com/STI/STIMEDIA/Interactives/commons/";
  gulp.src(sassSources).pipe(compass({
      sass: 'development/components/scss',
      css: outputDir + 'css',
      image: outputDir + 'images',
      style: sassStyle,
      // font: outputDir + 'fonts',
      font: 'fonts',
      http_path: path_font,
      relative: false,
      require: ['susy', 'breakpoint']
    }).on('error', gutil.log))
    //    .pipe(gulp.dest( outputDir + 'css'))
    .pipe(connect.reload());
});

gulp.task('lint', function() {
  return gulp.src(outputDir + 'js').pipe(lint({
    config: 'eslint.config.json'
  })).pipe(lint.format());
});

gulp.task('watch', function() {
  if (projectSource === 'reuters') {
    gulp.watch(jsSourcesReuters, ['bundle', 'lint']);
  }

  // gulp.watch(jsSources, ['js', 'lint']);
  // gulp.watch([
  //     'development/components/scss/*.scss', 'development/components/scss/*/*.scss'
  // ], ['compass']);
  // gulp.watch('development/*.html', ['html']);
  // gulp.watch('../production/*', ['deploy']);
});

gulp.task('connect', function() {
  connect.server({
    root: outputDir,
    livereload: true,
    port: 8080
  });
});

gulp.task('open', function() {
  var o = "http://localhost/2017/" + path.parse(__dirname).base + "/" + outputDir;
  gulp.src(outputDir + '/index.html').pipe(open({
    uri: o
  }));
});

// gulp.task('html', function() {
//     gulp.src('development/*.html').pipe(gulpif(env === 'production', htmlmin({collapseWhitespace: true, removeComments: true, collapseInlineTagWhitespace: true}))).pipe(gulpif(env === 'production', gulp.dest(outputDir))).pipe(connect.reload());
// });

// gulp.task('svg', function() {
//     gulp.src('development/svg/**/*.svg').pipe(gulpif(env === 'production', htmlmin({collapseWhitespace: true, removeComments: true, collapseInlineTagWhitespace: true}))).pipe(gulpif(env === 'production', gulp.dest(outputDir + 'svg'))).pipe(connect.reload());
// });

// Copy images to production
gulp.task('move', function() {
  // gulp.src('./../fonts/**/*.*')
  //     .pipe(gulpif(env === 'development',gulp.dest(outputDir + 'fonts')));

  // gulp.src('development/images/**/*.*').pipe(gulpif(env === 'production', imagemin())).pipe(gulpif(env === 'production', gulp.dest(outputDir + 'images')));
  gulp.src('development/csv/**/*.*').pipe(gulpif(env === 'production', gulp.dest(outputDir + 'csv')));
  // gulp.src('development/svg/**/*.*')
  //     .pipe(gulpif(env === 'production', gulp.dest(outputDir + 'svg')));
  gulp.src('development/videos/**/*.*').pipe(gulpif(env === 'production', gulp.dest(outputDir + 'videos')));
});

gulp.task('deploy', function() {

  var conn = ftp.create({
    host: infoserver.servers.development.serverhost,
    user: infoserver.servers.development.username,
    password: infoserver.servers.development.password,
    log: gutil.log
  });

  var globs = [
    outputDir + '*.html',
    outputDir + 'css/*',
    outputDir + 'csv/*',
    outputDir + 'fonts/**/*',
    outputDir + 'images/**/*',
    outputDir + 'js/*',
    outputDir + 'svg/*',
    outputDir + 'videos/*',
    outputDir + 'babylon/*'
  ];

  return gulp.src(globs, {
    base: outputDir,
    buffer: false
  }).pipe(conn.newerOrDifferentSize('infographics/' + path.parse(__dirname).base)). // only upload newer files
  pipe(conn.dest('infographics/' + path.parse(__dirname).base));

  // .pipe(conn.newerOrDifferentSize('infographics/' + path.parse(path.dirname(path.normalize(__dirname))).base)) // only upload newer files
  // .pipe(conn.dest('infographics/' + path.parse(path.dirname(path.normalize(__dirname))).base));
});

var tasks_to_execute = [
  'css', 'js', 'watch',
  // 'svg',
  'lint',
  'move',
  'open'
];
if (projectSource === 'reuters')
  tasks_to_execute.push('bundle');
gulp.task('default', tasks_to_execute);