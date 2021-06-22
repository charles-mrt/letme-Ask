import { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLElement>;

export function Button(props: ButtonProps) {
   return(
      <button className="button" {...props} />
   )
}