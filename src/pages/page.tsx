// pages/search-key.tsx
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
      const response = await fetch('https://api.v3.cm/api/token/?p=0', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Cookie': 'Hm_lvt_3fab922b8863ef4637306477eef76397=1700490958,1700798757; session=MTcwMjAyMjU1MHxEWDhFQVFMX2dBQUJFQUVRQUFCd180QUFCQVp6ZEhKcGJtY01DQUFHYzNSaGRIVnpBMmx1ZEFRQ0FBSUdjM1J5YVc1bkRBUUFBbWxrQTJsdWRBUUVBUDREMEFaemRISnBibWNNQ2dBSWRYTmxjbTVoYldVR2MzUnlhVzVuREFrQUIxVnlZVzVwZFcwR2MzUnlhVzVuREFZQUJISnZiR1VEYVc1MEJBSUFBZz09fGWIgSKcCTGSFMQ8h5neaBb1XWjdTgD5HmPbRqrsvD3p'
        },
      });
      const json = await response.json();
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
    } catch (err:any) {
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