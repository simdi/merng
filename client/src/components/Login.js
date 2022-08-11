import React, { useEffect, useState } from 'react';

const Login = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log('Login');
  });

  return (
    <div>
      <button onClick={() => setCount(count+1)}>Click {count}</button>
    </div>
  );
};

export default Login;