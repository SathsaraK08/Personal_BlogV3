'use client';
import { useAuth } from '../../context/AuthContext';

export default function AdminPage() {
  const { user } = useAuth();
  if (!user) {
    return <div>Please login to access admin dashboard.</div>;
  }
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
    </div>
  );
}
