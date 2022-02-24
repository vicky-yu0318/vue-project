import eventBus from '@/methods/eventBus.js'

export default function (title = '更新', result) {
  // console.log('成功至pushMessageState.js', title)
  if (result === false) {
    eventBus.emit('push-message', {
      title: `${title}`,
      style: 'var(--light-color)'
    })
  } else {
    eventBus.emit('push-message', {
      title: `${title}成功!`,
      style: 'var(--side-color)'
    })
  }
}
