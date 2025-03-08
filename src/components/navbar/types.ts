
import { ReactNode } from 'react';

export interface LinkItemProps {
  name: string;
  path: string;
  icon?: ReactNode;
}

export interface UserProps {
  id: string;
  name: string;
  role: 'admin' | 'user';
}
