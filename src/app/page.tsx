// pages/search-key.tsx
"use client"
import { useState, ChangeEvent } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;

axios.defaults.headers.common['Cookie'] = 'Hm_lvt_3fab922b8863ef4637306477eef76397=1700490958,1700798757; session=MTcwMjAyMjU1MHxEWDhFQVFMX2dBQUJFQUVRQUFCd180QUFCQVp6ZEhKcGJtY01DQUFHYzNSaGRIVnpBMmx1ZEFRQ0FBSUdjM1J5YVc1bkRBUUFBbWxrQTJsdWRBUUVBUDREMEFaemRISnBibWNNQ2dBSWRYTmxjbTVoYldVR2MzUnlhVzVuREFrQUIxVnlZVzVwZFcwR2MzUnlhVzVuREFZQUJISnZiR1VEYVc1MEJBSUFBZz09fGWIgSKcCTGSFMQ8h5neaBb1XWjdTgD5HmPbRqrsvD3p';

document.cookie = 'Hm_lvt_3fab922b8863ef4637306477eef76397=1700490958,1700798757; session=MTcwMjAyMjU1MHxEWDhFQVFMX2dBQUJFQUVRQUFCd180QUFCQVp6ZEhKcGJtY01DQUFHYzNSaGRIVnpBMmx1ZEFRQ0FBSUdjM1J5YVc1bkRBUUFBbWxrQTJsdWRBUUVBUDREMEFaemRISnBibWNNQ2dBSWRYTmxjbTVoYldVR2MzUnlhVzVuREFrQUIxVnlZVzVwZFcwR2MzUnlhVzVuREFZQUJISnZiR1VEYVc1MEJBSUFBZz09fGWIgSKcCTGSFMQ8h5neaBb1XWjdTgD5HmPbRqrsvD3p';

document.cookie = 'session=MTcwMjAyMjU1MHxEWDhFQVFMX2dBQUJFQUVRQUFCd180QUFCQVp6ZEhKcGJtY01DQUFHYzNSaGRIVnpBMmx1ZEFRQ0FBSUdjM1J5YVc1bkRBUUFBbWxrQTJsdWRBUUVBUDREMEFaemRISnBibWNNQ2dBSWRYTmxjbTVoYldVR2MzUnlhVzVuREFrQUIxVnlZVzVwZFcwR2MzUnlhVzVuREFZQUJISnZiR1VEYVc1MEJBSUFBZz09fGWIgSKcCTGSFMQ8h5neaBb1XWjdTgD5HmPbRqrsvD3p';
interface UserData {
  id: number;
  user_id: number;
  key: string;
  status: number;
  name: string;
  created_time: number;
  accessed_time: number;
  expired_time: number;
  remain_quota: number;
  unlimited_quota: boolean;
  used_quota: number;
}

export default function SearchKey() {
  const [key, setKey] = useState<string>('');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState<string>('');

  const handleSearch = async () => {
    try {
      const response = await axios.get('https://api.v3.cm/api/token/?p=0', {
        withCredentials: true, // 确保跨域请求时发送 Cookie
      });
      const json = response.data;
      if (json.success && json.data) {
        const userKeyData = json.data.find((item: UserData) => item.key === key);
        if (userKeyData) {
          setUserData(userKeyData);
        } else {
          setError('No data found for this key.');
          setUserData(null);
        }
      } else {
        setError('Failed to fetch data.');
        setUserData(null);
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        // 处理 Axios 错误响应
        setError(`Error: ${err.response.status} ${err.response.statusText}`);
      } else {
        // 处理意外错误
        setError('An unexpected error occurred.');
      }
      setUserData(null);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setKey(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={key}
        onChange={handleChange}
        placeholder="Enter your key"
      />
      <button onClick={handleSearch}>Search</button>
      {error && <p>{error}</p>}
      {userData && (
        <div>
          <h3>User Data:</h3>
          <pre>{JSON.stringify(userData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}