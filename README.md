# Qiankun 微前端示例项目

这是一个使用 [qiankun](https://qiankun.umijs.org/) 微前端框架构建的示例项目。该项目展示了如何将不同的前端应用（使用不同的框架构建）整合到一个统一的平台中。

## 项目结构

```
packages/
├── main/          # 主应用 (React + TypeScript)
├── todo-list/     # Todo List 子应用 (React + TypeScript)
└── counter/       # 计数器子应用 (Vue 3 + TypeScript)
```

## 技术栈

- **主应用**：React + TypeScript + React Router
- **Todo List 子应用**：React + TypeScript
- **计数器子应用**：Vue 3 + TypeScript
- **构建工具**：Vite
- **包管理器**：pnpm
- **微前端框架**：qiankun

## 功能特点

- 基于 qiankun 的微前端架构
- 多框架共存（React + Vue）
- TypeScript 支持
- 独立开发、构建和部署能力
- 统一的路由管理
- 默认加载 Todo List 应用

## 快速开始

### 环境要求

- Node.js >= 16
- pnpm >= 8

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
pnpm dev
```

这将启动所有应用的开发服务器：
- 主应用：http://localhost:5173
- Todo List 应用：http://localhost:5174
- 计数器应用：http://localhost:5175

### 构建

```bash
pnpm build
```

构建后的文件将输出到 `dist` 目录。

### 预览构建结果

```bash
pnpm serve
```

访问 http://localhost:5001 查看构建后的应用。

## 应用说明

### 主应用 (main)

- 作为基座应用，负责子应用的注册和加载
- 提供统一的导航菜单
- 使用 React Router 进行路由管理

### Todo List 应用 (todo-list)

- 简单的待办事项管理应用
- 默认加载的子应用
- 使用 React 开发

### 计数器应用 (counter)

- 简单的计数器应用
- 展示了 Vue 3 子应用的接入方式
- 支持增加和减少计数

## 开发指南

1. 子应用开发时可以独立运行和调试
2. 主应用通过 qiankun 的生命周期钩子加载和卸载子应用
3. 子应用需要导出 qiankun 所需的生命周期函数（bootstrap、mount、unmount）

## 注意事项

1. 确保各个应用的端口号不冲突
2. 子应用的路由需要配置正确的 base 路径
3. 开发时注意跨域问题的处理
