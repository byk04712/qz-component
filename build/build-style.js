const gulp = require('gulp')
const less = require('gulp-less')
const cleanCSS = require('gulp-clean-css')
const autoprefixer = require('gulp-autoprefixer')
const postcss = require('gulp-postcss')
const pxtorem = require('postcss-pxtorem')

const styles = {
  src: '../src/styles/index.less',
  dest: '../dist/styles'
}

// 编译 less
gulp.task('compiler', function () {
  return gulp.src(styles.src)
    .pipe(less())
    .pipe(autoprefixer()) // 是否添加浏览器前缀兼容
    .pipe(postcss(pxtorem({
      rootValue: 100,
      propWhiteList: [],
      minPixelValue: 1
    })))
    .pipe(cleanCSS()) // css 样式压缩
    .pipe(gulp.dest(styles.dest))
})

// 创建监听任务
gulp.task('watch', function () {
  gulp.watch('../src/styles/**/*.less', gulp.parallel('compiler'))
  console.log('监听 src/styles/**/*.less 文件变化将自动转为 css')
})

gulp.task('default', gulp.parallel(['compiler', 'watch']))
