# ゲロルトの工匠記録

FF14 レリック武器の作成進捗を管理するツールです。  
武器・ジョブを選択し、Lodestone のキャラクターデータと照合して達成済みステップを確認できます。

**URL**: https://lastagous.com/gerolt-selection/

---

## 対応武器

| キー | 武器名 | Lv | パッチ |
|------|-------|----|-------|
| ZW | Zodiac Weapon | 50 | 2.0 – 2.51 |
| AW | Anima Weapon | 60 | 3.15 – 3.55 |
| EW | Eureka Weapon | 70 | 4.25 – 4.55 |
| RW | Resistance Weapon | 80 | 5.25 – 5.55 |
| MW | Manderville Weapon | 90 | 6.25 – 6.55 |
| PW | Phantom Weapon | 100 | 7.25 – 7.41 |

---

## 技術スタック

| 役割 | 技術 |
|------|------|
| フレームワーク | Astro 4.x (`output: static`) |
| UI コンポーネント | Svelte 4.x |
| スタイル | Tailwind CSS 3.x |
| ホスティング | GitHub Pages（`lastagous.com/gerolt-selection/`） |

---

## 開発

```bash
npm install
npm run dev      # ローカル開発サーバー起動 (http://localhost:4321)
npm run build    # 静的ビルド → dist/
```

---

## デプロイ

`master` ブランチへの push で GitHub Actions が自動ビルド・デプロイします。

```
.github/workflows/deploy.yml
```

---

## ライセンス

ゲーム内データ・画像の著作権は © SQUARE ENIX に帰属します。
