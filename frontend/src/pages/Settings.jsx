const Settings = () => {
  return (
    <div className="space-y-6">
      
      <h1 className="text-3xl font-bold">
        Settings
      </h1>

      {/* API STATUS */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
        <h2 className="text-xl font-semibold mb-5">
          Integrations
        </h2>

        <div className="space-y-4">
          
          <div className="flex items-center justify-between bg-slate-950 p-4 rounded-2xl">
            <div>
              <h3 className="font-medium">
                WhatsApp API
              </h3>

              <p className="text-sm text-slate-400">
                Connected webhook
              </p>
            </div>

            <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full">
              Connected
            </span>
          </div>

          <div className="flex items-center justify-between bg-slate-950 p-4 rounded-2xl">
            <div>
              <h3 className="font-medium">
                AI Assistant
              </h3>

              <p className="text-sm text-slate-400">
                OpenAI / Gemini
              </p>
            </div>

            <span className="bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-full">
              Testing
            </span>
          </div>

        </div>
      </div>

      {/* SYSTEM INFO */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
        <h2 className="text-xl font-semibold mb-5">
          System Status
        </h2>

        <div className="grid grid-cols-3 gap-5">

          <div className="bg-slate-950 rounded-2xl p-5">
            <p className="text-slate-400">
              Webhook
            </p>

            <h3 className="text-green-400 mt-2">
              Active
            </h3>
          </div>

          <div className="bg-slate-950 rounded-2xl p-5">
            <p className="text-slate-400">
              Database
            </p>

            <h3 className="text-green-400 mt-2">
              Connected
            </h3>
          </div>

          <div className="bg-slate-950 rounded-2xl p-5">
            <p className="text-slate-400">
              AI Service
            </p>

            <h3 className="text-yellow-400 mt-2">
              Limited
            </h3>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Settings;