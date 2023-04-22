import React from 'react';
import './Button.css';

type Props = {
  onClick: () => void;
  text: string;
}

const Button: React.FC<Props> = ({ onClick, text }) => {
  return <button className="button" onClick={onClick}>{text}</button>;
}

export default Button;
