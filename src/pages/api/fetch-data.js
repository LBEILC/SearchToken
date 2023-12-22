// pages/api/fetch-data.js
import axios from 'axios'

export default async function handler (req, res) {
  try {
    // 从请求中获取参数（如果有）
    const { key } = req.query

    // 设置请求到第三方服务的 URL 和 Cookie
    const url = 'https://api.v3.cm/api/token/?p=0'
    const cookie = 'Hm_lvt_3fab922b8863ef4637306477eef76397=1700490958,1700798757; session=MTcwMjAyMjU1MHxEWDhFQVFMX2dBQUJFQUVRQUFCd180QUFCQVp6ZEhKcGJtY01DQUFHYzNSaGRIVnpBMmx1ZEFRQ0FBSUdjM1J5YVc1bkRBUUFBbWxrQTJsdWRBUUVBUDREMEFaemRISnBibWNNQ2dBSWRYTmxjbTVoYldVR2MzUnlhVzVuREFrQUIxVnlZVzVwZFcwR2MzUnlhVzVuREFZQUJISnZiR1VEYVc1MEJBSUFBZz09fGWIgSKcCTGSFMQ8h5neaBb1XWjdTgD5HmPbRqrsvD3p'

    // 发送请求到第三方服务
    const response = await axios.get(url, {
      headers: {
        'Cookie': cookie
      }
    })

    // 如果请求成功，返回获取的数据
    if (response.data && response.data.data) {
      const userData = response.data.data.find(item => item.key === key)
      if (userData) {
        res.status(200).json(userData)
      } else {
        res.status(404).json({ message: 'No data found for this key.' })
      }
    } else {
      res.status(404).json({ message: 'Data not found' })
    }
  } catch (error) {
    // 如果请求失败，返回错误信息
    res.status(500).json({ message: error.message })
  }
}