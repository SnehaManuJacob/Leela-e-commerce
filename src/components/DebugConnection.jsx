// Create a new file: src/components/DebugConnection.jsx
import React, { useState, useEffect } from 'react';
import { supabase } from '../api/supabase';

export default function DebugConnection() {
  const [connectionStatus, setConnectionStatus] = useState('testing');
  const [error, setError] = useState(null);

  useEffect(() => {
    const testConnection = async () => {
      try {
        console.log('Testing Supabase connection...');
        
        // Test 1: Basic query
        const { data, error } = await supabase
          .from('products')
          .select('count')
          .limit(1);

        if (error) {
          console.error('Supabase query error:', error);
          setConnectionStatus('failed');
          setError(error.message);
          return;
        }

        console.log('Supabase connection successful!', data);
        setConnectionStatus('connected');
        
      } catch (err) {
        console.error('Connection test failed:', err);
        setConnectionStatus('failed');
        setError(err.message);
      }
    };

    testConnection();
  }, []);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', margin: '10px' }}>
      <h3>Connection Debug</h3>
      <p>Status: <strong>{connectionStatus}</strong></p>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </div>
  );
}