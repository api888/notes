ref与reactive对比（148）
[TOC]

# 从定义数据角度对比

- `ref` 用来定义基本类型数据
- `reactive` 用来定义对象类型或数组类型数据

**备注** `ref` 也可以定义对象类型或数组类型数据，内部会自动通过 `reactive` 转为代理对象

# 从原理角度对比

- `ref` 通过 `Object.defineProperty()` 的 `get` 与 `set` 来实现响应式（数据劫持）
- `reactive` 通过 `Proxy` 来实现响应式（数据劫持），并通过 `Reflect` 操作源对象的内部数据。

# 从使用角度对比

- `ref` 定义的数据，在js中操作数据需要 `.value` ，模板中不需要。
- `reactive` 定义的数据，在js中或模板中，都不需要`.value` 。