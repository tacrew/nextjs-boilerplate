## Getting Started

### development server の立ち上げ

.env にて`NEXT_PUBLIC_API_URL`を指定すること

```bash
yarn dev
```

### mock api server の利用

.env にて`NEXT_PUBLIC_API_MOCKING`を`true`とすること

```bash
yarn dev
```

ブラウザの console に下記の記載があれば mock api server が正常に起動しています。
`[MSW] Mocking enabled.`
