'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import RevenueCharts from '@/components/coach/RevenueCharts';

export default function CoachAnalyticsPage() {
  const [activeTab, setActiveTab] = useState<'graphiques' | 'calendrier'>('graphiques');

  return (
    <div className="px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link href="/dashboard">
          <button className="p-2 bg-[#2a2a2a] border border-[#FF7A00]/20 rounded hover:border-[#FF7A00] transition">
            <ArrowLeft className="w-5 h-5 text-[#FF7A00]" />
          </button>
        </Link>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1 h-5 bg-[#FF7A00]" />
            <span className="font-display-md text-xs text-[#FF7A00] tracking-[0.2em]">ANALYTICS & REVENUS</span>
          </div>
          <h1 className="font-display text-4xl text-white">ANALYTICS & REVENUS</h1>
          <p className="text-[#555] text-sm mt-1">Visualisez vos performances en détail</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('graphiques')}
          className={`px-6 py-3 rounded-lg font-display text-sm transition-all ${
            activeTab === 'graphiques'
              ? 'bg-[#FF7A00] text-black'
              : 'bg-[#2a2a2a] border border-[#FF7A00]/20 text-[#555] hover:border-[#FF7A00] hover:text-white'
          }`}
        >
          GRAPHIQUES
        </button>
        <button
          onClick={() => setActiveTab('calendrier')}
          className={`px-6 py-3 rounded-lg font-display text-sm transition-all ${
            activeTab === 'calendrier'
              ? 'bg-[#FF7A00] text-black'
              : 'bg-[#2a2a2a] border border-[#FF7A00]/20 text-[#555] hover:border-[#FF7A00] hover:text-white'
          }`}
        >
          CALENDRIER
        </button>
      </div>

      {/* Contenu */}
      {activeTab === 'graphiques' && <RevenueCharts />}
      {activeTab === 'calendrier' && (
        <div className="bg-[#2a2a2a] border border-[#FF7A00]/20 rounded-lg p-6">
          <h3 className="font-display text-xl mb-4">CALENDRIER DES REVENUS</h3>
          <p className="text-[#555]">Calendrier interactif — À implémenter</p>
        </div>
      )}
    </div>
  );
}
