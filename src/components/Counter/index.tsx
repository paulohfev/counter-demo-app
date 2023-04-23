import React, { useEffect, useState } from 'react';
import Button from '../Button';
import './Counter.css';

type Props = {
  initialCount: number;
};

const Counter: React.FC<Props> = ({ initialCount }) => {
  const [count, setCount] = useState(initialCount);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (hasError) {
      setTimeout(() => {
        setHasError(false);
      }, 1200);
    }
  }, [hasError]);

  const increment = () => setCount((prev) => prev + 1);

  const decrement = () => setCount((prev) => prev -1);

  const restart = () => setCount(0);

  const switchSigns = () => {
    if (count === 0) {
      setHasError(true);
    } else {
      setCount((prev) => prev * -1);
      setHasError(false);
    }
  };

  return (
    <div className="container">

      {hasError && <span data-testid="error" className="warning">You cannot change 0 into a negative value</span>}

      <h1 className="count-header">
        Count: <span data-testid="count" className="count-value">{count}</span>
      </h1>

      <div className="buttons-list">
        <Button onClick={() => increment()} text="Increment" />
        <Button onClick={() => decrement()} text="Decrement" />
        <Button onClick={() => restart()} text="Restart" />
        <Button onClick={() => switchSigns()} text="Switch Signs" />
      </div>
    </div>
  );
};

export default Counter;
