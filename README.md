# 用户中心前端

## 1. 技术选型

- 前端三件套

- React 

- 组件库 Ant Design （即支持Vue，又支持React）

- Umi （对React的封装）

- Ant Design Pro（现成的管理系统）

> **Ant Design 组件库** 封装了 **React**
>
> **Ant Design Procomponents** 封装了 Ant Design，和业务的关系更密切，可以理解为业务组件，更定制化
>
> **Ant Design Pro 后台管理系统** => 使用 React、Ant Design、Ant Design Procomponents、其他的库组合而成的完整的系统

## 2. 前端初始化

- 下载 node.js: [Node.js (nodejs.org)](https://nodejs.org/en) 

- 创建 Ant Design Pro: https://pro.ant.design/zh-CN

```shell
# 使用 npm
npm i @ant-design/pro-cli -g
pro create myapp
```

- 安装 Umi UI: 
```shell
yarn add @umijs/preset-ui -D
```

- 在 package.json 里运行 start

  - 坑: 由于 node 的版本太高(我的是18，按理用16) 导致报错
  - 解决办法: 直接在 package.json 里修改
  
```json
"scripts": {
    "start": "SET NODE_OPTIONS=--openssl-legacy-provider && cross-env UMI_ENV=dev umi dev",
    "build": "SET NODE_OPTIONS=--openssl-legacy-provider && umi build",
```

## 3. 解决跨域问题

- 原因：当前前端的浏览器里的地址是8000端口，与后端端口不一样

- 解决方式：很多，要么搭一个代理，要么在你的后端去支持跨域，但后端支持跨域不够安全

- Ant Design 提供了一个配置代理的方式，我们直接用即可
  - 在 config/proxy.ts 文件里，这里是正向代理
  - 我们只需要修改代码，指定具体路径，就能把地址代理到我们想要请求的地址

```ts
dev: {
    // localhost:8000/api/** -> https://preview.pro.ant.design/api/**
    '/api/': {
      // 要代理的地址
      target: 'http://localhost:8080',
      // 配置了这个可以从 http 代理到 https
      // 依赖 origin 的功能可能需要这个，比如 cookie
      changeOrigin: true,
    },
  },
```

## 4. 前端用户管理功能实现

- **使用 Procomponents 的高级表格**：[ProTable - 高级表格 - ProComponents (ant.design) ](https://procomponents.ant.design/components/table?tab=api&current=1&pageSize=5) 

- **定义表格的列名**：传递给表格组件后就能生成列名内容)，这里先用 `currentUser` 类型：`ProColumns<CurrentUser>[]`

- **定义每列的内容**：注意将表格列名变量后后台返回的字段对应上，通过 columns 定义表格有哪些列，**columns 属性**：
  - dataIndex 对应返回数据对象的属性(后端对应变量名)
  - title 表格列名
  - copyable 是否允许复制
  - ellipsis 是否允许缩略
  - tooltip 提示
  - valueType：用于声明这一列的类型（date、select[枚举值,支持下拉查询]）

- **解决头像渲染为文字的问题**：`render` 函数
  - `render` 函数通常接收至少两个参数。第一个参数代表当前单元格的值，对应于列的 `dataIndex` 指定的字段（这里是 `avatarUrl`）。第二个参数 (`record`) 是当前行的数据对象，包含了整行的数据。
  - `render` 函数需要返回一个 React 节点（JSX）。这个节点将会被渲染在表格的单元格中。这里使用 ant-design 的 Image 组件(展示图片更加友好)，图像的 `src` 属性通过 `record.avatarUrl` 获取，即每行数据中的 `avatarUrl` 字段。
  - 使用 `render` 函数对数据进行处理或转换，并以不同的格式或组件显示，比如在这里以图像的形式显示用户的头像。

```tsx
{
    title: '头像',
    dataIndex: 'avatarUrl',
    render: (_, record) => (
      <div>
        <Image src={record.avatarUrl} width={100}/>
      </div>
    ),
  },
```










