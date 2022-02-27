const gulp = require('gulp')
const less = require('gulp-less')
const cleanCSS = require('gulp-clean-css')
const autoprefixer = require('gulp-autoprefixer')
const postcss = require('gulp-postcss')
const px2rem = require('postcss-px2rem')

// 创建监听任务
gulp.task('watch', function () {
  console.log('监听 src/styles/**/*.less 文件变化将自动转为 css')
  return gulp.watch('../src/styles/**/*.less', gulp.parallel('compiler'))
})

gulp.task('default', function () {
  const processors = [
    px2rem({ remUnit: 100 })
  ]
  return gulp.src('../src/style/index.less')
    .pipe(less()) // 编译 less
    .pipe(autoprefixer()) // 添加浏览器前缀兼容
    // .pipe(postcss(processors)) // px转rem
    .pipe(cleanCSS()) // css 样式压缩
    .pipe(gulp.dest('../dist/'))
})
