// 千位符分割
export function numFormat(value:any, type:string) {
  try {
    // 转换成数字类型才能调用toLocaleString
    const num = Number(value)
    let result
    switch (type) {
      case 'money':
        result = num.toLocaleString('zh', { style: 'currency', currency: 'cny' })
        break
      default:
        result = (num).toLocaleString()
    }
    return result
  } catch (error) {
    return ''
  }
}
