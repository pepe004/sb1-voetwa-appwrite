import AuthForm from '@/components/AuthForm';

export default function LoginPage() {
  return (
    <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-screen">
      <AuthForm isLogin={true} />
    </div>
  );
}