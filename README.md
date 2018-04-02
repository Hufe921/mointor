# monitor

> Front-end monitoring based on node.js

``` 
一、监控对象：

1.白屏时间
2.用户可操作时间
3.文档加载完成时间
4.浏览器内核版本
5.错误具体信息
6.错误所在行，列
7.错误所在url
8.访客地理位置

二、监控原理：

1.响应时间操作原理：HTML5提供的performance接口精确的告诉我们当访问一个网站页面时当前网页每个处理阶段的精确时间(timestamp)，以方便我们进行前端分析。
2.错误记录原理： window.onerror 对象
3.地理位置记录原理：IP地址，及第三方api

三、node.js架构

1.架构采用（基于koa2 Sequelize的node.js API架构）
2.建立数据库（actions，errors）
3.进行逻辑处理
```
