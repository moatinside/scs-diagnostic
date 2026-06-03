export default {
  async fetch(request, env) {
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405, headers: corsHeaders });
    }

    const GAS_URL = env.GAS_URL || '';
    if (!GAS_URL) {
      return new Response(JSON.stringify({ 
        error: 'メール送信機能の設定が完了していません。', setup: true 
      }), { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
    }

    try {
      const data = await request.json();
      
      // POST to GAS - use redirect: manual to handle Google auth redirect
      const gasResponse = await fetch(GAS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        redirect: 'manual',
      });

      // If redirected to Google sign-in, Apps Script needs auth re-deployment
      if (gasResponse.status >= 300 && gasResponse.status < 400) {
        return new Response(JSON.stringify({ 
          error: 'Apps Scriptのデプロイ設定を確認してください。「アクセスできるユーザー」が「全員（匿名ユーザーを含む）」になっていますか？'
        }), { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
      }

      const result = await gasResponse.text();
      return new Response(JSON.stringify({ 
        success: gasResponse.ok,
        message: gasResponse.ok ? '送信成功' : result 
      }), { headers: { 'Content-Type': 'application/json', ...corsHeaders } });

    } catch (err) {
      return new Response(JSON.stringify({ error: '送信に失敗しました: ' + err.message }), {
        status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }
  },
};
