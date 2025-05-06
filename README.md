## 构建过程

用 yarn 初始化项目

```bash
yarn create next-app
```

安装 tailwind 类名排序

https://github.com/tailwindlabs/prettier-plugin-tailwindcss

```bash
yarn add -D prettier prettier-plugin-tailwindcss
```

在 .prettierrc 中添加配置

```json
// .prettierrc
{
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

## za

```bash
# using `contentlayer2` instead of `contentlayer`
yarn add contentlayer2 next-contentlayer2

# using `codehike` for code highlighting
yarn add codehike

yarn add tailwind-merge clsx
```
