# 起步

来到这里默认你已经接触过了熟悉现在化的一些工程化项目的流程；

这里用的模板语言是react的jsx，若是已经有接触，可以继续，没有接触过的建议先去搂一眼，熟悉一下[JSX](https://www.cnblogs.com/zourong/p/6043914.html)

yamjs内部实现了集成[webComponents](https://developer.mozilla.org/zh-CN/docs/Web/Web_Components)，加入了数据驱动的思想，使其成为一个因数据而改变的组件。

让我们开始吧。

使用yam-cli 工具创建一个应用出来；

`yamjs create app`

在目录路径执行

- `yarn dev`开始开发模式

- `yarn build`打包应用；开发应用时类似`vue,reactjs`的应用

- `yarn build:all` 打包组件未模块文件，会自动生成`yamComponet.esm.min.js`esModule类型文件,`yamComponet.common.min` CommoJS 类型文件,`yamComponet.min.js` UMD文件，三种类型用于其他框架使用