### 使用流程

- 首先下载node.js并安装
- 创建一个工作目录，将脚本放置到工作目录下. 如：`D:\Weblogin`
- 安装node依赖包
```powershell
powershell
cd D:\Weblogin
npm install jquery
npm install jsdom
```
- 将weblogin.ps1中的前两行username和password修改为你自己的学号和密码
- 运行weblogin.ps1
```
.\weblogin.ps1
```

- 配置开机自动运行
自行搜索任务计划程序使用说明
重点：配置启动程序为powershell，附加参数为脚本位置，如`D:\Weblogin\weblogin.ps1`