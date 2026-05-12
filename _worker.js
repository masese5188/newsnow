export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // 尝试获取请求的文件
    let response = await env.ASSETS.fetch(request);
    
    // 如果返回 404，返回 index.html（SPA 路由支持）
    if (response.status === 404 && !url.pathname.startsWith('/api')) {
      response = await env.ASSETS.fetch(new URL('/index.html', request.url));
    }
    
    return response;
  }
}
