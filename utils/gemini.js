import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function analyzeResume(resumeData) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("Missing Gemini API key");
  }

  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

  const prompt = `Analysez ces données de CV et fournissez des commentaires sur :

Les forces et faiblesses globales
Les suggestions d'optimisation pour les systèmes de suivi des candidatures (ATS)
Les recommandations d'amélioration du contenu
Données du CV :
  ${JSON.stringify(resumeData, null, 2)}`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error analyzing resume:", error);
    return "Error analyzing resume. Please try again.";
  }
}

export async function getSuggestions(section, currentContent) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("Missing Gemini API key");
  }

  if (!currentContent || currentContent.trim() === '') {
    return "Please write something first to get suggestions for improvement.";
  }

  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

  const prompt = `Vous êtes un assistant sympathique pour la rédaction de CV. Examinez le contenu de cette ${section} et proposez deux versions légèrement améliorées.
Conservez le même sens et les mêmes informations, mais améliorez la fluidité. Utilisez un langage naturel et conversationnel - pas de jargon complexe.
Faites en sorte que cela semble écrit par une vraie personne.

Directives importantes :

Conservez les mêmes points clés et réalisations
Utilisez un langage simple et clair
Faites en sorte que cela semble naturel et conversationnel
Conservez une longueur similaire
N'ajoutez pas de nouvelles informations
Contenu actuel :
${currentContent}

Formatez votre réponse comme suit :
Option 1 :
[première amélioration naturelle]

Option 2 :
[seconde amélioration naturelle]

`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error getting suggestions:", error);
    return "Error generating suggestions. Please try again.";
  }
} 