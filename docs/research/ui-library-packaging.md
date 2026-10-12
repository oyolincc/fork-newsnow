# UI 库构建调研

调研时间：2026-10-12。范围：`libs/ui` 的 React/Park 源码、Vite+ / tsdown / Rolldown 构建和 Panda CSS v2 设计系统产物。本文记录选型依据；构建、测试和安装命令由用户执行，本文不代表新配置已经通过验证。

## 结论与约束

本项目适合 ESM、按模块输出、保持源文件客户端指令、外置 React 与 Ark 依赖、单独生成 Panda 设计系统产物。选择 `unbundle: true` 的理由是保留模块边界和后续扩展能力，不是因为它在所有 React 库中都优于 bundling。

React 的 `use client` 定义模块依赖图上的客户端边界，传递依赖也会进入客户端子树。把 banner 加到整个入口会扩大这个边界。保留叶子组件的指令，允许主入口成为只重导出的 barrel，更符合日后混合组件和工具的需求。[React 指令说明](https://react.dev/reference/rsc/use-client)

Rolldown 原生保留入口模块的顶部自定义指令，也在 `preserveModules` 模式下保留普通模块的指令；因此本案不需要额外的指令插件，也不需要屏蔽 `MODULE_LEVEL_DIRECTIVE` 来掩盖问题。仍需验收真实产物的指令位置。[Rolldown 指令规则](https://rolldown.rs/in-depth/directives)

## 官方工具链实践

Vite+ 的 `vp pack` 使用 tsdown，官方建议把构建配置放在 `vite.config.ts` 的 `pack` 中，而不是额外维护 `tsdown.config.ts`。[Vite+ Pack](https://viteplus.dev/guide/pack)

tsdown 的 React 最小示例使用 `platform: 'neutral'`、声明生成和标准 TSX 转换，无需额外 React 转换插件。`neutral` 面向多个运行环境，适合既由浏览器消费又参与 SSR 的库；它默认只按 `exports` 解析依赖，对没有该字段的包需另行检查解析行为。[React recipe](https://tsdown.dev/recipes/react-support)、[Platform](https://tsdown.dev/options/platform)

tsdown 默认外置 `dependencies`、`peerDependencies` 和 `optionalDependencies`，包括这些包的子路径；React 已是 peer 时，无需重复列举 `react/jsx-runtime`。不要把 React 打进库，避免消费方出现第二份 React 实例。自定义外置应只解决实际的依赖边界问题，不必照抄所有社区配置。[Dependencies](https://tsdown.dev/options/dependencies)

`unbundle` 会输出入口直接或间接引用的模块，而不是自动发布目录中每个未使用文件。默认 root 来自入口公共目录；`root` 影响输出目录映射。因此 `src` 与包根 `styled-system` 并列时，必须结合实际生成文件与包导出核对路径，不能只增加一个布尔选项。[Unbundle](https://tsdown.dev/options/unbundle)、[Root](https://github.com/rolldown/tsdown/blob/main/skills/tsdown/references/option-root.md)

声明生成应只包含公开入口及其依赖，避免把仅供 Panda 配置运行的整个主题目录当作待发布声明入口。声明产物的真实文件路径必须与 `exports.types` 相符。`isolatedDeclarations` 可以提速，但要求源码更明确的类型标注，不应为本次构建修复批量改写 Park 组件。[DTS](https://tsdown.dev/options/dts)

## 社区实现并不只有一种

Lenis 的 tsdown 配置对核心、React、Vue 等构建分别设 entry；React 构建使用 `use client` banner，并外置 React 和 Lenis。它的 React entry 本就整体面向客户端，因此 banner 是其明确的架构选择，不是普遍错误。[Lenis 实际配置](https://github.com/darkroomengineering/lenis/blob/main/tsdown.config.ts)

Reactuse v6.5.0 改为 tsdown unbundle，入口为薄重导出 barrel，发布说明将此关联到 Next 的 `optimizePackageImports` 对单 hook 依赖链的裁剪。它报告的体积结果只适用于该项目和场景，不能直接作为本库收益承诺。[Reactuse 维护者发布说明](https://github.com/childrentime/reactuse/releases)

社区在 tsdown 官方讨论中也有从源码直发、Vite preserveModules 再到 glob 多入口的迁移实例，但该讨论没有形成“所有库必须 unbundle”的官方结论。[tsdown Discussion #877](https://github.com/rolldown/tsdown/discussions/877)

## Tree shaking 与 sideEffects

保留模块并不等于自动消除所有未用代码。消费方还需要 ESM 导入和可靠的副作用信息。对于不在导入时修改全局、注册 polyfill 或注入样式的组件模块，可以声明无副作用；如果以后附带 CSS，`sideEffects: ["**/*.css"]` 会保留样式文件，同时允许删除未用 JS 模块。对每个文件的声明必须符合真实行为，不能把副作用一律抹掉。[Rolldown DCE 与组件库示例](https://rolldown.rs/in-depth/dead-code-elimination)

## Panda v2 的另一条产物链

Panda 官方同时支持 monorepo 源码入口和发布 built dist，并不要求内部库一定预先打包。本项目已经决定验证构建后的包边界，因此保留这条路线；应用用 `designSystem` 读取主题和样式 buildinfo，不能把库源码再次加入应用的 `include`。[Build a design system](https://panda-css.com/docs/design-systems/build-a-design-system)

Panda `lib` 管理样式子路径导出和 `dist/panda`。主组件入口由包维护，`vp pack` 不应再自动覆盖整个 exports。必须一起保留 `dist` 与导出指向的 `styled-system`，peer 主版本范围通过 peer 或 CLI 参数明确。built-only fallback 的 glob 应指向实际发布的 JS，而不是未发布的主题 TS。[Publishing](https://panda-css.com/docs/design-systems/publishing)

本项目的推论：生成代码 → 清理并构建组件 → 生成 Panda manifest，应保持这个顺序；后续 watch 模式也必须更新 Panda manifest，单独 `vp pack --watch` 不能表达完整设计系统更新流程。[Monorepo workflow](https://panda-css.com/docs/design-systems/monorepo-workflow)

## 本轮验收边界

用户重新构建后应验证：Button 文件保留客户端指令；主入口未被全局标为客户端；组件、DTS、Panda manifest 的导出文件存在；本地别名已转换为可解析引用；React 与 Ark 仍为外部导入；包不含意外的 `node_modules` 实现。消费方运行和 CSS 提取属于后续 MVP 环节，构建成功不能替代它们。

## 当前落实的配置

`pack` 使用 `unbundle: true`、`root: '.'`、`outDir: 'dist/react'`、`platform: 'neutral'` 和 `fixedExtension: true`。最后一项将 ESM 扩展名固定为 `.mjs` / `.d.mts`，避免平台切换时改变现有包的扩展名约定。源码组件入口映射到 `dist/react/src/index.*`，入口没有全局客户端 banner；带指令的叶子模块保留自己的边界。`root: '.'` 同时容纳并列的 `src` 和 `styled-system`。

第三方生产依赖和 React peers 使用 tsdown 默认外置规则；`deps.onlyBundle: []` 阻止意外内联开发依赖，不使用 `neverBundle: true`，因为 `styled-system/*` 是本地路径别名，不能被误当成外部 npm 包保留下来。当前 JS 不执行全局注册或样式注入，`sideEffects: ['**/*.css']` 为消费方保留 CSS 的副作用。

Panda 独立写入 `dist/panda`，组件构建只清理 `dist/react`。包的 `files` 精确列出 `dist/react`、`dist/panda`、`styled-system`，旧版顶层 `dist/index.*` 不会被带入发布内容，无需为此次调整删除旧文件。Panda peer 设置为 `^2.0.0`，由 `panda lib` 写进 manifest。`--files './react/**/*.{js,mjs}'` 以 lib 的输出目录 `dist` 为基准，限定后备源码为组件构建产物；该相对基准也由安装版本 CLI 的帮助文本确认。

构建执行 codegen、组件构建和 Panda lib。按用户要求，已移除自定义产物验收脚本。声明构建仍使用 `tsconfig.build.json`，从公开入口及依赖生成声明；生成声明不能代替全源码类型检查。

用户执行构建后，本地 `dist/react/src/components/atoms/button.mjs` 第一行确认为 `"use client";`。安装版本仍发出泛化的 `MODULE_LEVEL_DIRECTIVE` 警告，因此现在通过 `onLog` 仅过滤 warn 级别、该代码且明确指向 `use client` 的诊断，其余日志仍交给默认处理器。

用户验收命令（仓库根目录）：

```bash
vp install
pnpm --filter @newsnow/ui run build
pnpm --filter @newsnow/ui exec tsc --noEmit
pnpm --filter @newsnow/ui exec npm pack --dry-run
```

在本轮构建验收之后，开发模式需要分别启动三个职责明确的 watcher：`dev:codegen` 更新本地 helpers，`dev` 更新组件模块，`dev:panda` 更新设计系统 manifest / buildinfo。单独启动 `dev` 不能同步整个设计系统。应用端的启动顺序、样式刷新和消费验收仍在后续 MVP 环节完成。

这是一套依据当前架构选择的配置，不是对未知浏览器范围、RSC 消费应用或交互正确性的已验证承诺。构建、类型检查及消费方验收由用户执行。
