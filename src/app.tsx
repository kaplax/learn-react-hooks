import * as React from 'react';

export const App = () => {
  return <div><Example /></div>
}


const Example = () => {
  // const [count, setCount] = useCounter(0);
  const [count, setCount]  = React.useState(0);
  React.useEffect(() => {
    document.title = `You clicked ${count} times`;
    // setInterval(() => {
    //   console.log(count + 1);
    //   setCount(count + 1);
    // }, 100);
  }, [])
  const [isOnline, setIsOnline] = useFriendStatus();
  // console.log(isOnline)
  // const double = React.useMemo(() => {
  //   return count * 2;
  // }, [count === 3]);
  // const onClickHandle = React.useCallback(() => {
  //   console.log(count);
  // }, []);
  // const onClickHandle = () => {
  //   setCount
  // }
  return (
    <div>
      <p>You clicked {count} times</p>
      {/* <button onClick={() => setCount(count + 1)}> 
        Click me
      </button> */}
      {/* <button onClick={onClickHandle}>click me</button> */}
      {/* <p>double count: {double}</p> */}
      <p>is online: {isOnline ? 'true' : 'false'}</p>
      <button onClick={() => setIsOnline(!isOnline)}>change the statue</button>
    </div>
  );
}

interface CounterProps {
  count: number;
}
const Counter: React.FC<CounterProps> = (props) => {
  return (
    <div>{props.count}</div>
  )
}

function useFriendStatus(): [boolean, (statue: boolean) => void] {
  const [isOnline, setIsOnline] = React.useState(false);
  // const handleStatusChange = (status: boolean) => {
  //   console.log('handleStatusChange...');
  //   setIsOnline(status);
  // }
  return [isOnline, setIsOnline];
}

const useCounter = (defaultCount: number): [count: number, setCount: (count: number) => void] => {
  const [count, setCount] = React.useState(defaultCount);
  const timer = React.useRef<number>();
  React.useEffect(() => {
    timer.current = setInterval(() => {
      setCount(count => count + 1);
    }, 200)
  }, []);
  React.useEffect(() => {
    if (count >= 10) {
      clearInterval(timer.current)
    }
  })
  return [count, setCount];
}