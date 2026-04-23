/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Header } from './components/Header';
import { ChatInterface } from './components/ChatInterface';
import { Bot, Leaf, Users, BarChart3, Shield } from 'lucide-react';

export default function App() {
  return (
    <div className="flex h-screen w-full overflow-hidden font-sans selection:bg-[#F37021]/30">
      {/* Sidebar */}
      <aside className="w-72 bg-gradient-to-b from-[#00417B] to-[#002f59] h-full flex flex-col text-white p-6 justify-between shrink-0 shadow-2xl z-20">
        <div className="space-y-8">
          <div className="flex items-center space-x-3">
            <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
              <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full animate-[spin_20s_linear_infinite]">
                <path
                  id="circlePath"
                  d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
                  fill="transparent"
                />
                <text className="fill-white/40 text-[7px] font-bold tracking-[0.2em] uppercase">
                  <textPath href="#circlePath" spacing="auto">Senac • 80 Anos • Código Humano • </textPath>
                </text>
              </svg>
              <div className="w-10 h-10 bg-[#F37021] rounded-full flex items-center justify-center font-black text-[12px] shadow-xl border border-white/30 z-10">
                80
              </div>
            </div>
            <div className="leading-tight">
              <div className="font-bold text-lg">Código Humano</div>
              <div className="text-[10px] uppercase tracking-widest opacity-70 font-semibold">RH Estratégico & IA</div>
            </div>
          </div>
          
          <nav className="space-y-1">
            <div className="p-3 bg-white/10 rounded-xl flex items-center space-x-3 cursor-pointer ring-1 ring-white/20">
              <Bot className="w-4 h-4 text-[#F37021]" />
              <span className="text-sm font-medium">Dashboard Chat</span>
            </div>
            <div className="p-3 hover:bg-white/5 rounded-lg flex items-center space-x-3 cursor-pointer opacity-60 transition-all group">
              <Leaf className="w-4 h-4 group-hover:text-[#F37021]" />
              <span className="text-sm">Sustentabilidade ODS</span>
            </div>
            <div className="p-3 hover:bg-white/5 rounded-lg flex items-center space-x-3 cursor-pointer opacity-60 transition-all group">
              <Users className="w-4 h-4 group-hover:text-[#F37021]" />
              <span className="text-sm">Gestão Multitude</span>
            </div>
            <div className="p-3 hover:bg-white/5 rounded-lg flex items-center space-x-3 cursor-pointer opacity-60 transition-all group">
              <BarChart3 className="w-4 h-4 group-hover:text-[#F37021]" />
              <span className="text-sm">Relatórios ESG</span>
            </div>
          </nav>
        </div>

        <div className="space-y-4 pt-6 border-t border-white/10">
          {/* 3D Status Widget */}
          <div className="bg-white/5 rounded-2xl p-4 border border-white/10 backdrop-blur-sm">
            <div className="text-[9px] uppercase tracking-tighter text-white/40 mb-3 font-black">Status do Sistema 3D</div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[10px]">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full shadow-[0_0_8px_rgba(74,222,128,0.5)]"></span>
                  Conexão IA
                </span>
                <span className="font-bold text-green-400">ATIVO</span>
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <span className="flex items-center gap-2">
                   <span className="w-1.5 h-1.5 bg-blue-400 rounded-full shadow-[0_0_8px_rgba(96,165,250,0.5)] animate-pulse"></span>
                  Processamento
                </span>
                <span className="font-bold text-blue-400">OTIMIZADO</span>
              </div>
            </div>
          </div>

          <div className="text-[10px] text-white/50 flex items-center gap-2">
            <Shield className="w-3 h-3 text-[#F37021]" />
            Conformidade LGPD Ativa
          </div>
          <div className="text-[10px] text-white/50 leading-relaxed font-medium">
            Em comemoração aos 80 anos do Senac, unindo tecnologia e humanidade.
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-full flex flex-col bg-[#f0f7ff] relative overflow-hidden">
        {/* Background Blobs */}
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#00417B]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-[#F37021]/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-[40%] left-[20%] w-[30%] h-[30%] bg-blue-200/20 rounded-full blur-[80px] pointer-events-none" />
        
        <Header />
        <div className="flex-1 overflow-hidden">
          <ChatInterface />
        </div>
      </main>
    </div>
  );
}
