import eventBus from '@/methods/eventBus.js'

export default function (response, title = '更新') {
  if (response.data.success) {
    // console.log('成功至pushMessageState.js', title)
    eventBus.emit('push-message', {
      title: `${title}成功!`,
      style: 'var(--side-color)'
    })
  } else {
    // 有些失敗訊息是字串，有些則是陣列，因此在此統一格式
    const message = typeof response.data.message === 'string' ? [response.data.message] : response.data.message
    eventBus.emit('push-message', {
      title: `${title}失敗!`,
      style: 'var(--light-color)',
      content: message.join('、')
    })
  }
}
