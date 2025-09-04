const path = require('path');
const fs = require('fs');
const gulp = require('gulp');
const less = require('gulp-less');
const header = require('gulp-header');
const tap = require('gulp-tap');
const nano = require('gulp-cssnano');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const comments = require('postcss-discard-comments');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync');
const childProcess = require('child_process');
const pkg = require('./package.json');
const convertCssVar = require('gulp-convert-css-var');

const yargs = require('yargs').options({
  w: {
    alias: 'watch',
    type: 'boolean',
  },
  s: {
    alias: 'server',
    type: 'boolean',
  },
  p: {
    alias: 'port',
    type: 'number',
  },
}).argv;

const option = { base: 'src' };
const dist = `${__dirname}/dist`;

// 样式标记常量定义
const STYLE_MARKERS = {
  // 主题样式
  THEME: {
    START: 'WeUI theme START',
    END: 'WeUI theme END'
  },

  // COMPONENT: {
  //   START: 'WeUI component START',
  //   END: 'WeUI component END'
  // }
};

// 创建标记注释
function createMarkerComment(marker) {
  return `/*! ${marker} */`;
}

// 创建保留正则表达式
function createPreserveRegex(markers) {
  const allMarkers = Object.values(markers).flatMap(m => [m.START, m.END]);
  return new RegExp(allMarkers.join('|'));
}

// 移除指定标记区间的样式内容
function removeStylesBetweenMarkers(cssContent, startMarker, endMarker) {
  const startComment = createMarkerComment(startMarker);
  const endComment = createMarkerComment(endMarker);

  const startIndex = cssContent.indexOf(startComment);
  const endIndex = cssContent.indexOf(endComment);

  if (startIndex !== -1 && endIndex !== -1) {
    const endPosition = endIndex + endComment.length;
    return cssContent.substring(0, startIndex) + cssContent.substring(endPosition);
  }

  return cssContent;
}

// 移除注释标记里的内容
function removeThemeStyles(cssContent) {
  return removeStylesBetweenMarkers(
    cssContent,
    STYLE_MARKERS.THEME.START,
    STYLE_MARKERS.THEME.END
  );
}

// 移除注释标记
function removeThemeMarkers(cssContent) {
  const startComment = createMarkerComment(STYLE_MARKERS.THEME.START);
  const endComment = createMarkerComment(STYLE_MARKERS.THEME.END);

  return cssContent
    .replace(startComment, '\n\n')
    .replace(endComment, '\n\n');
}

// 组件映射表
// 定义需要构建的组件和对应的源文件
const componentMap = {
  'weui': 'src/style/weui.less',
  'base': 'src/style/base/base.less',

  'weui-icon': 'src/style/icon/weui-icon.less',
  'weui-agree': 'src/style/widget/weui-agree/weui-agree.less',
  'weui-animate': 'src/style/widget/weui-animate/weui-animate.less',
  'weui-button': 'src/style/widget/weui-button/weui-button.less',
  'weui-flex': 'src/style/widget/weui-flex/weui-flex.less',
  'weui-footer': 'src/style/widget/weui-footer/weui-footer.less',
  'weui-grid': 'src/style/widget/weui-grid/weui-grid.less',
  'weui-loading': 'src/style/widget/weui-loading/weui-loading.less',
  'weui-media-box': 'src/style/widget/weui-media-box/weui-media-box.less',
  'weui-panel': 'src/style/widget/weui-panel/weui-panel.less',
  'weui-picker': 'src/style/widget/weui-picker/weui-picker.less',
  'weui-progress': 'src/style/widget/weui-progress/weui-progress.less',
  'weui-searchbar': 'src/style/widget/weui-searchbar/weui-searchbar.less',
  'weui-slider': 'src/style/widget/weui-slider/weui-slider.less',
  'weui-steps': 'src/style/widget/weui-steps/weui-steps.less',

  // 多文件 weui-cell
  'weui-cell': 'src/style/widget/weui-cell/weui-cell_global.less',
  'weui-cell-form': 'src/style/widget/weui-cell/weui-cell-form.less',
  'weui-switch': 'src/style/widget/weui-cell/weui-switch.less',
  'weui-uploader': 'src/style/widget/weui-cell/weui-uploader.less',
  'weui-check': 'src/style/widget/weui-cell/weui-check.less',
  'weui-gallery': 'src/style/widget/weui-cell/weui-gallery.less',

  // 多文件 weui-page
  'weui-article': 'src/style/widget/weui-page/weui-article.less',
  'weui-form': 'src/style/widget/weui-page/weui-form.less',
  'weui-msg': 'src/style/widget/weui-page/weui-msg.less',

  // 多文件 weui-tab
  'weui-tab': 'src/style/widget/weui-tab/weui-tab.less',

  // 多文件 weui-text
  'weui-link': 'src/style/widget/weui-text/weui-link.less',

  // 多文件 weui-tips
  'weui-actionsheet': 'src/style/widget/weui-tips/weui-actionsheet.less',
  'weui-badge': 'src/style/widget/weui-tips/weui-badge.less',
  'weui-dialog': 'src/style/widget/weui-tips/weui-dialog.less',
  'weui-half-screen-dialog': 'src/style/widget/weui-tips/weui-half-screen-dialog.less',
  'weui-information-bar': 'src/style/widget/weui-tips/weui-information-bar.less',
  'weui-list-tips': 'src/style/widget/weui-tips/weui-list-tips.less',
  'weui-loadmore': 'src/style/widget/weui-tips/weui-loadmore.less',
  'weui-mask': 'src/style/widget/weui-tips/weui-mask.less',
  'weui-toast': 'src/style/widget/weui-tips/weui-toast.less',
  'weui-toptips': 'src/style/widget/weui-tips/weui-toptips.less',
};

function exec(cmd) {
  return new Promise((resolve, reject) => {
    const process = childProcess.exec(cmd, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
    process.stdout.on('data', (data) => {
      console.log(data);
    });
  });
}

function buildStyle() {
  const banner = [
    '/*!',
    ' * WeUI v<%= pkg.version %> (<%= pkg.homepage %>)',
    ' * Copyright <%= new Date().getFullYear() %> Tencent, Inc.',
    ' * Licensed under the <%= pkg.license %> license',
    ' */',
    '',
  ].join('\n');

  // 遍历映射表，为每个组件创建构建流程
  Object.entries(componentMap).forEach(([componentName, sourcePath]) => {
    gulp
      .src(sourcePath, option)
      .pipe(sourcemaps.init())
      .pipe(less().on('error', function (e) {
        console.error(`Error in ${componentName}:`, e.message);
        this.emit('end');
      }))
      .pipe(postcss([autoprefixer(['iOS >= 7', 'Android >= 4.1']), comments({
        preserve: createPreserveRegex(STYLE_MARKERS),
      })]))
      .pipe(convertCssVar())
      .pipe(tap(function(file) {
        let content = file.contents.toString();

        if (componentName.startsWith('weui-') && componentName !== 'weui') {
          // 如果是组件，则移除注释标记中的主题样式
          content = removeThemeStyles(content);
        } else {
          // 否则移除注释标记
          content = removeThemeMarkers(content);
        }

        file.contents = Buffer.from(content);
      }))
      .pipe(header(banner, { pkg }))
      .pipe(rename({ basename: componentName }))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(dist))
      .pipe(browserSync.reload({ stream: true }))

      // min
      .pipe(nano({
        zindex: false,
        autoprefixer: false,
        svgo: false,
        minifySelectors: false,
      }))
      .pipe(rename({ basename: componentName + '.min' }))
      .pipe(gulp.dest(dist));
  });

  return Promise.resolve();
}
function buildExampleAssets() {
  return gulp
    .src('src/example/**/*.?(png|jpg|gif|js)', option)
    .pipe(gulp.dest(dist))
    .pipe(browserSync.reload({ stream: true }));
}
function buildExampleStyle() {
  return gulp
    .src('src/example/example.less', option)
    .pipe(less().on('error', function (e) {
      console.error(e.message);
      this.emit('end');
    }))
    .pipe(postcss([autoprefixer(['iOS >= 7', 'Android >= 4.1'])]))
    .pipe(nano({
      zindex: false,
      autoprefixer: false,
      reduceIdents: false,
    }))
    .pipe(gulp.dest(dist))
    .pipe(browserSync.reload({ stream: true }));
}
function buildExampleHTML() {
  return gulp
    .src('src/example/index.html', option)
    .pipe(tap((file) => {
      const dir = path.dirname(file.path);
      let contents = file.contents.toString();
      contents = contents.replace(
        /<link\s+rel="import"\s+href="(.*)">/gi,
        (match, $1) => {
          const filename = path.join(dir, $1);
          const id = path.basename(filename, '.html');
          const content = fs.readFileSync(filename, 'utf-8');
          return (
            `<script type="text/html" id="tpl_${
              id
            }">\n${
              content
            }\n</script>`
          );
        },
      );
      file.contents = new Buffer(contents);
    }))
    .pipe(gulp.dest(dist))
    .pipe(browserSync.reload({ stream: true }));
}

gulp.task('build:style', buildStyle);
gulp.task('build:example:assets', buildExampleAssets);
gulp.task('build:example:style', buildExampleStyle);
gulp.task('build:example:html', buildExampleHTML);

gulp.task('build:example', gulp.parallel('build:example:assets', 'build:example:style', 'build:example:html'));

gulp.task('build', gulp.parallel('build:style', 'build:example'));

gulp.task('tag', () => new Promise((resolve) => {
  const tag = `v${pkg.version}`;
  exec(`git tag ${tag}`).then(resolve);
}));

// 参数说明
//  -w: 实时监听
//  -s: 启动服务器
//  -p: 服务器启动端口，默认8080
gulp.task('default', gulp.series('build', () => new Promise((resolve) => {
  if (yargs.s) {
    yargs.p = yargs.p || 8080;
    browserSync.init({
      server: {
        baseDir: './dist',
      },
      ui: {
        port: yargs.p + 1,
        weinre: {
          port: yargs.p + 2,
        },
      },
      port: yargs.p,
      startPath: '/example',
    });
    resolve();
  }

  if (yargs.w) {
    const list = [
      {
        path: 'src/style/**/*',
        task: buildStyle,
      },
      {
        path: 'src/example/**/*.?(png|jpg|gif|js)',
        task: buildExampleAssets,
      },
      {
        path: 'src/example/example.less',
        task: buildExampleStyle,
      },
      {
        path: 'src/example/**/*.html',
        task: buildExampleHTML,
      },
    ];
    list.forEach((item) => {
      let timeout = null;
      gulp.watch(path.resolve(__dirname, item.path)).on('change', (path) => {
        clearTimeout(timeout);

        console.log(path);
        timeout = setTimeout(() => {
          item.task();
        }, 300);
      });
    });
    resolve();
  }

  resolve();
})));
