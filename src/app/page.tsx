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
  const [inputKey, setInputKey] = useState<string>('');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState<string>('');

  const handleSearch = async () => {
    try {
      // 去除前缀 "sk-" 以获取实际的 key
      const keyToSearch = inputKey.startsWith('sk-') ? inputKey.slice(3) : inputKey;

      // 发送请求到你的 Next.js API 路由
      const response = await fetch(`/api/fetch-data?key=${encodeURIComponent(keyToSearch)}`);
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
    setInputKey(event.target.value);
  };

  // 格式化时间戳为日期字符串
  const formatDate = (timestamp: number): string =>
    new Date(timestamp * 1000).toLocaleString();

  // 格式化额度为货币字符串
  const formatQuota = (quota: number): string =>
    `$${(quota / 250000).toFixed(2)}`;

  return (
    <div className="container mx-auto px-4 py-6 dark:bg-gray-800">
      <input
        className="search-input bg-white dark:bg-gray-700 dark:text-white input bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal mb-4"
        type="text"
        value={inputKey}
        onChange={handleChange}
        placeholder="输入你的Key 以 'sk-' 开头"
      />
      <button
        className="search-button bg-blue-500 dark:bg-blue-700 btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={handleSearch}
      >
        查询
      </button>
      {error && <p className="text-red-500 text-xs italic mt-2">{error}</p>}
      {userData && (
        <div className="mt-6">
          <div className="font-bold text-lg mb-2 dark:text-white">{userData.key}</div>
          <div className="bg-white dark:bg-gray-700 shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <span className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">状态:</span>
              <span className="block text-gray-700 dark:text-gray-300 text-sm">{userData.status === 1 ? '已启用' : '未启用'}</span>
            </div>
            <div className="mb-4">
              <span className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">已用额度:</span>
              <span className="block text-gray-700 dark:text-gray-300 text-sm">{formatQuota(userData.used_quota)}</span>
            </div>
            <div className="mb-4">
              <span className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">剩余额度:</span>
              <span className="block text-gray-700 dark:text-gray-300 text-sm">{formatQuota(userData.remain_quota)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}