# 起步

来到这里默认你已经接触过了熟悉现在化的一些工程化项目的流程；

这里用的模板语言是react的jsx，若是已经有接触，可以继续，没有接触过的建议先去搂一眼，熟悉一下[JSX](https://www.cnblogs.com/zourong/p/6043914.html)

yamjs内部实现了集成[webComponents](https://developer.mozilla.org/zh-CN/docs/Web/Web_Components)，加入了数据驱动的思想，使其成为一个因数据而改变的组件。

让我们开始吧。

使用yamjs-cli 工具创建一个应用出来；

`yamjs create app`

在目录路径执行

- `yarn dev`开始开发模式

- `yarn abuild`打包应用；开发应用时类似`vue,reactjs`的应用

- `yarn cbuild` 打包组件为模块文件，会自动生成`yamjs-app.esm.js`总的组件库文件以及各个模块的文件

---

vscode 用户建议安装**`yamjs-snipptes`**扩展

