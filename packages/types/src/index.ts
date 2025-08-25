export interface User {
  id: number;
  email: string;
  name?: string;
  role: 'Admin' | 'Editor' | 'Contributor';
}
