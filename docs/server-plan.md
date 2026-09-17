# Requirements Implementation Design Plan

## 1. Requirements Information

### Background

- 只读参考源为 `.worktrees/official`；任何实现、格式化、生成或验证步骤均不得修改该目录。
- 外部 Hono 架构参考为 `temp/ref-web-shared/apps/server/src`，重点复用 composition root、配置解析、依赖注入、目录命名、异常处理、OpenAPI、Pino 日志及网络层组织；不迁移 PDF、worker、Facos 等无关业务。
- 当前 `apps/board` 仅有 TanStack Start 前端骨架；现有 Nitro 版本为 `3.0.260610-beta`，Hono 尚未接入。
- 已完成的配置层位于 `libs/definition`；允许按现有组织补充内容，不得重组其目录、配置定义模式或既有模块结构。
- 已完成的数据库层位于 `libs/db`；本期不得修改 DB 源码、schema、connector、migration 或构建组织，不处理 migration 操作。
- 历史决策以 `docs/requirement-db-config.md` 为准；重叠项继续沿用，包括 Node + SQLite、显式 VO、配置解析、时间语义、用户同步结构和禁止请求期建表。
- 当前项目未上线，不要求兼容 official 的 URL、请求字段或响应结构；业务功能应与 official 等价，内部架构按新设计落地。
- 本期只迁移 server；前端页面、PWA、部署基础设施、CI、Docker 和 official 测试不属于迁移范围。

### Objectives

- 在 `apps/board` 中建立明确的 Nitro 外壳与可插拔 Hono 子应用，保证 `/api/**` 由 Hono 承载，SSR、静态资源、部署适配和生命周期由 Nitro 承载。
- 严格按 ref-web-shared 的 Hono 顶层目录、文件词汇、依赖注入、错误、日志、网络、OpenAPI 和 validator 方式组织代码。
- 迁移 official 的 GitHub 登录、用户会话、用户同步、source 抓取、snapshot 缓存、批量 snapshot 查询及全部有效 Node source adapter。
- 使用现有 `@newsnow/definition` 作为共享业务 contract/config/schema 层，使用现有 `@newsnow/db` 作为 SQLite connector/schema/VO 层。
- 将本期暂不处理的优化和前端相关 server 能力纳入未来待办，并在对应扩展缝留下中文 TODO；不实现半成品，也不保留注释掉的旧代码。
- 对 CF/D1、Bun、Vercel Edge、远程代理等本期裁剪的 runtime 能力，在最接近未来接入点的代码中说明 official 曾有的能力、本期不迁移的原因和未来接入位置，避免扩展入口随代码删除而丢失。
- 输出可由后续开发者直接执行、无需回看对话的最终态 server 设计规格。

## 2. Design Decisions

I confirmed a total of 50 questions with you, of which 50 have conclusions, and 0 are pending items.

| # | 决策 | 最终结论 |
|---:|---|---|
| Q1 | 兼容目标 | 项目未上线，不兼容 official HTTP 契约；业务功能与 official 一致，逻辑按当前最佳实践实现，Hono 架构与 ref-web-shared 对齐。 |
| Q2 | Source 范围 | 迁移 official catalog 中全部有效的 Node 业务 source adapter；不只做少量示例。 |
| Q3 | Snapshot 配置命名 | cache 术语统一为 snapshot；schema 属性全部增加 `snapshot` 前缀，使 constantCase 映射读取 `SNAPSHOT_*`。 |
| Q4 | DB 前置 | DB pack 入口已由用户修正；本期视 DB 为可用，不处理 migration，不修改 `libs/db`。 |
| Q5 | Nitro/Hono 职责 | Nitro 只负责 SSR、静态资源、部署和生命周期；所有 `/api/**` 由一个 Hono 应用处理。 |
| Q6 | HTTP 风格 | 不保留 `/api/s` 等旧缩写；按 `auth`、`source`、`user` 领域重新设计语义化路由。 |
| Q7 | 错误架构 | 对齐 ref-web-shared `shared/errors`：错误分类树、Problem Details、统一 handler、序列化 cause 和日志等级。 |
| Q8 | 前端依赖能力 | OAuth 在 Cookie 方案确定后完整实现；用户同步完整实现；PWA 版本检测仅留中文 TODO；official hello-world `/api/me` 不迁移。 |
| Q9 | Source 与资源归属 | source adapter 在 Hono source module；共享 catalog/schema/type 在 definition；浏览器资源在 `public`；server-only 资源在 Nitro `server/assets`；不迁移 Rollup glob。 |
| Q10 | 日志输出 | 建立 Pino、hono-pino、local pretty、正式环境 JSON stdout、可配置滚动文件的基建；最终记录范围由 Q44 决定。 |
| Q11 | OAuth 事务安全 | GitHub OAuth 使用随机 `state`、PKCE S256、短期事务 Cookie、固定 callback URL；callback 校验后清理事务 Cookie。 |
| Q12 | 会话载体 | 浏览器会话仅使用 HttpOnly Cookie，不支持 official 的 URL/localStorage/Bearer JWT；新增 logout。 |
| Q13 | 用户展示信息 | 新增 `AuthSessionPayload`，在签名 JWT 内保存 `id/type` 与展示快照 `profile.name/profile.avatar`；`GET /api/user` 返回会话用户。 |
| Q14 | official URL token 方案 | 不保留注释掉的旧可执行代码；仅以中文注释记录“official 曾在 redirect query 传 JWT，本实现刻意改用 HttpOnly Cookie”。 |
| Q15 | 能力清单 | 实现 auth、source、snapshot query、user profile、user sync；最终 URL 以 Q31/Q36 为准。 |
| Q16 | Callback 配置 | definition auth schema 新增 `githubCallbackUrl`；与 GitHub client ID、client secret、JWT secret all-or-none；成功后固定站内重定向 `/`。 |
| Q17 | 主动刷新 | 使用 `refresh=true`；source interval 为硬限制；refresh 可绕过 snapshot TTL；认证启用时只有登录用户可主动刷新；认证未配置时允许。 |
| Q18 | Source 输出 | live/snapshot 结果包含 canonical `sourceId`、`items`、实际 `updatedAt`、`origin`、`stale`；删除 licence/sponsorship；批量接口返回 snapshot 查询结果，不静默吞异常。 |
| Q19 | 同步冲突 | `updatedTime` 作为客户端版本；新版本才能覆盖；同版本同数据幂等；同版本异数据或旧版本返回 409；服务端不自动合并。 |
| Q20 | 并发抓取 | 对相同 canonical source ID 实现进程内 single-flight；只合并同时进行的抓取，完成后立即清理，不建立分布式锁。 |
| Q21 | 目录边界 | `apps/board/server` 为 Nitro serverDir；Hono 位于 `apps/board/server/hono`；Hono 下不保留 `src/` 中间级；`apps/board/src` 重命名为 `apps/board/frontend`。 |
| Q22 | DB 使用位置 | Node entry 创建 `SqliteClient`；只把 `db` 注入 `AppDependencies`；Hono module 内直接使用 Drizzle 和 VO；Nitro close hook 关闭 client；不建 repository 层。 |
| Q23 | 注入命名 | 严格保留 ref 的 `AppConfig`、`AppDependencies`、`AppEnv`、`createApp`、`makeDependencies`、`loggerHandler` 等命名，不自创 runtime/container/kernel 命名。 |
| Q24 | 生命周期 | 配置、logger、fetcher、SQLite client 和 dependencies 在 Node entry 启动期组装；配置失败阻止启动；Nitro plugin 负责 close。 |
| Q25 | Schema 边界 | 业务领域 schema 可放 definition 供前端和 Hono 复用；Hono schema 与路由独立；不写多余或重复 schema，route 通过 ref 风格 validator 使用 schema。 |
| Q26 | Middleware 顺序 | 所有 Hono 路由统一经过 dependencies、contextStorage、requestId、logger、secure headers、CSRF、optional auth；之后注册 module routes、OpenAPI 和全局错误 handler。 |
| Q27 | CORS/CSRF | board 与 API 同源；不启用 CORS；启用 Hono CSRF；Cookie 使用 SameSite=Lax；未来出现真实跨域需求再增加 allowlist。 |
| Q28 | Auth middleware | `optionalAuth` 解析 Cookie；无/失效 Cookie 在公开路由按匿名处理并清理失效 Cookie；`requireAuth` 保护 user/logout；refresh 权限在 source 业务内判断。 |
| Q29 | OpenAPI | 保留 ref 的 `hono-openapi`、`describeRoute`、`generalValidator`、Swagger UI 和 YAML；只描述真实接口。 |
| Q30 | 成功响应 | 所有 JSON 成功响应统一为 `{ data }`；Problem Details、redirect、OpenAPI YAML 和非 JSON 响应不套 envelope。 |
| Q31 | 领域挂载 | `app.route('/api/auth', authRoutes)`、`app.route('/api/source', sourceRoutes)`、`app.route('/api/user', userRoutes)`。 |
| Q32 | HTTP client | 使用 ref 的 Ky 方向，建立 `createFetcher`、`AppFetcher`、`sourceFetcher`、`githubFetcher`；统一 timeout/retry/UA，source 默认跟随 redirect。 |
| Q33 | Contract 分工 | definition 判断业务值是否合法；Hono `contracts.ts` 只组合 path/query/body；没有组合逻辑时不建 pass-through schema 文件。 |
| Q34 | Catalog/registry | definition 提供 source catalog、SourceID、共享 metadata；Hono 提供显式 `SourceID -> SourceAdapter` registry；不使用运行时目录扫描或自制 Rollup glob。 |
| Q35 | Module 内部组织 | 使用 ref 的 `routes.ts`、`contracts.ts`、`types.ts`、`resolvers/`、`upstream/` 等词汇；复杂 OAuth/source 流程拆 resolver，简单 DB 查询留在 route。 |
| Q36 | 最终路由 | `/api/auth/*`、`/api/source/*`、`/api/user/*`；详细清单见设计规格。 |
| Q37 | AppConfig | 聚合 `runtime/log/auth/snapshot/http/thirdParty/sqlite`；只有 `adapters/nodejs/config.ts` 读取并解析 `process.env`。 |
| Q38 | GitHub scope | 不申请额外 `user:email` scope；使用 `/user` 实际返回的 email，缺失时保存 `null`。 |
| Q39 | 错误状态码 | 本期不修改 `ErrorHttpStatus`；现有常量无法表达的错误暂映射为 500，不新增 405/502 等常量。 |
| Q40 | 日志细化 | 不增加 source/auth/user 自定义业务日志和额外字段；搭建 logger 基建；最终保留默认 access/error 日志见 Q44。 |
| Q41 | Snapshot 关闭 | `SNAPSHOT_ENABLED=false` 时完全不读写 snapshot、不应用 TTL/持久化 interval、不降级旧数据；仍保留 concurrent single-flight；批量 snapshot 接口不可用。 |
| Q42 | Runtime 范围 | 只实现 Node source 行为；不迁移 CF Pages、Bun、Vercel Edge、远程代理、`disable: 'cf'` runtime 分支及硬编码 NewsNow 回源；按 Q50 在对应扩展缝保留说明性注释。 |
| Q43 | NewsItem 校验 | 本期保持 official 能力，不新增 NewsItem 运行时 schema/校验；保留 TypeScript contract，并以中文 TODO 标记未来运行时校验。 |
| Q44 | Logger 实际记录 | 采用方案 A：注册 `loggerHandler`，保留 hono-pino 默认 access log，`globalErrorHandler` 记录异常；不增加业务日志。 |
| Q45 | Catalog 额外优化 | 不再为 catalog authoring 继续引入新决策；保持 official 的 catalog 功能、sub-source 展开、redirect 和有效 source 行为，在已确认 definition + explicit registry 架构下简单迁移。 |
| Q46 | Public 资源细化 | 不继续设计新资源体系；按 server 当前所需迁移 source icons/default，其他前端/PWA/域名相关资源留待前端迁移。 |
| Q47 | Redirect ID | 保持 official 行为：父 source redirect 后，响应和 snapshot 使用解析后的 canonical source ID。 |
| Q48 | Batch 额外优化 | 不增加额外上限、排序、去重策略等优化决策；实现已确认的批量 snapshot 能力，尽可能保持 official 的简单查询行为，并使用新错误/响应框架消除静默失败。 |
| Q49 | 暂缓优化的归档方式 | 所有明确“暂不处理”“后续优化”的内容都必须进入未来待办，写清当前行为、未来目标和代码锚点；不得仅以范围外为由从计划中消失。 |
| Q50 | 裁剪能力的代码留痕 | CF/D1、Bun、Vercel Edge、远程代理等未迁移能力不保留死代码或注释掉的实现，但必须在最接近扩展入口的代码处留下中文注释，说明 official 对应能力以及未来应从何处接入。 |

## 3. Design Specifications

### 3.1 Scope matrix

| 能力 | 本期 | 说明 |
|---|---:|---|
| Nitro + TanStack Start SSR | 是 | 保留现有 SSR；Hono 不得截断页面 renderer。 |
| Hono API | 是 | 处理全部 `/api/**`。 |
| GitHub OAuth + Cookie session | 是 | 完整登录闭环。 |
| 用户 profile/sync | 是 | profile 来自 session，sync 使用 SQLite。 |
| Source adapters | 是 | official 全部有效 Node source。 |
| SQLite snapshot | 是 | 使用现有 DB table/client/VO。 |
| OpenAPI/Swagger | 是 | 对齐 ref。 |
| Source icons | 是 | `apps/board/public/icons`。 |
| 前端页面迁移 | 否 | 仅将目录从 `src` 重命名为 `frontend` 并修正构建配置。 |
| PWA/version API | 否 | 中文 TODO。 |
| Cloudflare D1/Bun/Vercel Edge | 否 | 不创建半成品 adapter/config；在 Node composition、source registry/resolver/fetcher 的对应扩展缝留中文注释。 |
| DB schema/migration 修改 | 否 | 严禁修改 `libs/db`。 |
| CI/Docker/deployment/tests 搬运 | 否 | 不迁移 official 非业务文件。 |

### 3.2 Final code organization

```text
apps/board/
├── frontend/                              # 原 apps/board/src
│   ├── routeTree.gen.ts
│   ├── router.tsx
│   ├── routes/
│   └── styles.css
├── public/
│   └── icons/
├── server/                                # Nitro serverDir
│   ├── assets/                            # 仅 server 可读取的 bundled assets
│   ├── plugins/
│   │   └── hono.ts                        # Nitro ↔ Hono 生命周期适配
│   └── hono/                              # 可插拔 Hono 子应用；无 src/ 中间级
│       ├── adapters/
│       │   └── nodejs/
│       │       ├── config.ts
│       │       └── entry.ts
│       ├── infra/
│       │   └── logger/
│       │       └── pino.ts
│       ├── middlewares/
│       │   ├── auth.ts
│       │   └── context.ts
│       ├── modules/
│       │   ├── auth/
│       │   │   ├── resolvers/
│       │   │   │   └── github-callback.ts
│       │   │   ├── contracts.ts
│       │   │   ├── routes.ts
│       │   │   └── types.ts
│       │   ├── sources/
│       │   │   ├── adapters/              # 每个 active source 一个实现文件/目录
│       │   │   ├── resolvers/
│       │   │   │   ├── source-items.ts
│       │   │   │   └── source-snapshots.ts
│       │   │   ├── contracts.ts
│       │   │   ├── registry.ts
│       │   │   ├── routes.ts
│       │   │   └── types.ts
│       │   └── users/
│       │       ├── contracts.ts
│       │       ├── routes.ts
│       │       └── types.ts
│       ├── shared/
│       │   ├── app/
│       │   │   └── types.ts
│       │   ├── errors/
│       │   │   ├── constants.ts
│       │   │   ├── defs/
│       │   │   ├── handler.ts
│       │   │   ├── log.ts
│       │   │   ├── proto.ts
│       │   │   └── types.ts
│       │   ├── network/
│       │   │   ├── api.ts
│       │   │   ├── fetcher.ts
│       │   │   ├── types.ts
│       │   │   ├── utils.ts
│       │   │   └── validator.ts
│       │   └── utils/
│       │       └── index.ts
│       ├── upstream/
│       │   └── github/
│       │       ├── api.ts
│       │       └── types.ts
│       └── app.ts
├── package.json
├── tsconfig.json
├── tsr.config.json
└── vite.config.ts
```

#### Organization constraints

- Hono 顶层必须使用 ref 的 `adapters`、`app.ts`、`infra`、`middlewares`、`modules`、`shared`、`upstream` 词汇。
- 不新增 `kernel`、`runtime`、`container`、`controllers`、`services`、`repositories` 等顶层/固定分层。
- `server/plugins` 和 `server/assets` 属于 Nitro，不得放入 `server/hono`。
- Hono 不得导入 Nitro；Nitro 只通过 Web handler 和 close plugin 接触 Hono Node entry。
- `bootstrap.ts` 不迁移；Nitro 拥有监听端口和信号生命周期。
- 单次使用的 helper、pass-through wrapper 和无行为 interface 必须内联；复杂多步流程才进入 `resolvers/`。
- TODO 注释是扩展锚点，不是替代实现：只放在未来实际会修改的文件中，必须包含“official 原能力 / 本期为何不迁移 / 未来从哪里接入”三项信息；禁止复制旧实现或保留整段注释代码。

### 3.3 Nitro/Hono integration

`vite.config.ts` 的 Nitro 配置必须等价于：

```text
serverDir = ./server
/api/** → ./server/hono/adapters/nodejs/entry.ts
handler format = web
```

- 不使用根级 Hono `server.ts`；Hono 对未匹配请求会返回自身 404，根挂载会吞掉 TanStack Start SSR fallback。
- Nitro 官方支持以 `routes` 配置注册 `format: "web"` handler；此处直接挂载 Hono fetch-compatible app。[Nitro routing](https://nitro.build/docs/routing)
- Hono 内部保留完整 `/api/...` 路径；Nitro 只限制哪些请求进入 handler，不重写 pathname。
- `server/plugins/hono.ts` 在 Nitro 启动期加载 Hono Node entry，在 Nitro `close` hook 调用 `sqliteClient.close()`。
- 必须对当前 Nitro beta 实测 `/api/**`、SSR fallback、404、multiple Set-Cookie 和 redirect header 保真。

### 3.4 Composition root and dependencies

#### `adapters/nodejs/config.ts`

- 唯一允许把 `process.env` 传入 definition config resolver 的文件。
- 复用 ref 的 Valibot error flatten 方式；配置错误在启动期失败且保留 cause，不输出 secret value。
- 返回 `AppConfig`：

```text
runtime + log + auth + snapshot + http + thirdParty + sqlite
```

#### `adapters/nodejs/entry.ts`

启动顺序：

1. `resolveConfig(process.env)`。
2. `createPinoLoggerHandler(...)`。
3. `createSqliteClient(appConfig.sqlite.dbPath)`。
4. 创建 `sourceFetcher` 与 `githubFetcher`。
5. 懒初始化并缓存单模块实例的 `AppDependencies`。
6. `createApp(makeDependencies)`。
7. 默认导出 Hono app，命名导出 `sqliteClient` 供 Nitro close plugin 使用。

在 composition root 附近保留中文注释：本期只有 Node adapter；official 的 CF Pages、Bun、Vercel Edge runtime 未迁移。未来若恢复，应新增与 `nodejs` 平级的 runtime adapter/composition root，不得把 runtime 判断重新散落到业务 module。

#### `shared/app/types.ts`

```text
AppConfig
├── runtime
├── log
├── auth
├── snapshot
├── http
├── thirdParty
└── sqlite

AppDependencies
├── appConfig
├── loggerHandler
├── db: SqliteDatabase
├── sourceFetcher: AppFetcher
└── githubFetcher: AppFetcher

AppEnv.Variables
├── RequestIdVariables
├── AppDependencies
├── logger?: AppLogger
└── session?: AuthSessionPayload
```

- `createApp` 接受 ref 命名的 `makeDependencies(c)`。
- 每次请求把返回的 `AppDependencies` 写入 Hono Context；entry 保证实际依赖只构造一次。
- route 只能获得 `db`，不能关闭或重建 SQLite client。

### 3.5 Middleware and application assembly

`server/hono/app.ts` 注册顺序：

1. `makeDependencies` middleware：将 `AppDependencies` 写入 Context。
2. `contextStorage()`。
3. `requestId()`。
4. `loggerHandler`。
5. `secureHeaders()`。
6. `csrf()`。
7. `optionalAuth`。
8. module routes。
9. `configureOpenAPI(app)`。
10. `app.onError(globalErrorHandler)` 与统一 not-found 处理。

- 不复制 ref 的 `cors({ origin: '*', credentials: true })`；本期不启用 CORS。
- Hono CSRF middleware 校验适用的 unsafe form request 的 Origin/Fetch Metadata；JSON PUT 还受同源/CORS 限制。[Hono CSRF](https://hono.dev/docs/middleware/builtin/csrf)
- 所有 module route 必须位于 requestId/logger 之后，修正 ref 中根路由绕过日志的注册顺序问题。
- `optionalAuth`：无 Cookie 继续；有效 Cookie 设置 `session`；无效 Cookie 删除会话 Cookie、记录 warn、按匿名继续。
- `requireAuth`：复用 `session`；不存在时抛出认证 Problem Details；保护 `/api/user/**` 和 logout。

### 3.6 HTTP routes

| Method | Path | Auth | Behavior |
|---|---|---:|---|
| GET | `/api/auth/github/status` | 否 | 返回 GitHub 登录是否已配置。 |
| GET | `/api/auth/github/login` | 否 | 创建 OAuth transaction，设置短期 Cookie，redirect GitHub。 |
| GET | `/api/auth/github/callback` | 否 | 校验 transaction/state/PKCE，换 token，取用户，upsert，写 session Cookie，redirect `/`。 |
| POST | `/api/auth/logout` | 是 | 删除 session Cookie。 |
| GET | `/api/source/:sourceId/items` | 可选 | snapshot/refresh/live fetch/fallback。 |
| POST | `/api/source/snapshots/query` | 否 | 批量读取已有 snapshot，不触发 live fetch。 |
| GET | `/api/user` | 是 | 返回 session 用户及 DB email。 |
| GET | `/api/user/sync-state` | 是 | 返回 `{ data, updatedTime }`。 |
| PUT | `/api/user/sync-state` | 是 | 乐观版本更新用户同步数据。 |
| GET | `/api/docs/openapi.yaml` | 否 | OpenAPI YAML。 |
| GET | `/api/swagger` | 否 | Swagger UI。 |

- 不实现 official `/api/latest`；在 frontend 根路由附近留中文 TODO，待 PWA 迁移决定版本来源。
- 不迁移 official hello-world `/api/me`。
- 所有 JSON success 使用 `{ "data": ... }`。
- OAuth redirect、OpenAPI YAML、Swagger HTML 不使用 success envelope。

### 3.7 Authentication and session

#### GitHub login

1. 确认 auth 四项配置完整；未配置返回 `enabled: false`，login/callback 失败为配置不可用错误。
2. 生成不可预测 `state` 与 PKCE `code_verifier`，使用 S256 `code_challenge`。
3. 将 transaction 保存为签名、HttpOnly、SameSite=Lax、约 10 分钟有效的临时 Cookie。
4. redirect GitHub authorize URL，携带 `client_id`、精确 `redirect_uri`、`state`、PKCE challenge/method。
5. callback 校验 GitHub error、code、state、签名 transaction Cookie；一次使用后清除 transaction Cookie。
6. 使用相同 redirect URI 与 code verifier 请求 access token。
7. 使用 access token 调用 GitHub `/user`；不请求 `user:email` scope；email 缺失时保存 `null`。
8. upsert `users`，签发 60 天 HS256 `AuthSessionPayload`。
9. 设置正式 session Cookie并 redirect `/`；query 不携带 JWT 或用户资料。

GitHub 当前 Web OAuth 文档强烈建议 state、PKCE 和一致 redirect URI。[GitHub OAuth flow](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps)

#### Session Cookie

| Attribute | Local | Non-local |
|---|---|---|
| Name | `newsnow_session` | `__Host-newsnow_session` |
| HttpOnly | true | true |
| Secure | false | true |
| SameSite | Lax | Lax |
| Path | `/` | `/` |
| Domain | unset | unset |
| Max-Age | 与 JWT 60 天一致 | 与 JWT 60 天一致 |

- 使用 Hono Cookie helper；Hono 支持 HttpOnly/Secure/SameSite/`__Host-` 限制。[Hono cookie helper](https://hono.dev/docs/helpers/cookie)
- 不支持 Authorization Bearer 作为浏览器 session 来源。
- GitHub access token 仅用于当前 callback 获取用户，不写 DB、不写 session JWT、不写日志。
- `AuthSessionPayload` 是新增 definition contract；保留既有 `AuthTokenPayload { id, type }`，新增 profile 展示快照，不让 profile 参与授权。
- 必须增加中文注释：official 曾在 redirect query 传 JWT/user；本实现故意用 HttpOnly Cookie，避免进入 history、Referer、日志。

### 3.8 User module and synchronization

#### `GET /api/user`

- 从 `session` 返回 `id`、`type`、`profile.name`、`profile.avatar`。
- 使用 `vcUsers.default` 查询 DB email；DB 不保存 GitHub name/avatar。
- DB user 不存在时返回 user-domain error。

#### Sync select

```text
db.select(vcUsers.syncState)
  .from(users)
  .where(users.id = session.id)
```

- 必须显式使用 `vcUsers.syncState`，不得全字段 select 后丢弃字段。
- HTTP 输出为 `{ data, updatedTime }`；不把 DB `updatedAt` 混为客户端版本。

#### Sync update

- 在一个 SQLite transaction 内读取当前 sync state、比较版本并更新。
- incoming `updatedTime` 大于当前版本：完整替换 `syncState`，推进行 `updatedAt`。
- 版本相同且 data 相同：幂等成功。
- 版本相同但 data 不同，或 incoming 更旧：冲突，不写入；Problem Details extensions 携带当前 `data/updatedTime`。
- 不实现服务端合并；frontend 迁移时以中文 TODO 补充冲突 UX/合并策略。

### 3.9 Source catalog and registry

#### Definition

`libs/definition/src/modules/sources` 在现有组织内新增 catalog/schema/constants；不得另建新的顶层组织：

- 迁移 official source/sub-source 的名称、标题、分类、type、颜色、主页、描述、interval、redirect 等有效业务 metadata。
- `disable: true` 的 source 不属于 active catalog。
- `disable: 'cf'` 是旧 runtime 条件；Node 最终态保留 source 能力但删除该字段。
- 保持 official 父 source → 首个 sub-source redirect 行为。
- `SourceID` 从 active catalog 推导，不再是开放 `string`。
- 不生成/提交 `sources.json`、`pinyin.json`、`updated-sources.ts`；frontend 搜索/最近更新功能留中文 TODO。
- 不从 definition 读取 `process.env`。
- 在 active catalog/metadata 的实现附近保留中文注释：official 曾用 `disable: 'cf'` 表达 runtime 能力差异；本期 catalog 只描述业务可用性。未来恢复多 runtime 时，应新增显式 runtime capability 模型，不得恢复魔法字符串字段。

#### Hono registry

- `modules/sources/registry.ts` 显式注册 active canonical `SourceID -> SourceAdapter`。
- 不使用 Rollup glob、运行时目录扫描或 Nitro auto-import。
- 在 registry 定义处保留中文注释：当前 registry 仅绑定 Node adapter；未来新增 CF/Edge runtime 时应由各 runtime composition root 选择独立 registry，不在单个 adapter 内增加环境分支。
- redirect source 在 resolver 入口解析为 canonical ID；DB key、single-flight key、日志字段和 response `sourceId` 均使用 canonical ID。
- adapter interface 保持 official 的简单能力：给定已注入的 fetch/config 上下文，返回 `Promise<NewsItem[]>`。
- 本期不增加 NewsItem runtime schema；在 resolver 留中文 TODO，说明未来应校验 adapter 输出后再写 snapshot。

### 3.10 Source fetch and snapshot algorithm

#### Normal request

1. 校验 source ID 并解析 redirect。
2. `SNAPSHOT_ENABLED=false`：跳过 DB/TTL/interval/fallback，进入 single-flight live fetch。
3. Snapshot 启用时读取 `vcSourceSnapshots.default`。
4. Snapshot 年龄小于 source interval：直接返回 snapshot；interval 是硬限制。
5. Snapshot 年龄小于全局 TTL，且未请求授权允许的 refresh：返回 snapshot。
6. 需要 live 时，以 canonical source ID 进入进程内 single-flight。
7. adapter 返回结果后截取 `snapshotMaxItems`；不做新增 runtime schema 校验。
8. 有非空数据时 upsert `source_snapshots`，`updatedAt = new Date()`。
9. live 抓取失败且存在旧 snapshot：返回 snapshot，`stale = true`。
10. live 抓取失败且不存在 snapshot：抛出 source fetch 错误；按 Q39 暂映射 500。

#### Refresh authorization

| Auth config | Session | `refresh=true` |
|---|---:|---:|
| disabled | 任意 | 允许 |
| enabled | 有效 | 允许 |
| enabled | 无效/缺失 | 拒绝 |

- `refresh=true` 只绕过全局 TTL，不绕过 source interval。
- 默认请求不要求登录。

#### Single-flight

- module-scope Map 按 canonical source ID 保存正在进行的 Promise。
- 同一进程内同时到达的同 source 请求等待同一 Promise。
- Promise resolve/reject 后在 `finally` 删除。
- 客户端断开不得取消共享抓取。
- 不保证跨 Node 实例去重，不增加分布式锁。

#### Source response data

```json
{
  "data": {
    "sourceId": "github-trending-today",
    "items": [],
    "updatedAt": 1788012345678,
    "origin": "live",
    "stale": false
  }
}
```

- `updatedAt` 表示数据实际抓取/写 snapshot 时间，不伪装成请求时间。
- `origin` 的有限值从 definition frozen constant 推导；不得单独手写字符串 union。
- `stale` 只表示 live 失败后的旧 snapshot 降级。
- 删除 official response 中的 licence、sponsorship、GitHub 链接等非业务数据。

#### Batch snapshots

- Endpoint 只读 DB，不触发 adapter/live fetch。
- Snapshot disabled 时返回 source-domain unavailable error。
- 使用 `vcSourceSnapshots.default` 显式 projection。
- 采用新 `{ data }` envelope 与 Problem Details；不得复制 official 吞掉异常并返回 `undefined` 的缺陷。
- 不在本期增加 Q48 所讨论的额外 max-100、复杂排序或其他优化规则；实现保持简单并满足已确认的调用 contract。

### 3.11 Source adapter migration rules

- 迁移 official active catalog 的所有 Node getter，包括 `cls`、`coolapk` 等子目录 source。
- 使用 Ky `sourceFetcher` 统一 10 秒 timeout、3 次 retry、通用 User-Agent；adapter 保留 endpoint、Referer、请求体、解析、编码等专属逻辑。
- Ky 默认跟随 redirect；不要复制 ref fetcher 针对其业务设置的全局 `redirect: manual`。
- RSS/Atom/XML/HTML/JSON/iconv/date/crypto 等能力按实际复用放在 source module 内；只有被多个领域真正复用时进入 `shared`。
- Product Hunt 从 `appConfig.thirdParty.producthuntApiToken` 获取 token；不得在 adapter 读取 env。
- 不迁移 CF proxy、NewsNow 远程回源、D1 filter、Bun/Vercel 分支和 `disable: 'cf'` 判断，也不保留其死代码。
- 在 `sourceFetcher` 创建位置保留中文注释：official 曾提供 CF proxy/硬编码 NewsNow 回源；本期 Node 直接请求上游。未来如需代理或 fallback，应作为显式配置的 fetcher policy/adapter 注入，不得在 source adapter 内硬编码。
- 在 snapshot resolver 的 DB 读写边界保留中文注释：official 曾有 D1/filter 路径；本期只使用 SQLite。未来新增远端/Edge snapshot store 时，应在此抽取持久化端口并由 runtime 注入，本期不得提前建立空 repository/adapter。
- 不因一次网络失败删除 source；迁移以 official Node 实现为事实来源。
- adapter 不直接操作 snapshot DB；snapshot orchestration 统一在 source resolver。

### 3.12 DB usage

- Connector：`createSqliteClient(appConfig.sqlite.dbPath)`。
- Query handle：`AppDependencies.db: SqliteDatabase`。
- Schema/VO imports：`@newsnow/db/sqlite/schema`。
- Connector import：`@newsnow/db/sqlite/sqlite`。
- 所有 select 显式 VO：

| Use case | Projection |
|---|---|
| User profile | `vcUsers.default` |
| User sync | `vcUsers.syncState` |
| Source snapshot read/batch | `vcSourceSnapshots.default` |

- Auth user 使用 SQLite upsert；source snapshot 使用 SQLite upsert；sync 使用 transaction。
- 不在 connector 中 migrate、push、建表或执行业务查询。
- 不从 app 深层导入 `libs/db/src`，不依赖未声明内部文件。
- DB Date 仅在 HTTP 边界转 epoch milliseconds。

### 3.13 Configuration

#### Schema config environment mapping

| Domain | Environment | Parsed field | Rule |
|---|---|---|---|
| runtime | `SERVER_ENV` | `serverEnv` | local/test/staging/main。 |
| auth | `GITHUB_CLIENT_ID` | `githubClientId` | auth 四项 all-or-none。 |
| auth | `GITHUB_CLIENT_SECRET` | `githubClientSecret` | secret，不进入日志。 |
| auth | `GITHUB_CALLBACK_URL` | `githubCallbackUrl` | 非空绝对 URL；GitHub 配置精确匹配。 |
| auth | `JWT_SECRET` | `jwtSecret` | 至少 32 字符。 |
| snapshot | `SNAPSHOT_ENABLED` | `snapshotEnabled` | 严格 `true/false`，默认 true。 |
| snapshot | `SNAPSHOT_TTL_MS` | `snapshotTtlMs` | env 数字字符串转换 number；默认 30 分钟。 |
| snapshot | `SNAPSHOT_MAX_ITEMS` | `snapshotMaxItems` | env 数字字符串转换 number；默认 30。 |
| sqlite | `DB_PATH` | `dbPath` | 环境值为绝对路径；缺省时为 workspace `data/newsnow.sqlite`。 |
| third party | `PRODUCTHUNT_API_TOKEN` | `producthuntApiToken` | 可选；空字符串归一化 undefined。 |
| logging | 既有 log env | 既有字段 | 保持 definition 现有定义。 |

- 必须新增可复用 number-string schema；不能用 `v.number()` 直接解析 `process.env` string。
- `authRawConfig` 保存 GitHub endpoint、JWT HS256/60d、Cookie 属性、OAuth transaction TTL 和成功 redirect path。
- `httpConfig` 保存通用 UA、10 秒 timeout、3 retry。
- source-specific endpoint/header/parser 参数不得搬入 definition config。

### 3.14 Error handling

- 目录、类型和构造方式对齐 ref-web-shared `shared/errors`。
- `defineErrorCategories` 递归生成 frozen category，type 使用点分路径，调用 `E.*.create()` 产生 Problem Details。
- `globalErrorHandler` 使用 `hono-problem-details` 统一响应并记录错误。
- `serializeErr` 支持 ProblemDetailsError、HTTPException、Error cause 链。
- 4xx 使用 warn、5xx 使用 error；未知错误为 500。
- 本期不得修改 `ErrorHttpStatus`；缺少的 405/502 等映射不新增，相关异常暂用已有 500 分类。
- Validation error 使用 422 和扁平 Valibot issues extension。
- 响应不得泄露 stack、DB path、env、GitHub body、JWT、Cookie、OAuth code/access token。
- `instance` 使用请求路径，extensions 增加 `requestId`。

### 3.15 Logging

- 复用 ref `infra/logger/pino.ts` 和 `hono-pino` 结构。
- local：debug/pretty。
- non-local：JSON stdout；现有 log roll 配置存在时额外文件滚动。
- 注册 `loggerHandler`，保留 hono-pino 默认 access log。
- `globalErrorHandler` 记录异常。
- 本期不增加 source/auth/user 业务日志、业务字段或手工成功日志。
- 保持 ref 的请求/响应 header 白名单 serializer；不得记录 Cookie、Set-Cookie、Authorization、JWT、OAuth code/token、secret 或完整 body。
- 同一错误只由 error handler 输出完整错误；避免业务 catch 重复记录。

### 3.16 Validation, contracts, and OpenAPI

- `generalValidator(target, schema)` 对齐 ref，通过 `hono-openapi` validator + Valibot 产生 validation Problem Details。
- 业务 schema 放 `libs/definition/src/modules/*/schemas.ts`；HTTP path/query/body composition 放对应 Hono `contracts.ts`。
- 不为已有业务 schema 在 Hono 重写同构 schema。
- 不创建只有 re-export 的 `contracts.ts`。
- 本期不增加 `$S_NewsItem` runtime validation；仅使用已有 `NewsItem` TypeScript contract并留 TODO。
- `configureOpenAPI` 暴露 `/api/docs/openapi.yaml` 和 `/api/swagger`；OpenAPI tags 至少包含 Auth、Source、User。
- 每个真实 route 使用 `describeRoute`；不得登记未实现的 PWA/D1/future route。

### 3.17 Public and server assets

| Resource | Target | This phase |
|---|---|---:|
| Active source icons | `apps/board/public/icons` | 迁移 |
| Default source icon | `apps/board/public/icons/default.png` | 迁移 |
| Server-only data/template | `apps/board/server/assets` | 仅实际需要时加入 |
| Font/brand/PWA icons/OG | frontend/public future work | 不迁移 |
| `sw.js` | PWA future work | 不迁移 |
| `sitemap.xml` | deployment/frontend future work | 不迁移；official 文件写死旧域名/日期 |
| `robots.txt` | deployment future work | 不迁移 |
| `sources.json/pinyin.json/updated-sources.ts` | frontend future work | 不生成；中文 TODO |

### 3.18 Frontend directory rename

- 将 `apps/board/src` 整体移动为 `apps/board/frontend`。
- 更新 `tsconfig.json`、`tsr.config.json`、TanStack route tree 生成目录、aliases 和所有源码引用。
- 重新生成 `frontend/routeTree.gen.ts`，不手改生成内容。
- 不迁移或重写页面业务。
- 在适当的 frontend 根路由附近以中文 TODO 记录 PWA version、站点资源、source pinyin/updated-source 等后续依赖。

### 3.19 Dependencies and build integration

- 在 workspace catalog/package 中加入与 ref 能力对应的依赖：Hono、Ky、hono-openapi、hono-problem-details、hono-pino、Swagger UI、Valibot/OpenAPI adapter、YAML、string-template，以及日志滚动所需包。
- 不加入 `@hono/node-server`；Nitro 是 HTTP server/bootstrap。
- 保留现有 Nitro、TanStack Start、Vite+ plugin 体系。
- Hono aliases 必须指向 `server/hono`，不得假定存在 `server/hono/src`。

### 3.20 Validation checklist

1. 开始实现前运行 `vp install`；dependency/catalog 变化后再次确认 lockfile。
2. 运行 `vp check`、`vp test`、`vp run build`，以及 package/vite config 中新增的必要任务。
3. 验证 TanStack 页面 SSR 与静态资源仍正常，未知页面由 renderer/前端处理，不被 Hono 404 截断。
4. 验证 `/api/**` 由 Hono 处理，Hono not-found/error 均为 Problem Details。
5. 验证 OpenAPI YAML/Swagger、validation 422、success `{ data }`。
6. 验证 GitHub login response 同时包含正确 redirect 与临时 Set-Cookie；callback 可同时清除临时 Cookie、设置 session Cookie并 redirect `/`。
7. 验证 local/non-local Cookie 属性，logout 删除正确名称/path 的 Cookie。
8. 使用现有 SQLite DB 验证 user upsert、profile、sync transaction、snapshot read/upsert/batch；不运行或修改 migration。
9. 验证 snapshot enabled/disabled、interval、TTL、refresh auth、stale fallback、single-flight。
10. 对代表性的 JSON、HTML、XML/RSS、iconv source 做 smoke test；不搬运 official 单元测试文件。
11. 验证 Nitro close hook 可重复安全调用 `sqliteClient.close()`。
12. 检查日志不包含 Cookie、Authorization、JWT、OAuth secret/code/token 或完整 body。
13. 检查 `.worktrees/official` 无任何变化；不得执行 git add/commit，除非用户另行明确要求。
14. 逐项核对 3.21：每个要求代码留痕的未来事项均在指定扩展缝存在中文 TODO，且没有复制旧实现、注释代码块、无效 config 或不可达分支。

### 3.21 Future backlog and code anchors

本节中的事项不属于本期实现范围，但属于已确认的未来待办。实施本期代码时，凡“代码锚点”不为“仅文档”者，都必须在该位置留下简洁中文 TODO。注释应说明当前限制和正确扩展方向，不承诺时间，也不得用空 interface、pass-through wrapper 或未使用配置冒充预留设计。

| Future item | Current behavior in this phase | Future target | Code anchor / comment requirement |
|---|---|---|---|
| 多 runtime（CF Pages、Bun、Vercel Edge） | 只有 Nitro Node composition root | 按 runtime 提供独立 entry、依赖和 registry | `server/hono/adapters/nodejs/entry.ts`：说明未来新增平级 adapter，禁止业务层散布 runtime 分支。 |
| CF source capability | active catalog 不含 `disable: 'cf'` 魔法字段；Node registry 注册全部有效 Node source | 用显式 runtime capability 描述 source 支持范围 | definition source catalog 与 `modules/sources/registry.ts`：分别说明 capability model 和 per-runtime registry 的扩展方向。 |
| CF proxy / NewsNow 回源 | Node `sourceFetcher` 直接访问上游 | 在确有部署需求时加入显式、可配置、可注入的 proxy/fallback policy | `adapters/nodejs/entry.ts` 的 `sourceFetcher` 组装处：记录 official 原能力及 policy 注入位置，禁止硬编码域名。 |
| D1 / Edge snapshot store | snapshot resolver 直接使用已注入 SQLite DB | 出现第二种持久化实现时再抽取最小 snapshot store port | `modules/sources/resolvers/source-items.ts` 与 `source-snapshots.ts` 的 DB 边界：记录 official D1 路径和延迟抽象原则。 |
| `ErrorHttpStatus` 完整语义 | 缺失的 405/502 等暂按 500 | 补齐状态常量和 source/upstream 错误映射 | `shared/errors/constants.ts` 或对应 error defs：中文 TODO 指向缺失状态，不在本期修改 definition。 |
| NewsItem runtime validation | adapter 输出只受 TypeScript contract 约束 | 写 snapshot 前执行共享 schema 校验，并给出可诊断的 adapter 错误 | `modules/sources/resolvers/source-items.ts`：在 adapter 返回与 snapshot 写入之间留 TODO。 |
| 业务结构化日志 | 仅默认 access log 与全局 error log | 根据可观测性需求补 source/auth/user 事件与安全字段 | 仅文档；本期不在各 route 散布 TODO，未来统一设计事件和字段后实施。 |
| Batch 查询治理 | 保持 official 的简单批量查询，不增加 max、排序、去重规则 | 根据真实调用量确定数量上限、稳定排序、去重和部分失败策略 | `modules/sources/contracts.ts` 与 `source-snapshots.ts`：在 batch contract/查询入口留一个合并 TODO。 |
| 分布式 single-flight | 仅同一 Node 进程合并同时抓取 | 多实例部署确有重复抓取问题时评估分布式锁/租约 | `modules/sources/resolvers/source-items.ts` 的 module-scope in-flight Map：说明进程边界；不预建锁接口。 |
| 用户同步冲突 UX/合并 | server 返回 409 和当前版本，不自动合并 | 前端提供冲突展示、重试或用户驱动合并 | `frontend` 后续用户同步调用点；本期页面不迁移时仅保留在本文档，避免为不存在的调用点造文件。 |
| PWA/version 与站点公共资源 | 不提供 version API，不迁移 PWA/font/brand/OG/sw/sitemap/robots | 前端与部署方案确定后统一补齐 | `frontend` 根路由的现有可编辑入口留聚合 TODO；资源明细继续以 3.17 为准。 |
| Source 搜索辅助产物 | 不生成 `sources.json`、`pinyin.json`、`updated-sources.ts` | 前端搜索/最近更新需求明确后决定构建期或运行时来源 | definition catalog export 或 frontend source selector 的未来接入点；本期若不存在合适代码位置，仅保留本文档待办。 |
| CORS allowlist | API 与 board 同源，不启用 CORS | 出现真实跨域 consumer 后引入显式 allowlist、credentials 与 CSRF 联合策略 | `server/hono/app.ts` 的安全 middleware 注册处留 TODO，禁止恢复 `origin: '*'`。 |

## 4. Notes

- `.worktrees/official` 只读；仅作为功能、source 和资源事实来源。
- 本计划覆盖 `docs/requirement-db-config.md` 的 server 部分；DB/config 重叠决策以历史文件为基础，本计划中用户明确更新的 `SNAPSHOT_*`、GitHub callback/session 等结论优先。
- `libs/definition` 只允许在既有组织内新增/补充 config、catalog、schema、constants 和 types；不得重组目录。
- `libs/db` 完全禁止修改；migration 明确不属于本期。
- 不恢复 official 的 `INIT_TABLE`、请求期建表、db0/Nitro database、CF/Bun/Vercel 条件分支。
- 不迁移 official 的 Docker、compose、wrangler、CI、release hooks、lint-staged、部署 README、测试文件、截图和赞赏素材。
- `ErrorHttpStatus` 缺少语义状态码是已接受的临时限制；本期使用 500，不擅自扩展；未来处理方式和代码锚点见 3.21。
- NewsItem runtime validation、业务日志、batch 治理、分布式 single-flight、PWA version、source pinyin/updated-source、站点 public 资源及多 runtime 支持均为已明确的未来待办，不得在本期顺手扩展，也不得从实现注释与后续计划中消失。
- 被裁剪能力只保留“为什么未迁移、未来在哪里接入”的中文注释；禁止保留注释掉的 official 代码、不可达分支、未使用配置或空抽象。
- official 的异常吞噬、URL JWT、散读 env、错误 updatedTime、无 state/PKCE、无 single-flight 属于明确不复制的缺陷。
- 实现完成前执行 silent refactor pass：内联单次 helper、删除 pass-through wrapper、保留高内聚最终代码；不得删除已有注释而不先确认。
