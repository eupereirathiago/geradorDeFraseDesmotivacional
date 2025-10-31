import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';


const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
const modelName = 'gemini-2.5-flash';

function GeradorDeFrase() {
  const [frase, setFrase] = useState('Clique no botão para gerar uma frase...');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const desmotivacional = async () => {
   
    setLoading(true);
    setFrase('');
    setError(null);

    try {
      // O prompt que você usou:
      const prompt = "Gere somente uma frase curta desmotivacional com um tom sarcástico.";

      // 2. Chama a API do Gemini
      const response = await ai.models.generateContent({
        model: modelName,
        contents: prompt,
      });

      // 3. Atualiza o estado com a resposta
      setFrase(response.text);

    } catch (e) {
      // 4. Trata erros (ex: chave de API inválida, erro de rede)
      console.error("Erro ao gerar conteúdo:", e);
      setError("Falha ao se comunicar com a IA. Verifique sua chave de API ou a rede.");
      setFrase('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Gerador de Frases</h1>
      <button 
        onClick={desmotivacional} 
        disabled={loading}
      >
        {loading ? 'Gerando...' : 'Gerar Frase'}
      </button>

    
      <p style={{ marginTop: '20px', fontWeight: 'bold', color: error ? 'red' : 'lavender' }}>
        {loading && 'Processando...'}
        {error}
        {frase && `${frase}`}
      </p>
    </div>
  );
}

export default GeradorDeFrase;