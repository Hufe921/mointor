const homeModule = {
  // 浏览器来源分析
  FromsStatic: {
    url: 'api/fromsStatic',
    method: 'get'
  },
  // 响应时间分析
  ActionsStatic: {
    url: 'api/actionsStatic',
    method: 'get'
  },
  // 错误数量分析
  ErrorsStatic: {
    url: 'api/errorsStatic',
    method: 'get'
  },
  // 根据时段获取错误详情
  GetDetailError: {
    url: 'api/getDetailError',
    method: 'post'
  },
  // 访问地理位置
  PlacesStatic: {
    url: 'api/placesStatic',
    method: 'get'
  }
}
export default homeModule
