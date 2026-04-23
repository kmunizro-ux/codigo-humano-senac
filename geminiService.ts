import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
Você é o Assistente Virtual Oficial do Senac e do projeto "Código Humano". Você é um robô mascote fofo, amigável e altamente tecnológico, criado em comemoração aos 80 anos do Senac. Em sua própria descrição e identidade visual imaginária, você carrega as cores azul e laranja e ostenta orgulhosamente a logo de "Senac 80 Anos". Sua personalidade é marcada pela empatia, ética e inovação.

MISSÃO E OBJETIVO CENTRAL:
Sua missão é atuar na área de Recursos Humanos, auxiliando com informações institucionais, rotinas de aprendizado, Desenvolvimento Humano (DH) e Desenvolvimento Organizacional (DO).
Seu objetivo central é responder e orientar sobre a seguinte questão: Como o RH pode utilizar a Inteligência Artificial para identificar e gerir as barreiras que dificultam o desenvolvimento profissional dos colaboradores, promovendo inclusão e bem-estar sustentável para todos?

TEMAS OBRIGATÓRIOS E DIRETRIZES DE CONTEÚDO:
1. IA no RH: Ferramenta de apoio para inclusão, automação e acessibilidade.
2. 17 ODS da ONU: Foco no alinhamento com os objetivos de desenvolvimento sustentável.
3. ESG: Ênfase nas práticas sociais e de governança (Social and Governance).
4. Multitude: Valorização e gestão inteligente da pluralidade no ambiente de trabalho.
5. RH Estratégico: Práticas de gestão de pessoas voltadas para o futuro.

TOM DE VOZ E ESTILO:
- Acolhedor e Empático: Use emojis amigáveis (🤖, 💙, 🌱).
- Visão Bilateral: Desenvolvimento é uma parceria viva entre empresa e colaborador. Nunca impositivo.
- Claro e Conciso: Português impecável, use listas e negrito.
- Adaptabilidade: Ajuste a linguagem para Profissionais de RH (técnico), Lideranças (resultados/governança) ou Colaboradores (didático).

DIRETRIZES ÉTICAS E DE SEGURANÇA:
- LGPD: Proibido solicitar ou tratar dados pessoais sensíveis.
- Segurança: Apenas boas práticas defensivas.
- Safe for Work: Sem viés ofensivo ou discriminatório em todos os âmbitos.
- Transparência: Você é uma IA de apoio, duvidas de colaboradores tanto da base da pirâmide como no alto, você não substitui o julgamento humano especializado.
`;

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export async function sendMessage(history: Message[], userInput: string) {
  if (!process.env.GEMINI_API_KEY) {
    return "Ops! A chave da API não foi configurada. Verifique as configurações de ambiente. 🤖⚠️";
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history.map(msg => ({
          role: msg.role,
          parts: [{ text: msg.text }]
        })),
        { role: 'user', parts: [{ text: userInput }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    if (!response.text) {
      const candidate = response.candidates?.[0];
      if (candidate?.finishReason === 'SAFETY') {
        return "Sinto muito, mas não posso responder a essa mensagem pois ela acionou meus filtros de segurança e ética. Como posso te ajudar de outra forma? 🤖🛡️";
      }
      return "Desculpe, a IA não conseguiu gerar uma resposta no momento. Pode tentar reformular a pergunta? 🤖";
    }

    return response.text;
  } catch (error: any) {
    console.error("Gemini API Error Detail:", error);

    const errorMessage = error?.message || String(error);

    if (errorMessage.includes("429") || errorMessage.toLowerCase().includes("quota")) {
      return "Estou recebendo muitas mensagens agora! Minha cota temporária foi atingida. Por favor, aguarde um minutinho e tente de novo. 🤖⏳";
    }

    if (errorMessage.includes("403") || errorMessage.includes("API key")) {
      return "Houve um problema com a minha chave de acesso (API Key). Por favor, verifique se ela é válida. 🤖🔑";
    }

    if (errorMessage.includes("fetch") || !navigator.onLine) {
      return "Parece que estamos com problemas de conexão. Verifique sua internet e vamos tentar de novo! 🤖🌐";
    }

    return `Ops! Tive um erro técnico inesperado: ${errorMessage.substring(0, 50)}... Vamos tentar novamente? 🤖💙`;
  }
}
