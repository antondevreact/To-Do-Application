import { RegistrationForm } from "@/src/components/RegistrationForm";

const RegistrationPage = () => {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-[40px] border-primary">
      <h1 className="text-2xl font-bold text-center mb-6">Registration</h1>
      <RegistrationForm />
    </div>
  );
};

export default RegistrationPage;
