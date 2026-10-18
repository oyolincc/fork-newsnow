# UI 组件预览

从仓库根目录运行：

```bash
vp run @newsnow/ui#storybook
vp run @newsnow/ui#storybook:check
vp run @newsnow/ui#storybook:build
```

开发页面默认使用端口 6006；静态构建输出到 `libs/ui/storybook-static/`。

Storybook 直接调试 UI 源码，不需要先构建 UI 包。预览使用独立 Vite 配置；
Panda 配置复用 UI 的主题和配方，向 `.storybook/styled-system/` 生成专用运行时。
Docs 容器按需加载，独立 Story 不提前加载文档界面；开发服务仅预热 UI 公共源码入口，
减少首次转换的瀑布等待。预热不减少请求数量。UI 与 Panda 生成代码保留源码模块和热更新，
不强制预构建为大包；第三方依赖由 Storybook 的 Vite builder 自动发现并缓存预构建结果。

`storybook:check` 会生成这份运行时并检查 stories 与配置，不改写原有生成目录。
Controls 在运行时选择参数，因此预览专用 Panda 配置预生成所有配方变体，
以及面板提供的 gray、lime、red、green 配色；增加配色选项时需同步这份列表。

每个组件族维护一个 CSF 3 文件。纯视觉变体采用汇总 story，独立交互场景单独组织。
示例从 `@newsnow/ui` 或其公开子入口导入组件，用 args 提供可调整参数。

交互示例直接保留完整的插槽组合；仅在组件族内复用日历视图、树节点等重复结构，
不抽取跨组件的通用演示组件，也不依赖 Stack 路由。
Playground 使用 Controls 调整参数；受控示例在具名 render 函数内维护 React 状态，
store 示例使用 UI 包导出的 hook 和 RootProvider。固定配置的行为示例关闭 Controls，
避免出现调整参数却不生效的面板。Ark 的值变化等轻量参数通过 `fn()` 接入 Actions。
原生点击、输入事件先提取类型、按钮文字或输入值，再用 `action()` 记录；不要将完整的
React 事件（包含 DOM 与 Window 引用）传入记录链路，避免 Docs 交互被同步序列化阻塞。

Variants、Loading、Sizes、Colors 使用 `tags: ['!dev']`，仅在 Docs 中展示，减少侧栏入口。
Playground 和受控、store 等行为场景保留独立入口，便于隔离调试。Docs 与独立入口复用同一份 story。
组件主题工具栏同步预览组件及 Docs 内容区的背景、文字和参数表；侧栏等管理界面沿用 Storybook 设置。
Button 的链接示例保留真实 anchor 语义，拦截默认导航并滚动到示例内的状态文本，避免离开工作台。
含 hook / ref 的示例展示原始 render 源码（`docs.source.type: 'code'`），
保留可复制的状态逻辑，并避开 Storybook 动态序列化 ref 时的 React 19 兼容性提示。
Portal 使用默认容器，渲染到预览 iframe 的 document；主题也施加在同一 document 上。
需要 DOM id 的交互用 `useId`，避免同一 Docs 页中的示例互相干扰。

## 迁移清单

原文件均位于 `apps/stack/frontend/routes/ui/`。迁移以功能场景为单位，
不保留原页面的导航、主题开关及验收标题；主题统一由工具栏控制。

| 原验收内容                                                            | Storybook                                                       | 进度   |
| --------------------------------------------------------------------- | --------------------------------------------------------------- | ------ |
| `-ButtonPreview.tsx` 配方、尺寸、配色                                 | `Actions/Button`：Playground、Variants、Sizes、Colors           | 已迁移 |
| 同上：加载、ref 聚焦、计数、禁用、asChild 链接                        | Loading、Interactions                                           | 已迁移 |
| 同上：按维度自定义、IconButton、CloseButton、ButtonGroup              | Customization、Group                                            | 已迁移 |
| `-DialogPreview.tsx` 非受控、焦点、阻止关闭、确认、内部滚动、自定尺寸 | `Overlays/Dialog`：Playground、Controlled、CustomSize           | 已迁移 |
| `-SelectPreview.tsx` 单选、多选、禁用、原生表单、自定义尺寸和外观     | `Collections/Select`：Playground、ControlledForm、Customization | 已迁移 |
| `api.tsx` 的 Dialog / Select hook、RootProvider、泛型事件             | 对应组件族的 Store                                              | 已迁移 |
| `api.tsx` 的 Combobox API                                             | `Collections/Combobox`：Store                                   | 已迁移 |
| 其余 28 个 `-…Preview.tsx`                                            | 按下表拆入对应组件族                                            | 已迁移 |

第三步的实际文件归属如下；表中的组件名对应目录内的 `组件名.stories.tsx`。
混合页面按组件族拆分；`Forms/Form` 单独保留跨字段提交、重置和外部控制场景。

| 原 Preview 文件（省略 `-` 和 `Preview.tsx`） | stories 文件                                                                                                |
| -------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Forms                                        | `forms/`：Form、Input、Textarea、Switch、RadioGroup                                                         |
| Field                                        | `forms/Field`                                                                                               |
| Checkbox                                     | `forms/Checkbox`                                                                                            |
| Radio                                        | `forms/`：RadioCard、RadioGroup                                                                             |
| AdvancedForms                                | `forms/`：NumberInput、PinInput、Slider、RatingGroup、SegmentGroup                                          |
| ComposedForms                                | `forms/`：Editable、TagsInput、RadioCard、Fieldset、InputGroup                                              |
| NativePassword                               | `forms/`：PasswordInput、NativeSelect                                                                       |
| FileUpload                                   | `forms/FileUpload`                                                                                          |
| Combobox                                     | `collections/Combobox`                                                                                      |
| TreeView                                     | `collections/TreeView`                                                                                      |
| DatePicker                                   | `date/DatePicker`                                                                                           |
| ColorPicker                                  | `color/ColorPicker`                                                                                         |
| Overlay                                      | `overlays/`：Menu、Popover、HoverCard、Drawer                                                               |
| OverlayManager                               | `overlays/OverlayManager`                                                                                   |
| Tooltip                                      | `overlays/Tooltip`                                                                                          |
| Toast                                        | `feedback/Toast`                                                                                            |
| Feedback                                     | `feedback/`：Alert、Progress、ProgressCircle；`display/`：Avatar、Text；`navigation/Link`                   |
| Disclosure                                   | `disclosure/`：Accordion、Collapsible；`navigation/Pagination`                                              |
| Tabs                                         | `disclosure/Tabs`                                                                                           |
| Steps                                        | `disclosure/Steps`                                                                                          |
| Display                                      | `display/`：Badge、Card；`feedback/Skeleton`                                                                |
| TableTag                                     | `display/`：Table、Tag                                                                                      |
| Timeline                                     | `display/Timeline`                                                                                          |
| Layout                                       | `layout/`：Stack、Grid、Positioning；`navigation/LinkBox`                                                   |
| ScrollArea                                   | `layout/ScrollArea`                                                                                         |
| Breadcrumb                                   | `navigation/Breadcrumb`                                                                                     |
| Clipboard                                    | `actions/Clipboard`                                                                                         |
| Convenience                                  | `actions/IconButton`；`forms/Checkbox`；`display/`：Heading、Icon；`feedback/Spinner`；`layout/Positioning` |

基础组件提供 Playground 调整配方和常用参数，事件记录到 Actions；
表单与 store 场景使用独立状态，保留提交结果和交互反馈。
跨组件的大表单拆分后，数值、验证码、评分等各自保留 FormData 示例。
文件选择不上传文件，树形异步加载使用本地 Promise，头像使用内嵌 SVG。
Toast 与命令式弹层在示例卸载时清理实例。
PasswordInput 的 JSX 默认图标暂不支持自动参数提取，因此该 story 使用显式 argTypes。

当前共 62 个组件族文件、163 个功能示例和 62 个自动文档入口。
第四步再移除旧路由、关联入口和预热逻辑，并重新生成应用路由树。

现有 `/ui` 验收页面在完整迁移并验证前继续保留。
