import { AuthorizationForm } from "@/src/components/AuthorizationForm";

const AuthorizationPage = () => {
  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow-md rounded-[40px] border-primary border">
      <h1 className="text-2xl font-bold text-center mb-6">Authorization</h1>
      <AuthorizationForm />
    </div>
  );
};

export default AuthorizationPage;
