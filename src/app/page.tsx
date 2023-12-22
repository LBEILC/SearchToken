// pages/search-key.tsx
'use client'
import { useState, ChangeEvent } from 'react';

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
      // 发送请求到你的 Next.js API 路由
      const response = await fetch(`/api/fetch-data?key=${encodeURIComponent(key)}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch data');
      }

      setUserData(data);
      setError('');
    } catch (err: any) {
      setError(err.message);
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
      {error && <p>Error: {error}</p>}
      {userData && (
        <div>
          <h3>User Data:</h3>
          <pre>{JSON.stringify(userData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}