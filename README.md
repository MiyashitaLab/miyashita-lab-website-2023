シン・miyashita.com

# 依存関係

何のためにパッケージを追加したのかを忘れないようにするためのメモ。
package.jsonに追加したらここにも書く。

- tailwindcss, postcss, autoprefixer
  - tailwindcssを使うために必要
- eslint-plugin-tailwindcss
  - tailwindcssのクラス名をeslintでチェックするために必要
- eslint-config-next
  - next.jsのeslint設定
  - @typescript-eslint/parserはこれに含まれている
