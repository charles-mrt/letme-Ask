import { ButtonHTMLAttributes } from 'react';
import './styles.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLElement> & {
   isOutlined?: boolean;
};

export function Button({ isOutlined = false, ...props }: ButtonProps) {
   return (

      <button 
         className={`button ${isOutlined ? 'outlined' : ''}`}
         {...props}
      />

   )
}