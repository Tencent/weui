var yargs = require('yargs').argv;
var gulp = require('gulp');
var less = require('gulp-less');
var header = require('gulp-header');
var minify = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var pkg = require('./package.json');

var option = {base: 'src'};
var dist = __dirname + '/dist';

gulp.task('source', function(){
    gulp.src('src/example/**/*.!(less)', option)
        .pipe(gulp.dest(dist))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('styles', ['source'], function () {
    gulp.src('src/example/example.less', option)
        .pipe(less().on('error', function (e){
            console.error(e.message);
            this.emit('end');
        }))
        .pipe(autoprefixer())
        .pipe(minify())
        .pipe(gulp.dest(dist))
        .pipe(browserSync.reload({stream: true}));

    var banner = [
        '/*!',
        ' * WeUI v<%= pkg.version %> (<%= pkg.homepage %>)',
        ' * Copyright <%= new Date().getFullYear() %> Tencent, Inc.',
        ' * Licensed under the <%= pkg.license %> license',
        ' */',
        ''].join('\n');
    gulp.src('src/style/weui.less', option)
        .pipe(sourcemaps.init())
        .pipe(less().on('error', function (e) {
            console.error(e.message);
            this.emit('end');
        }))
        .pipe(sourcemaps.write())
        .pipe(autoprefixer())
        .pipe(header(banner, { pkg : pkg } ))
        .pipe(gulp.dest(dist))
        .pipe(minify())
        .pipe(rename(function (path) {
            path.basename += '.min';
        }))
        .pipe(gulp.dest(dist))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('release', ['styles']);

gulp.task('watch', function () {
    gulp.watch('src/**/*.less', ['styles']);
    gulp.watch('src/example/**/*.{html,js}', ['source'], function () {
        browserSync.reload();
    });
});

gulp.task('server', function () {
    yargs.p = yargs.p || 8080;
    browserSync.init({
        server: {
            baseDir: "./dist"
        },
        ui: {
            port: yargs.p + 1,
            weinre: {
                port: yargs.p + 2
            }
        },
        port: yargs.p,
        startPath: '/example'
    });
});


// 参数说明
//  -w: 实时监听
//  -s: 启动服务器
//  -p: 服务器启动端口，默认8080
gulp.task('default', ['release'], function () {
    if (yargs.s) {
        gulp.start('server');
    }

    if (yargs.w) {
        gulp.start('watch');
    }
});