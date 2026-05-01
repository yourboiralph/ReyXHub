"use client";

import { useState } from "react";
import { Copy, Check, Code2 } from "lucide-react";

const scripts = [
  {
    name: "FarmPet Script",
    description: "Auto farm pets with configurable settings",
    language: "lua",
    code: `getgenv().HiraXRey = {

    --= API KEY =--
    ApiKey = "",  -- key here
    SyncStats = true,
    DeviceName = "DEVICE1",

    --= Farm Mode =--
    PetFarm = true,
    EventFarm = false,
    AutoChisel = false,
    PrioritizePet = "2D Kitty",

    --= PetPen =--
    PetPen = true,
    PetPenPriority = {"Black-Footed Ferret", "Pangolin"},

    --= Auto Fuse =--
    FusePets = true,

    --= Lure Bait =--
    LureBait = "ice_dimension_2025_ice_soup_bait",

    --= Performance =--
    RemoveAllUI = true,
    StatsTimer = 1, -- How long each resets
}
loadstring(game:HttpGet('https://raw.githubusercontent.com'))()`,
  },
  // Add more scripts here
];

function ScriptCard({ script }: { script: typeof scripts[0] }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(script.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-50 p-2 rounded-lg">
            <Code2 className="w-4 h-4 text-indigo-600" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-800">{script.name}</h3>
            <p className="text-xs text-gray-500">{script.description}</p>
          </div>
        </div>
        <button
          onClick={handleCopy}
          className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-all ${
            copied
              ? "bg-green-100 text-green-600"
              : "bg-gray-100 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
          }`}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              Copy
            </>
          )}
        </button>
      </div>

      {/* Code Block */}
      <div className="bg-gray-50 overflow-x-auto">
        <pre className="text-xs text-gray-700 p-5 leading-relaxed font-mono whitespace-pre">
          {script.code}
        </pre>
      </div>

      {/* Footer */}
      <div className="px-5 py-2.5 border-t border-gray-100 bg-white">
        <span className="text-xs text-gray-400 font-mono uppercase tracking-wide">
          {script.language}
        </span>
      </div>
    </div>
  );
}

export default function ScriptsSection() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Scripts</h2>
          <p className="text-gray-500">Copy and use the scripts below</p>
        </div>

        <div className="flex flex-col gap-6">
          {scripts.map((script) => (
            <ScriptCard key={script.name} script={script} />
          ))}
        </div>
      </div>
    </div>
  );
}