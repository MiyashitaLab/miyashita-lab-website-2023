# シン・miyashita.com

## Getting Started

1. 任意の手段でNode.jsを入れる（v18以上）
https://nodejs.org/ja/
2. `$ git clone https://github.com/MiyashitaLab/shin-miyashita.com.git`
3. `$ npm install`

## Storybook

https://miyashitalab.github.io/miyashita-lab-website-2023/

## コンポーネントの作成

### パーツコンポーネント
ページ内で使用するコンポーネントを作成する。

`$ hygen component ui`

### ページコンポーネント
ページコンポーネントを作成する。
Next.jsの`/pages`ではルーティングとデータの取得のみを行い、表示はページコンポーネントに任せる。

`$ hygen component page`

## 依存関係

何のためにパッケージを追加したのかを忘れないようにするためのメモ。
package.jsonに追加したらここにも書く。

- tailwindcss, postcss, autoprefixer
  - tailwindcssを使うために必要
- eslint-plugin-tailwindcss
  - tailwindcssのクラス名をeslintでチェックするために必要
- eslint-config-next
  - next.jsのeslint設定
  - @typescript-eslint/parserはこれに含まれている
- @storybook/*, storybook
  - storybookを使うために必要
  - npx sb initで自動追加された
- hygen
  - コンポーネントの雛形を作るために使う
- @tailwindcss/line-clamp
  - n行固定ではみ出したテキストを...で省略するために使う
- budoux
  - 適切な箇所で日本語文を改行するために使う
- classnames
  - classNameを扱いやすくするために使う
