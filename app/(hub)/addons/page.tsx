import Dashboard from "@/components/dashboard/dashboard";
import WelcomeMsg from "@/components/dashboard/welcome-msg";
import { getSession, logoutEmail } from "@/lib/actions/auth-actions";
import { redirect } from "next/navigation";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "",
    description: "Get started with basic access",
    features: ["1 account", "1 day access", "Basic support"],
    buttonText: "Get Started",
    highlighted: false,
  },
  {
    name: "Starter",
    price: "$5",
    period: "",
    description: "Perfect for small teams",
    features: ["100 accounts", "1 month access", "Priority support"],
    buttonText: "Subscribe",
    highlighted: true,
  },
  {
    name: "Pro",
    price: "$10",
    period: "",
    description: "For growing businesses",
    features: ["250 accounts", "1 month access", "Priority support"],
    buttonText: "Subscribe",
    highlighted: false,
  },
];

export default async function Hub() {
  const session = await getSession();
  if (!session) {
    logoutEmail();
    redirect("/login");
  }

  return (
    <div className="min-h-screen py-12 px-4">

      <div className="max-w-5xl mx-auto mt-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Choose Your Plan</h2>
          <p className="text-gray-500">Select the plan that fits your needs</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-6 flex flex-col ${
                plan.highlighted
                  ? "bg-gradient-to-b from-indigo-600 to-indigo-700 ring-2 ring-indigo-500 shadow-xl shadow-indigo-500/20"
                  : "bg-white border border-gray-200 shadow-sm"
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Popular
                </span>
              )}

              <div className="mb-6">
                <h3 className={`text-lg font-semibold ${plan.highlighted ? "text-white" : "text-gray-800"}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm mt-1 ${plan.highlighted ? "text-indigo-200" : "text-gray-500"}`}>
                  {plan.description}
                </p>
              </div>

              <div className="mb-6">
                <span className={`text-4xl font-bold ${plan.highlighted ? "text-white" : "text-gray-900"}`}>
                  {plan.price}
                </span>
                <span className={`text-sm ${plan.highlighted ? "text-indigo-200" : "text-gray-500"}`}>
                  {plan.period}
                </span>
              </div>

              <ul className="space-y-3 mb-8 flex-grow">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check
                      className={`w-4 h-4 flex-shrink-0 ${
                        plan.highlighted ? "text-indigo-200" : "text-indigo-500"
                      }`}
                    />
                    <span className={`text-sm ${plan.highlighted ? "text-indigo-100" : "text-gray-600"}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-2.5 px-4 rounded-lg font-medium transition-all ${
                  plan.highlighted
                    ? "bg-white text-indigo-600 hover:bg-gray-100"
                    : "bg-indigo-600 text-white hover:bg-indigo-500"
                }`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}