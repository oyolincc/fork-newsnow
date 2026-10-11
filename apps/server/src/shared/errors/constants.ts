import { fz } from '@/shared/utils'

// /* 参考自 grpc code */
// export const ErrorCode = fz({
//   // 操作已被取消，通常由调用方取消。
//   //
//   // HTTP 映射：499 Client Closed Request
//   CANCELLED: 'CANCELLED',

//   // 未知错误。例如，当从另一个地址空间接收到的 `Status` 值
//   // 属于本地址空间未知的错误空间时，可能返回此错误。此外，
//   // 未返回足够错误信息的 API 所抛出的错误也可能被转换为此错误。
//   //
//   // HTTP 映射：500 Internal Server Error
//   UNKNOWN: 'UNKNOWN',

//   // 客户端指定了无效参数。注意这与 `FAILED_PRECONDITION` 不同。
//   // `INVALID_ARGUMENT` 表示无论系统状态如何都有问题的参数
//   //（例如，格式错误的文件名）。
//   //
//   // HTTP 映射：400 Bad Request
//   INVALID_ARGUMENT: 'INVALID_ARGUMENT',

//   // 在操作完成之前已超过截止时间。对于会改变系统状态的操作，
//   // 即使操作已成功完成，也可能返回此错误。例如，来自服务器的
//   // 成功响应可能延迟过久，导致截止时间已过期。
//   //
//   // HTTP 映射：504 Gateway Timeout
//   DEADLINE_EXCEEDED: 'DEADLINE_EXCEEDED',

//   // 未找到某些请求的实体（例如，文件或目录）。
//   //
//   // 给服务端开发者的说明：如果请求对某一类用户整体被拒绝，
//   // 例如渐进式功能发布或未文档化的白名单，可以使用 `NOT_FOUND`。
//   // 如果请求对某一类用户中的部分用户被拒绝，例如基于用户的访问控制，
//   // 则必须使用 `PERMISSION_DENIED`。
//   //
//   // HTTP 映射：404 Not Found
//   NOT_FOUND: 'NOT_FOUND',

//   // 客户端尝试创建的实体（例如，文件或目录）已存在。
//   //
//   // HTTP 映射：409 Conflict
//   ALREADY_EXISTS: 'ALREADY_EXISTS',

//   // 调用方没有执行指定操作的权限。`PERMISSION_DENIED` 不得用于
//   // 因资源耗尽而导致的拒绝（此类错误应使用 `RESOURCE_EXHAUSTED`）。
//   // 如果无法识别调用方，则不得使用 `PERMISSION_DENIED`
//   //（此类错误应使用 `UNAUTHENTICATED`）。此错误码并不表示
//   // 请求有效，也不表示请求的实体存在或满足其他前置条件。
//   //
//   // HTTP 映射：403 Forbidden
//   PERMISSION_DENIED: 'PERMISSION_DENIED',

//   // 请求缺少执行该操作的有效身份验证凭据。
//   //
//   // HTTP 映射：401 Unauthorized
//   UNAUTHENTICATED: 'UNAUTHENTICATED',

//   // 某些资源已耗尽，可能是每用户配额，
//   // 也可能是整个文件系统空间不足。
//   //
//   // HTTP 映射：429 Too Many Requests
//   RESOURCE_EXHAUSTED: 'RESOURCE_EXHAUSTED',

//   // 操作被拒绝，因为系统未处于执行该操作所需的状态。
//   // 例如，要删除的目录非空、对非目录执行 rmdir 操作等。
//   //
//   // 服务实现者可以使用以下指南在 `FAILED_PRECONDITION`、
//   // `ABORTED` 和 `UNAVAILABLE` 之间做出选择：
//   //  (a) 如果客户端可以仅重试失败的调用，则使用 `UNAVAILABLE`。
//   //  (b) 如果客户端应在更高层级重试，则使用 `ABORTED`。
//   //      例如，当客户端指定的 test-and-set 失败时，表示客户端
//   //      应重新开始读-改-写序列。
//   //  (c) 如果客户端在系统状态被明确修复之前不应重试，
//   //      则使用 `FAILED_PRECONDITION`。例如，如果 rmdir 因目录
//   //      非空而失败，应返回 `FAILED_PRECONDITION`，因为除非
//   //      目录中的文件被删除，否则客户端不应重试。
//   //
//   // HTTP 映射：400 Bad Request
//   FAILED_PRECONDITION: 'FAILED_PRECONDITION',

//   // 操作已中止，通常由于并发问题，例如序列号检查失败或事务中止。
//   //
//   // 关于在 `FAILED_PRECONDITION`、`ABORTED` 和 `UNAVAILABLE`
//   // 之间如何选择，请参阅上述指南。
//   //
//   // HTTP 映射：409 Conflict
//   ABORTED: 'ABORTED',

//   // 操作超出了有效范围。例如，在文件末尾之后进行 seek 或 read。
//   //
//   // 与 `INVALID_ARGUMENT` 不同，此错误表示的问题可能在系统状态
//   // 改变后得到修复。例如，32 位文件系统在被要求读取不在
//   // [0,2^32-1] 范围内的偏移量时会生成 `INVALID_ARGUMENT`，
//   // 但在被要求读取超过当前文件大小的偏移量时会生成 `OUT_OF_RANGE`。
//   //
//   // `FAILED_PRECONDITION` 与 `OUT_OF_RANGE` 之间存在一定重叠。
//   // 我们建议在适用时使用更具体的 `OUT_OF_RANGE`，以便遍历
//   // 某个空间的调用方可以方便地查找 `OUT_OF_RANGE` 错误来判断
//   // 是否已完成。
//   //
//   // HTTP 映射：400 Bad Request
//   OUT_OF_RANGE: 'OUT_OF_RANGE',

//   // 操作未实现，或在本服务中不受支持/未启用。
//   //
//   // HTTP 映射：501 Not Implemented
//   UNIMPLEMENTED: 'UNIMPLEMENTED',

//   // 内部错误。这意味着底层系统预期的不变量已被破坏。
//   // 此错误码保留用于严重错误。
//   //
//   // HTTP 映射：500 Internal Server Error
//   INTERNAL: 'INTERNAL',

//   // 服务当前不可用。这很可能是暂时性状况，可以通过带退避的重试来纠正。
//   // 请注意，重试非幂等操作并不总是安全的。
//   //
//   // 关于在 `FAILED_PRECONDITION`、`ABORTED` 和 `UNAVAILABLE`
//   // 之间如何选择，请参阅上述指南。
//   //
//   // HTTP 映射：503 Service Unavailable
//   UNAVAILABLE: 'UNAVAILABLE',

//   // 不可恢复的数据丢失或损坏。
//   //
//   // HTTP 映射：500 Internal Server Error
//   DATA_LOSS: 'DATA_LOSS',
// })
// export type ErrorCode = (typeof ErrorCode)[keyof typeof ErrorCode]

export const ErrorHttpStatus = fz({
  CANCELLED: 499,
  UNKNOWN: 500,
  INVALID_ARGUMENT: 400,
  UNPROCESSABLE_ENTITY: 422,
  DEADLINE_EXCEEDED: 504,
  NOT_FOUND: 404,
  ALREADY_EXISTS: 409,
  PERMISSION_DENIED: 403,
  UNAUTHENTICATED: 401,
  RESOURCE_EXHAUSTED: 429,
  FAILED_PRECONDITION: 400,
  ABORTED: 409,
  OUT_OF_RANGE: 400,
  UNIMPLEMENTED: 501,
  INTERNAL: 500,
  UNAVAILABLE: 503,
  DATA_LOSS: 500,
})
export type ErrorHttpStatus = (typeof ErrorHttpStatus)[keyof typeof ErrorHttpStatus]
