const PIXEL_ID = '1893288164591890';

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method not allowed' });
    return;
  }

  const accessToken = process.env.META_ACCESS_TOKEN;
  if (!accessToken) {
    res.status(500).json({ error: 'server not configured' });
    return;
  }

  const { event_name, event_id, event_source_url, fbp, fbc, content_name } = req.body || {};
  if (!event_name || !event_id) {
    res.status(400).json({ error: 'missing event_name or event_id' });
    return;
  }

  const clientIp = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket.remoteAddress;
  const userAgent = req.headers['user-agent'] || '';

  const userData = {
    client_ip_address: clientIp,
    client_user_agent: userAgent,
  };
  if (fbp) userData.fbp = fbp;
  if (fbc) userData.fbc = fbc;

  const payload = {
    data: [{
      event_name,
      event_time: Math.floor(Date.now() / 1000),
      event_id,
      event_source_url,
      action_source: 'website',
      user_data: userData,
      ...(content_name ? { custom_data: { content_name } } : {}),
    }],
  };

  try {
    const metaRes = await fetch(
      `https://graph.facebook.com/v21.0/${PIXEL_ID}/events?access_token=${accessToken}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    );
    const data = await metaRes.json();
    if (!metaRes.ok) {
      res.status(502).json({ error: data });
      return;
    }
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'capi request failed' });
  }
};
