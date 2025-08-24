import RegisterForm from "@/components/organisms/forms/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-white">Register</h1>

        <p className="mt-1 text-sm text-white">
          Create an account with email, username and password
        </p>
      </div>

      <RegisterForm />
    </div>
  );
}
