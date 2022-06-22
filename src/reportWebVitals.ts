/*
 * @Author: D.Y.M
 * @Date: 2021-10-19 16:43:46
 * @LastEditTime: 2021-10-20 16:39:03
 * @FilePath: /otter/src/reportWebVitals.ts
 * @Description: 
 */
import type { ReportHandler } from 'web-vitals'

const reportWebVitals = (onPerfEntry?: ReportHandler) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry)
      getFID(onPerfEntry)
      getFCP(onPerfEntry)
      getLCP(onPerfEntry)
      getTTFB(onPerfEntry)
    })
  }
}

export default reportWebVitals
