var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// 利用 Express 托管静态文件
// 将 public 目录下的图片、CSS 文件、JavaScript 文件对外开放访问
// Express 在静态目录查找文件，因此，存放静态文件的目录名不会出现在 URL 中
// 例如：http://localhost:3000/stylesheets/style.css
// 要为express.static函数所服务的文件创建虚拟路径前缀（文件系统中实际上不存在该路径），请为静态目录指定安装路径，如下所示
// app.use('/static', express.static('public'))
// 您提供给express.static函数的路径是相对于您启动节点进程的目录的。如果您从另一个目录运行Express App，则使用您要提供的目录的绝对路径更为安全：
app.use('/static', express.static(path.join(__dirname, 'public')))
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
