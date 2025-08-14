import { FaCheck, FaSearch, FaUserCircle } from "react-icons/fa";
import Sidebar from "../../components/Sidebar";

export default function PricingPage() {
  const plans = [
    {
      key: "personal",
      name: "Personal",
      price: 0,
      priceNote: "/free",
      description: "Perfect plan for starters.",
      highlighted: false,
      features: [
        "2 Social Media Accounts.",
        "Share with 3 team members.",
        "Sync across devices.",
      ],
      cta: "Current Plan",
      disabled: true,
    },
    {
      key: "professional",
      name: "Professional",
      price: 99,
      priceNote: "/month",
      description: "For users who want to do more.",
      highlighted: false,
      features: [
        "10 Social Media Accounts.",
        "Share with 10 team members.",
        "Sync across devices.",
      ],
      cta: "Choose",
      disabled: false,
    },
    {
      key: "team",
      name: "Team",
      price: 299,
      priceNote: "/month",
      description: "Team collaboration at top notch.",
      highlighted: true,
      features: [
        "Unlimited Social Media Accounts.",
        "Unlimited team members.",
        "Admin tools.",
      ],
      cta: "Choose",
      disabled: false,
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#f9fafe]">
      <Sidebar />
      <main className="flex-1 p-4 sm:p-6 md:p-8 ml-0 lg:ml-64">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <h1 className="text-2xl font-bold">Settings</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="pl-8 pr-3 py-1.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-100 text-sm bg-white"
              />
              <FaSearch className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            </div>
            <button className="bg-white p-2 rounded-full border border-gray-200 hover:bg-indigo-50">
              <FaUserCircle className="text-2xl text-gray-500" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl p-0 shadow-sm overflow-hidden">
          <div className="border-b px-4 sm:px-6">
            <div className="flex items-center gap-6 overflow-x-auto text-sm">
              <button className="py-3 border-b-2 border-transparent text-gray-600 hover:text-indigo-700 whitespace-nowrap">Personal Details</button>
              <button className="py-3 border-b-2 border-transparent text-gray-600 hover:text-indigo-700 whitespace-nowrap">Team Space</button>
              <button className="py-3 border-b-2 border-transparent text-gray-600 hover:text-indigo-700 whitespace-nowrap">Members</button>
              <button className="py-3 border-b-2 border-indigo-600 text-indigo-700 font-semibold whitespace-nowrap">Plan & Pricing</button>
              <button className="py-3 border-b-2 border-transparent text-gray-600 hover:text-indigo-700 whitespace-nowrap">Integrations</button>
              <button className="py-3 border-b-2 border-transparent text-gray-600 hover:text-indigo-700 whitespace-nowrap">Security</button>
            </div>
          </div>

          {/* Pricing Section */}
          <div className="p-4 sm:p-6">
            <div className="mb-6">
              <div className="text-lg font-semibold">Plan & Pricing</div>
              <p className="text-sm text-gray-600">Well suited pricing plans with advanced features for your business.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <div
                  key={plan.key}
                  className={`${
                    plan.highlighted ? "bg-indigo-700 text-white" : "bg-white"
                  } rounded-xl p-6 shadow relative`}
                >
                  {/* Icon placeholder */}
                  <div className={`${plan.highlighted ? "bg-indigo-600" : "bg-indigo-50"} w-10 h-10 rounded-lg mb-4`}></div>
                  <div className="text-2xl font-bold mb-1">{plan.name}</div>
                  <div className={`${plan.highlighted ? "text-indigo-100" : "text-gray-500"} text-sm mb-6`}>{plan.description}</div>

                  <div className="flex items-end gap-1 mb-6">
                    <div className="text-5xl font-extrabold">{plan.price === 0 ? "$ 0" : `$ ${plan.price}`}</div>
                    <div className={`${plan.highlighted ? "text-indigo-100" : "text-gray-500"}`}>{plan.priceNote}</div>
                  </div>

                  {/* Divider */}
                  <div className={`${plan.highlighted ? "border-indigo-600" : "border-gray-200"} border-t my-6`}></div>

                  <ul className="space-y-3 mb-6">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span
                          className={`${
                            plan.highlighted ? "bg-white text-indigo-700" : "bg-indigo-100 text-indigo-700"
                          } inline-flex w-5 h-5 items-center justify-center rounded-full mt-0.5`}
                        >
                          <FaCheck />
                        </span>
                        <span className={`${plan.highlighted ? "text-white" : "text-gray-700"}`}>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`${
                      plan.highlighted
                        ? "w-full bg-white text-indigo-700 font-semibold py-2 rounded-lg hover:bg-indigo-50"
                        : plan.disabled
                        ? "w-full bg-gray-100 text-gray-500 font-semibold py-2 rounded-lg cursor-not-allowed"
                        : "w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700"
                    }`}
                    disabled={plan.disabled}
                  >
                    {plan.cta}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
