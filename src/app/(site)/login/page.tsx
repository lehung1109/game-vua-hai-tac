import LoginForm from "@/components/organisms/forms/LoginForm";

export default function LoginPage() {
  return (
    <div className="w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-white">Login</h1>

        <p className="mt-1 text-sm text-white">
          Enter your email and password to continue
        </p>
      </div>

      <LoginForm />
    </div>
  );
}
