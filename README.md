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
- @storybook/*, storybook
  - storybookを使うために必要
  - npx sb initで自動追加された
- tiny-segmenter
  - 適切な箇所で日本語文を改行するために使う
- classnames
  - classNameを扱いやすくするために使う
- sharp
  - next.jsの画像最適化が高速になるのでインストールが推奨されている
- contentful
  - contentfulのデータを取得するのに使う
- contentful-management
  - entryのsnapshotを取得するのに使う
  - unpublishやslugを変えた場合、revalidateに変更前の値が必要なのでsnapshotの取得が必要
- react-pdf
  - reactでスライドPDFを表示するのに使う
- react-markdown, rehype-raw, remark-gfm
  - markdownをreactで表示するのに使う
- cf-content-types-generator
  - contentfulのモデルスキーマからTypeScriptの型データを生成するのに使う
- hygen
  - コンポーネントの雛形を作るために使う
- eslint-plugin-tailwindcss
  - tailwindcssのクラス名をeslintでチェックするために必要
- eslint-config-next
  - next.jsのeslint設定
  - @typescript-eslint/parserはこれに含まれている
- @faker-js/faker
  - story用ダミーデータを生成するのに使う
- css-loader
  - cssを読み込むのに使う、特定のページのみに反映させるため
