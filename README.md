# 日本トロマツ株式会社 会社HPテンプレ（静的サイト）

`index.html` / `styles.css` / `main.js` だけで動く、シンプルな会社HPのひな形です（ビルド不要）。

## まず見る

- `index.html`: 文言・セクション構成
- `styles.css`: デザイン（色/余白/レスポンシブ）
- `main.js`: モバイルメニュー / お問い合わせフォーム（メール作成）

## カスタマイズ手順（最低限）

- **会社名**: `index.html` の「日本トロマツ株式会社」を置換
- **メール/電話**: `index.html` の `hello@example.com` / `03-0000-0000` を置換
- **住所**: `index.html` の会社概要・お問い合わせ欄を置換
- **OG/説明文**: `index.html` の `title` / `description` / `og:*` を置換
- **問い合わせ先メール**: `main.js` の `to = "hello@example.com"` を置換

## ローカルで表示する（Windows）

どちらでもOKです。

### 1) そのまま開く

エクスプローラーで `index.html` をダブルクリック。

### 2) 簡易サーバーで開く（推奨）

PowerShell でこのフォルダを開いてから:

```powershell
python -m http.server 5173
```

その後ブラウザで `http://localhost:5173` を開きます。

#### うまく起動できない場合（日本語パス/OneDrive等）

環境によっては、フォルダパスに日本語が含まれると `cd` や起動がうまくいかないことがあります。

- **回避策A**: `index.html` を直接開く（手軽）
- **回避策B**: プロジェクトを英数字パスへ移動（例: `C:\dev\toromatsu-hp\`）してから再度起動
- **回避策C**: `python` が無い場合は `py` を使用

```powershell
py -m http.server 5173
```

## 公開方法（例）

- GitHub Pages
- Netlify / Vercel（静的サイトとして）

※お問い合わせフォームを「実送信」する場合は、フォーム送信先（例: Formspree / Netlify Forms / 独自API）に切り替えます。

