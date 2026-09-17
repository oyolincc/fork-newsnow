# Requirements Implementation Design Plan

## 1. Requirements Information

### Background

- 参考源为只读目录 `.worktrees/official`；任何实现不得修改该目录。
- 本项目将按自身最佳实践重新实现 official；本期只允许修改 `libs/`，不迁移 server。
- `libs/definition/src/configs` 已提供 `defineSchemaConfig`、`defineStaticConfig` 和 Valibot resolver，配置定义不直接读取 `process.env`。
- official 实际数据库为 SQLite 方言：Node 使用 `better-sqlite3`，Cloudflare 使用 D1，Bun 使用 `bun-sqlite`；official 未使用 Drizzle、relations 或版本化 migrations。
- official 通过 db0/Nitro `useDatabase()` 执行手写 SQL，并在请求路径中反复执行 `CREATE TABLE IF NOT EXISTS`。
- `libs/db` 已落地 SQLite dialect：`src/dialects/sqlite/` 下含 schema/relations/VO/VC、`client.ts` connector 与 `drizzle.config.ts`；`src/shared/types.ts` 提供方言无关 Drizzle 类型工具；PostgreSQL 残留已移除。
- DB 包是基础设施包，只负责 schema、relations、VO/select projection、migration、Drizzle config、connector 和 schema/client 类型工具；不得包含 repository、service、domain model、业务用例或业务查询封装。

### Objectives

- 在 `@newsnow/definition` 中定义本期 server 所需的环境配置、跨模块静态配置和共享数据类型。
- 在 `@newsnow/db` 中建立明确的 SQLite dialect 层和 Node `better-sqlite3` runtime adapter。
- 建立可复现、版本化、纳入 Git 管理的 SQLite migrations。
- 用显式 VO 约束未来 service 的 select 字段；每张表提供一个 VO collection。
- 为未来 Cloudflare D1 复用同一套 SQLite schema/migrations 保留清晰边界，但本期不实现任何 D1 运行时代码或验收。
- 交付高内聚、无 repository、无未使用方言骨架、无半成品 edge 分支的 `libs/definition` 与 `libs/db`。

## 2. Design Decisions

I confirmed a total of 16 questions with you, of which 16 have conclusions, and 0 are pending items.

| # | 决策 | 结论 | 使用方/实现影响 |
|---:|---|---|---|
| Q1 | 历史数据兼容 | 不兼容 official 旧数据库；按全新实现设计物理表、字段和初始 migration。 | 允许重命名表/列、收紧约束、删除冗余索引；不提供旧库升级或数据搬迁逻辑。 |
| Q2 | 首期方言与 runtime | 本期只实现 SQLite dialect + Node `better-sqlite3` adapter。最终态预期支持 Node + Cloudflare D1；D1 是 SQLite runtime adapter，不是独立 schema。 | 不新增 PostgreSQL、Bun、Vercel Edge、db0、Nitro、D1 client、binding、preset、Wrangler 或 D1 验收。 |
| Q3 | 静态配置边界 | 只集中部署输入及跨模块策略；不集中各 source adapter 的 endpoint、Referer、query limit、解析参数等实现常量。 | 避免 `definition/configs` 变成第三方站点协议常量仓库。 |
| Q4 | 用户身份模型 | `users.id` 直接保存 GitHub ID；`email` 可空；数据库不保存恒定 provider/type 列；JWT 继续携带 `type: AuthType.GITHUB`。 | 当前只有 GitHub 身份；不预建多 provider identity 表。 |
| Q5 | JSON 字段类型 | 使用 Drizzle SQLite JSON mode，并在 DB schema 中绑定 `@newsnow/definition` 的具体业务类型。 | `source_snapshots.items` 为 `NewsItem[]`；`users.syncState` 为 `UserSyncState`；DB 包允许依赖 definition，但不得定义 repository。 |
| Q6 | 时间契约 | Drizzle API 使用 `Date`；SQLite 物理层保存 epoch milliseconds；HTTP 边界转换为 number。 | SQLite 没有 PostgreSQL `timestamp/timestamptz` 列类型；使用 `timestamp_ms` 保留相同的 Date API。行审计时间与客户端同步版本分离。 |
| Q7 | 配置组织 | 配置按领域划分；同一领域的 schema config 与 static config 共置一个文件；第三方凭据文件命名为 `third-party.ts`；`PRODUCTHUNT_API_TOKEN` 的解析字段为 `producthuntApiToken`。 | 延续现有 configs 的命名与组织风格；不建立 `schema/`、`static/` 两棵目录；保持现有 env 自动映射。 |
| Q8 | SQLite 文件配置 | `DB_PATH` 由环境提供绝对路径；缺省时由 `import.meta.dirname` 推导 workspace 根目录下的 `data/newsnow.sqlite`。 | 本地由 `envs/.env.sqlite` 定义，生产由部署环境注入；测试可绕过环境配置，直接向 connector 注入 `:memory:`。 |
| Q9 | 用户同步数据 | `users.syncState` 整体保存 `{ data, updatedTime }`；`data` 类型暂为 `Record<string, string[]>`，`updatedTime` 为客户端版本号；默认 `{ data: {}, updatedTime: 0 }`。 | GET/POST 在 HTTP 边界继续拆出/接收 `{ data, updatedTime }`，客户端行为不变；不再使用 official 的空字符串哨兵值。 |
| Q10 | 物理命名 | 表使用 `users`、`source_snapshots`；列使用 `sync_state`、`id`、`items`、`created_at`、`updated_at` 等语义名称。 | 不保留 official 的 `user`、`cache`、`data`、`preferences`、`created`、`updated` 泛化旧名称。 |
| Q11 | 环境校验 | GitHub/JWT 凭据允许全部缺省，但设置任意一项后必须三项齐全；拒绝空字符串；`JWT_SECRET` 至少 32 字符。`ENABLE_CACHE` 仅接受 `true`/`false`，默认 true。 | 配置错误应在解析阶段失败；不复刻 official“只有精确小写 false 才关闭”的宽松解析。 |
| Q12 | VO 与 exports | 每个 projection 同时提供独立 `vo*`，并加入所属表唯一的 `vc*`；dialect `vo.ts` 统一聚合。所有 service select 必须显式指定 VO。package exports 显式声明子路径，避免根入口隐式聚合。 | 无 `@newsnow/db` 根入口；公共子路径为 `@newsnow/db/sqlite/sqlite`（connector）和 `@newsnow/db/sqlite/schema`（schema/relations/VO/VC）。 |
| Q13 | dev push 触发层 | 采用命令/任务编排；connector 不执行 push 或 migration。 | DB 包提供 dev push 命令；未来 server dev task 将其作为启动前依赖。生产始终显式 migrate。 |
| Q14 | VO 粒度 | 一个 `vc*` 严格对应一张表；只为真实的针对性字段查询拆 projection，不为理论场景预建细粒度 VO。 | `users` 保留完整/default projection 与 `/api/me/sync` 所需的 syncState projection；删除无必要的 identity projection。`source_snapshots` 使用一个完整 entry projection。 |
| Q15 | Node SQLite 技术参数 | 此项不是产品配置决策；`createSqliteClient` 创建父目录、文件数据库启用 WAL、启用 foreign keys，并沿用 `better-sqlite3` 默认 5000ms timeout；公共返回值为 `{ db, close }`。 | 不新增 `sqliteRawConfig` 或 pragma 环境项；`:memory:` 跳过 WAL；特殊文件系统需求出现后再调整。 |
| Q16 | Migration 产物 | migration 由 drizzle-kit 自动生成，不手写；SQL 与 metadata 纳入 Git。 | 本期不处理 npm 发布 migrations；migration 保留在包源码目录并由命令消费。 |

### Enum-like value rule

- 禁止将有限枚举值的源定义写成手写字符串联合，例如 `type AuthType = 'github'` 或 `type X = 'a' | 'b'`。
- 枚举值必须先定义为冻结常量对象：`fz` 等同于 `Object.freeze`，key 使用大写常量风格，value 使用协议/存储实际值。
- 需要 TypeScript 类型时，必须从冻结常量对象推导，不得另写一份字符串联合。
- `AuthType` 的唯一当前成员为 `GITHUB: 'github'`；JWT payload 的 `type` 使用该常量值。
- `ConfigType`、`ContextCase`、`ServerEnv` 属于现有配置基础实现，本期保持 `proto.ts`、`runtime.ts` 原状，不迁移到领域 constants 文件。
- 非枚举结构联合不受此规则限制，例如 `string | number`、`false | string`、结构化对象联合。

## 3. Design Specifications

### 3.1 Scope matrix

| 能力 | 本期 | 未来/TODO | 禁止的半成品 |
|---|---:|---|---|
| SQLite schema/migrations | 是 | D1 直接复用 | 不复制 D1 schema/migrations |
| Node `better-sqlite3` client | 是 | — | 不通过 db0/Nitro 间接包装 |
| Cloudflare D1 runtime | 否 | client、binding、preset、local/remote 验收 | 不新增空 client、binding config、Wrangler 文件 |
| PostgreSQL | 否 | 无既定计划 | 不创建空 dialect/config/migration/client |
| Bun SQLite | 否 | 无既定计划 | 不迁移 official 的 Bun 条件分支 |
| Vercel Edge | 否 | 无既定计划 | 不迁移 official 的 Vercel 条件分支 |
| Repository/service | 否 | server/业务模块实现 | 不放入 `libs/db` |
| D1 source filtering | 否 | TODO 决策 | 不写占位适配器 |
| Pino edge adapter | 否 | TODO 决策 | 不写占位适配器 |

### 3.2 Target code organization

```text
libs/
├── definition/
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── src/
│       ├── index.ts
│       ├── modules/
│       │   ├── index.ts
│       │   ├── users/
│       │   │   ├── index.ts
│       │   │   ├── constants.ts     # fz 与 AuthType 冻结常量
│       │   │   └── types.ts         # JWT 与用户同步 contract
│       │   ├── sources/
│       │   │   ├── index.ts
│       │   │   └── types.ts         # 当前开放的 SourceID contract
│       │   └── news/
│       │       ├── index.ts
│       │       └── types.ts         # NewsItem contract
│       └── configs/
│           ├── index.ts
│           ├── schema.ts             # 可复用 Valibot schema，统一 $S_ 前缀
│           ├── proto.ts
│           └── defs/
│               ├── runtime.ts         # 已有；保持原配置基础实现
│               ├── log.ts             # 已有；保持当前 Node/Pino 方向
│               ├── auth.ts
│               ├── snapshot.ts
│               ├── http.ts
│               ├── third-party.ts
│               └── sqlite.ts
└── db/
    ├── package.json
    ├── tsconfig.json
    ├── vite.config.ts
    ├── migrations/
    │   └── sqlite/                   # drizzle-kit 生成产物（纳入 Git）
    └── src/
        ├── shared/
        │   └── types.ts              # 方言无关 Drizzle 类型与 VO 工具
        └── dialects/
            └── sqlite/
                ├── client.ts         # Node better-sqlite3 connector
                ├── drizzle.config.ts
                ├── utils.ts
                └── schema/
                    ├── index.ts
                    ├── tables.ts
                    ├── relations.ts
                    ├── vo.ts
                    ├── columns.ts
                    ├── types.ts
                    └── modules/
                        ├── users/
                        │   └── users.ts       # table、InsertUser、VO、VC、VO result types
                        └── sources/
                            └── source-snapshot.ts # table、InsertSourceSnapshot、VO、VC、VO result types
```

### 3.3 Definition contracts

#### Shared values and types

| Contract | Shape/source | Constraint |
|---|---|---|
| `fz` | `Object.freeze` alias | 所有 enum-like 常量统一使用；不得重复实现冻结逻辑。 |
| `AuthType` | frozen map containing `GITHUB -> 'github'` | 类型从常量推导；数据库不存该值。 |
| `AuthTokenPayload` | `id: string`; `type: value of AuthType` | 当前 `type` 必须为 `AuthType.GITHUB`。 |
| `SourceID` | `string` | source catalog 尚未迁移，当前不收窄为静态 union。 |
| `UserSyncData` | `Record<string, string[]>` | `UserSyncState.data` 的当前类型；未来 source/column 建模后允许仅收窄 TS 类型。 |
| `UserSyncState` | `{ data: UserSyncData; updatedTime: number }` | 整体保存到 `users.sync_state`；HTTP 层拆成同名两个字段。 |
| `NewsItem.id` | `string | number` | 必填。 |
| `NewsItem.title` | `string` | 必填。 |
| `NewsItem.url` | `string` | 必填。 |
| `NewsItem.mobileUrl` | `string` | 可选。 |
| `NewsItem.pubDate` | `number | string` | 可选。 |
| `NewsItem.extra.hover` | `string` | 可选。 |
| `NewsItem.extra.date` | `number | string` | 可选。 |
| `NewsItem.extra.info` | `false | string` | 可选。 |
| `NewsItem.extra.diff` | `number` | 可选。 |
| `NewsItem.extra.icon` | `false | string | { url: string; scale: number }` | 可选。 |

#### Configuration inventory

| 文件 | Schema/environment input | Static policy | Validation/default |
|---|---|---|---|
| `runtime.ts` | `SERVER_ENV` | — | 保留 `local/test/staging/main` 语义；值集合来自 frozen constant。 |
| `log.ts` | 现有 logger directory/file base | 现有 roll/pretty policy | 不实现 Pino edge adapter；不迁移 official Consola 配置。 |
| `auth.ts` | `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, `JWT_SECRET` | GitHub authorize/token/user endpoints；JWT `HS256`；expiry `60d` | 三项 all-or-none；非空；JWT secret 最少 32 字符。 |
| `snapshot.ts` | `ENABLE_CACHE` | TTL 30 分钟；单 source 最大 30 items | boolean string 严格解析；默认 true。 |
| `http.ts` | — | official 通用 user agent；timeout 10 秒；retry 3 | static config。 |
| `third-party.ts` | `PRODUCTHUNT_API_TOKEN` -> `producthuntApiToken` | — | 可选；空字符串归一化为 `undefined`。 |
| `sqlite.ts` | `DB_PATH` | — | 环境值为绝对路径；缺省时为 workspace `data/newsnow.sqlite`。 |

#### Configuration architecture

- 继续使用 `defineSchemaConfig`、`defineStaticConfig`、Valibot 和 `resolve({ context, matchContextKey })`。
- definition 不直接读取 `process.env`，不创建解析后的全局 secret/config 单例。
- application composition root 负责把 `process.env` 传给 resolver，再把解析结果注入 connector/service。
- 文件命名、schema 常量、输出类型、配置对象命名必须延续当前 `configs/defs/log.ts`、`runtime.ts` 风格。
- 同一领域的 environment schema 与 static policy 必须共置；不得拆为 `schema/` 和 `static/` 目录。
- 不纳入：`INIT_TABLE`、`CF_PAGES`、`VERCEL`、`BUN`、D1 binding、API sponsorship/license、auth route whitelist、source 专属请求/解析常量。

### 3.4 SQLite schema

#### `users`

| TS field | SQLite column | Storage | Null/default | Semantics |
|---|---|---|---|---|
| `id` | `id` | `TEXT` PK | NOT NULL | GitHub user ID 的字符串形式。 |
| `email` | `email` | `TEXT` | NULL | GitHub notification email 或 account email；允许 GitHub 不返回邮箱。 |
| `syncState` | `sync_state` | JSON text mode | NOT NULL, default `{ data: {}, updatedTime: 0 }` | `$type<UserSyncState>()`；客户端同步版本与行审计时间分离。 |
| `createdAt` | `created_at` | `INTEGER`, `timestamp_ms` | NOT NULL, DB current-time default | Drizzle select/insert API 为 `Date`。 |
| `updatedAt` | `updated_at` | `INTEGER`, `timestamp_ms` | NOT NULL, DB current-time default | 行审计时间；Drizzle 更新钩子或服务端显式赋值，任何行变更都必须推进。 |

- 不创建 `type/provider` 列。
- 不为 primary key 重复创建 `id` index。
- 暂不导出 `$inferSelect` 类型；`$inferInsert` 仅以 `InsertUser` 命名导出。

#### `source_snapshots`

| TS field | SQLite column | Storage | Null/default | Semantics |
|---|---|---|---|---|
| `id` | `id` | `TEXT` PK | NOT NULL | `$type<SourceID>()`；当前保持开放字符串，严格 source catalog 后续迁移。 |
| `items` | `items` | JSON text mode | NOT NULL | `$type<NewsItem[]>()`；不得改回手写 stringify/parse 的普通 TEXT。 |
| `updatedAt` | `updated_at` | `INTEGER`, `timestamp_ms` | NOT NULL, DB current-time default | Drizzle API 为 `Date`；快照行变更时推进。 |

- 不创建无查询依据的额外索引。
- 暂不导出 `$inferSelect` 类型；`$inferInsert` 仅以 `InsertSourceSnapshot` 命名导出。

### 3.5 Columns and shared DB types

- `src/shared/types.ts` 只放 dialect-neutral Drizzle 类型工具：`AnyTableType`、`AnyColType`、`TableColsMap`、`TableField`、`TableFieldValue`、`InsertModel`、`VO`、`defineVO`、`SelectVOResults`、`VOColsOption`。
- `src/dialects/sqlite/schema/types.ts` 只提供 SQLite 专属 `SqliteDBType`、`SqliteTableType`、`SqliteColType`；包括 `AnySQLiteTable`、`AnySQLiteColumn` 和 `BetterSQLite3Database<typeof relations>`，不得转发 shared 工具。
- shared 类型文件不得导入 `drizzle-orm/sqlite-core`、`better-sqlite3` 或其他 runtime/dialect 专属模块；SQLite 依赖只能出现在 `src/dialects/sqlite/` 目录。
- 不得从 DB 包公共入口暴露其他方言专属类型作为公共抽象。
- `columns.ts` 提供 SQLite 列基元/工厂；每张表必须获得独立 builder，不共享可变 column builder 实例。
- 时间列必须统一采用 `timestamp_ms`，不得混用 seconds、ISO text 或普通 number API。
- JSON column 可依赖 `@newsnow/definition` 的业务数据类型，但不得把序列化、校验、repository 行为塞入 column helper。
- official `_base.ts` 中的 `idType` 已在 SQLite `columns.ts` 提供对标实现：物理层为 `INTEGER`，应用层为 `string`，兼容 SQLite 驱动返回 `number` 或 `bigint`；当前表仍使用文本业务 ID，因此暂未被表字段采用。

### 3.6 VO contract

#### Granularity rules

1. 一个 `vc*` 只对应一张表。
2. 每个 projection 必须存在独立命名的 `vo*`。
3. 每个 `vo*` 必须注册到所属表唯一的 `vc*`。
4. dialect `vo.ts` 负责聚合导出所有 `vo*` 和 `vc*`。
5. 只有真实接口/查询针对少数字段时才拆专用 projection。
6. 不为“将来可能需要”预建 identity、list、detail 等 projection。
7. service 的所有 select 必须显式指定 VO；不得依赖无参数全字段 select。
8. 查询条件不同但输出字段相同的场景必须复用同一个 VO。

#### Organization and naming

- 每个领域模块的 `modules/*/*.ts` 同时定义该表、Drizzle inferred types、所属 VO、所属 VC 及 VO result types；不得把各领域 projection 的实现集中到 dialect 根部 `vo.ts`。
- 表的 `$inferSelect` 暂不另起类型别名；表的 `$inferInsert` 类型统一命名为 `InsertXXX`，例如 `InsertUser`、`InsertSourceSnapshot`。
- dialect `vo.ts` 只做聚合导出，不定义 projection；`tables.ts` 同理只做表聚合与 `sqliteTableDefs` 组装。
- VO result type 名称必须以 `I` 开头、`VO` 结尾，例如 `IUsersVO`、`IUsersSyncStateVO`、`ISourceSnapshotsVO`；不得使用 `UsersVO` 这类不带 `I` 前缀的名称。
- 保持 `vo*` 为单个 projection、`vc*` 为所属表的 projection collection；一个 `vc*` 仍严格对应一张表。

#### Initial VO set

| Table collection | Projection | Fields | Justification |
|---|---|---|---|
| `vcUsers.default` | `voUsers` | `id`, `email`, `syncState`, `createdAt`, `updatedAt` | 表的标准完整输出；避免为普通读取拆碎 projection。 |
| `vcUsers.syncState` | `voUsersSyncState` | `syncState` | official `/api/me/sync` GET/POST 的存储投影；客户端版本来自 JSON 内的 `updatedTime`，不读取行审计 `updatedAt`。 |
| `vcSourceSnapshots.default` | `voSourceSnapshots` | `id`, `items`, `updatedAt` | 单条与批量 snapshot 查询输出相同且都需要全部字段。 |

- 删除此前候选的 `voUserIdentity`：未来 GitHub 用户写入应优先使用 upsert，不需要为预查询存在性预建窄 projection。
- VO 是 select projection，不是 API DTO；HTTP 的 `Date -> number` 转换不进入 VO。

### 3.7 Relations

- 当前两张表无关系。
- 保留 dialect 级 `relations.ts`，用于建立稳定的完整 Drizzle schema/client 类型入口。
- 不创建空的模块级 relation part 文件。
- 未来出现真实关联时，同时定义数据库 FK/constraint 和 Drizzle relation；relation 不替代数据库约束。

### 3.8 Node SQLite connector

| Aspect | Contract |
|---|---|
| Public factory | `createSqliteClient`（`src/dialects/sqlite/client.ts`），参数注入数据库文件路径；不得读取环境变量。 |
| Return | `{ db, close }`；`db` 类型为 `SqliteDatabase`（即 `SqliteDBType`），为带 SQLite schema/relations 类型的 Drizzle `better-sqlite3` database。 |
| Filesystem | 文件不为 `:memory:` 时创建父目录。 |
| Journal | 仅文件数据库开启 WAL；`:memory:` 跳过 WAL。 |
| Foreign keys | 开启 `foreign_keys`。 |
| Lock timeout | 沿用 `better-sqlite3` 默认 5000ms，不重复配置 pragma。 |
| Lifecycle | 使用方调用返回对象的 `close()`；factory 不持有全局 singleton。 |
| Forbidden | 不 push、不 migrate、不建表、不执行业务查询、不导入解析后的 config 单例。 |

### 3.9 Migrations and commands

| Scenario | Action | Implicit schema mutation |
|---|---|---:|
| Node local dev | `oyo env sqlite` 加载 `envs/.env.sqlite` 后执行 `drizzle-kit push --config=drizzle-kit/sqlite.config.ts`（`dev:sqlite:push`） | 仅本地 dev 允许 |
| Node deployment | 部署环境注入 `DB_PATH` 后执行 `drizzle-kit migrate --config=drizzle-kit/sqlite.config.ts`（`dev:sqlite:migrate`） | 否 |
| Future D1 local | 复用 `migrations/sqlite`，具体执行方式待 D1 阶段决定 | 否 |
| Future D1 remote | 复用 `migrations/sqlite`，具体执行方式待 D1 阶段决定 | 否 |

- Drizzle Kit config 位于 `drizzle-kit/sqlite.config.ts`，不属于构建源码；`schema` 指向 `src/dialects/sqlite/schema/tables.ts`，`out` 指向包根 `migrations/sqlite`；路径基于 `import.meta.dirname` 解析；`dbCredentials.url` 由 `@newsnow/definition` 的 `sqliteSchemaConfig` 从 `process.env` 解析 `DB_PATH`。
- Migration 输出固定为 `migrations/sqlite`。
- 提供 `dev:sqlite:gen`、`dev:sqlite:push`、`dev:sqlite:migrate`、`sqlite:export` 脚本/任务。
- Migration SQL 和 drizzle-kit metadata 均由工具生成并提交 Git；不得手写 baseline migration。
- 本期不修改 package `files` 以发布 migrations。
- 本期只有 libs，无法替尚未迁移的 server 挂接自动 dev push；只提供可供未来 app task 依赖的命令。

### 3.10 Package boundaries and exports

| Import | Content |
|---|---|
| `@newsnow/definition/frontend` | 前端共享领域定义：source catalog、来源/新闻/user-sync contract 与 frozen constants。 |
| `@newsnow/definition/backend` | backend 领域定义与 Node 配置，包括 SQLite 默认数据库路径。 |
| `@newsnow/db/sqlite/schema` | SQLite tables、`InsertXXX` types、relations、VO/VC、共享 Drizzle 类型工具及 SQLite dialect types。 |
| `@newsnow/db/sqlite/sqlite` | Node `better-sqlite3` connector（`createSqliteClient`、`SqliteClient`、`SqliteDatabase`）。 |

- 当前无 `@newsnow/db` 根入口；`package.json` 显式声明 `./sqlite/schema` 与 `./sqlite/sqlite` 子路径 export。
- `vite.config.ts` 只声明两个 pack 入口：`sqlite/schema` → `src/dialects/sqlite/schema/index.ts`，`sqlite/sqlite` → `src/dialects/sqlite/client.ts`；不得把 modules、tables、columns 等内部文件各自打成公共入口。
- `./package.json` 应作为显式 export 保留。
- 不创建 `clients/index.ts` 等单纯 pass-through wrapper；connector 构建入口直接指向 `client.ts`。

### 3.11 Validation

1. 修改前执行 `vp install`；不得修改 `.worktrees/official`。
2. 运行 baseline migration 生成并检查产物；不得人工改写 SQL 来掩盖 schema 错误，应修改 schema 后重新生成。
3. 运行 `vp check`、`vp test`，并检查 package 中定义的额外验证任务；本期不为常量、VO 结构或单一 adapter 增加专门测试文件。
4. 不执行 `git add` 或 `git commit`，除非用户明确要求。

## 4. Notes

- `.worktrees/official` 是只读事实来源，任何修改均禁止。
- server 迁移不属于本期；本期不得为了证明 libs 可用而改动 app/server 消费代码。
- official 的 README 声称支持多种 db0 connector，不代表其手写 SQLite SQL 能跨方言；不得据此增加 PostgreSQL/MySQL 支持。
- D1 是 SQLite runtime adapter；未来必须复用当前 SQLite schema/migrations，不得复制第三套 D1 schema。
- `INIT_TABLE` 已废弃；不得以其他名称恢复请求路径建表或 client 自动 migrate。
- D1 client/binding/preset/Wrangler/D1 验收、D1 source filtering、Pino edge adapter均为后续 TODO，当前没有待实现的部分。
- source-specific endpoint、headers、limits、parser options 继续留在未来 source adapter 附近。
- `NewsItem`、用户 `UserSyncData` 和 `UserSyncState` 是共享数据 contract；VO 仍只是数据库 projection，不承担运行时数据校验或 HTTP DTO 转换。
- 现有 `libs/db/dist` 可能是过期生成物（例如仍引用已删除的 `sqlite.ts`），不能作为源码或设计依据；源码变更后以 `vp pack` 重新构建。
- PostgreSQL stub 已替换为 SQLite dialect；不得再引入无 schema 的方言兼容层。
- 必须遵循仓库约定：优先使用 `||` 作为默认值，除非 `0`、空字符串或 `false` 是有效数据；不得删除既有注释而不先确认；执行 silent refactor pass，移除单次使用的 pass-through wrapper。
