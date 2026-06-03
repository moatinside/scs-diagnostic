export function renderReportEmail({ name, email, company, score, level, breakdown }) {
  const pct = Math.round((score / 15) * 100);
  const levelDesc = {
    A: 'SCS対応に積極的な企業と同等の体制をお持ちです。',
    B: '基本的な対策は取れていますが、一部に改善余地があります。',
    C: '最低限の対策はできていますが、SCS観点では不足があります。',
    D: 'セキュリティ対策の強化が必要です。まずは基礎から見直しましょう。',
  }[level] || '診断結果をご確認ください。';

  const levelColor = { A: '#22c55e', B: '#3b82f6', C: '#f59e0b', D: '#ef4444' }[level] || '#888';

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><style>
body{font-family: sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: 0 auto;}
.header{background: linear-gradient(135deg, #0f3460, #1a5276); color: white; padding: 32px; text-align: center; border-radius: 12px 12px 0 0;}
.header h1{margin: 0; font-size: 22px;}
.score-badge{display: inline-block; background: ${levelColor}; color: white; font-size: 36px; font-weight: bold; width: 80px; height: 80px; line-height: 80px; text-align: center; border-radius: 50%; margin: 12px 0;}
.section{padding: 24px; background: #f8fafc; border-bottom: 1px solid #e2e8f0;}
.section h2{font-size: 16px; color: #0f3460; margin: 0 0 12px 0;}
.info-item{margin-bottom: 8px;}
.info-item strong{display: inline-block; width: 100px;}
.footer{background: #0f3460; color: white; padding: 24px; text-align: center; border-radius: 0 0 12px 12px; font-size: 13px;}
.btn{display: inline-block; background: #e94560; color: white; text-decoration: none; padding: 12px 24px; border-radius: 6px; margin-top: 16px; font-weight: bold;}
table{width: 100%; border-collapse: collapse; margin-top: 8px;}
th,td{padding: 8px 12px; text-align: left; border-bottom: 1px solid #e2e8f0; font-size: 14px;}
th{background: #0f3460; color: white;}
</style></head>
<body>
<div class="header">
  <h1>SCSかんたん診断 レポート</h1>
  <div class="score-badge">${level}</div>
  <p>診断スコア: ${score}/15点（${pct}%）</p>
</div>

<div class="section">
  <h2>📋 ご入力情報</h2>
  <div class="info-item"><strong>お名前:</strong> ${name || '未入力'}</div>
  <div class="info-item"><strong>会社名:</strong> ${company || '未入力'}</div>
  <div class="info-item"><strong>メール:</strong> ${email}</div>
</div>

<div class="section">
  <h2>📊 診断結果サマリー</h2>
  <p style="font-size:15px;color:${levelColor};font-weight:bold;">レベル${level}: ${levelDesc}</p>
  <p style="font-size:13px;color:#888;">この診断は15問の簡易設問に基づく参考値です。正確な評価には専門家による詳細診断をお勧めします。</p>
</div>

<div class="section">
  <h2>🔍 次のステップ</h2>
  <p>診断結果についての無料相談を受け付けています。以下のボタンからお気軽にお問い合わせください。</p>
  <div style="text-align:center;">
    <a class="btn" href="mailto:scs-inquiry@example.com?subject=SCS診断について相談したい&body=SCSかんたん診断を利用しました。%0A診断スコア:${score}点（${pct}%）%0A診断レベル:${level}%0A%0A無料相談を希望します。">無料相談する</a>
  </div>
</div>

<div class="footer">
  <p>SCS評価制度対応支援 | 担当: Kam</p>
  <p style="font-size:11px;opacity:0.7;">本メールは自動配信されています。心当たりのない場合は破棄してください。</p>
</div>
</body>
</html>`;
}
