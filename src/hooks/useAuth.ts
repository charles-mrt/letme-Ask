import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

/*
   function works like a hook 
   returning context
*/
export function useAuth() {
   
   const value = useContext(AuthContext);
   
   return value;
}