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
  return gulp
    .src('src/style/weui.less', option)
    .pipe(sourcemaps.init())
    .pipe(less().on('error', function (e) {
      console.error(e.message);
      this.emit('end');
    }))
    .pipe(postcss([autoprefixer(['iOS >= 7', 'Android >= 4.1']), comments()]))
    .pipe(convertCssVar())
    .pipe(header(banner, { pkg }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dist))
    .pipe(browserSync.reload({ stream: true }))
    .pipe(nano({
      zindex: false,
      autoprefixer: false,
      svgo: false,
    }))
    .pipe(rename((path) => {
      path.basename += '.min';
    }))
    .pipe(gulp.dest(dist));
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
