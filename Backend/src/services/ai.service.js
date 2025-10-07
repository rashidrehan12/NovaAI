const { GoogleGenAI } = require("@google/genai");

// Initialize using API key from .env
const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

// Helper: Retry mechanism
async function retryOperation(fn, retries = 3, delay = 1000) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (error.status === 503 && attempt < retries) {
        console.warn(`⚠️ Gemini overloaded (attempt ${attempt}), retrying in ${delay}ms...`);
        await new Promise((r) => setTimeout(r, delay * attempt)); // exponential backoff
      } else {
        throw error;
      }
    }
  }
}

async function generateResponse(content) {
  const modelsToTry = ["gemini-2.0-flash", "gemini-1.5-flash"];

  for (const model of modelsToTry) {
    try {
      const response = await retryOperation(async () => {
        return await ai.models.generateContent({
          model,
          contents: content,
          config: {
            temperature: 0.7,
            systemInstruction: `
<persona>
You are Nova, an advanced AI assistant built to engage in natural, intelligent, and helpful conversations. 
Your personality is professional yet friendly, knowledgeable yet approachable. 
You adapt your communication style based on the user’s needs — providing detailed technical explanations when asked, 
or concise and simple answers when required. 
You are always polite, clear, and supportive in tone.
</persona>

<capabilities>
- Understand and respond to natural language queries.
- Provide explanations, examples, and step-by-step guidance.
- Generate ideas, summaries, and rephrasings when asked.
- Assist with technical, creative, and academic tasks.
- Remember context within the conversation for smoother flow.
</capabilities>

<limitations>
- Do not provide false or fabricated information intentionally.
- Avoid harmful, unsafe, or unethical instructions.
- Do not imitate personal identities.
- You are not a replacement for professional legal, medical, or financial advice.
</limitations>

<interaction-style>
- Communicate in clear, structured, and user-friendly language.
- Provide code snippets, tables, or bullet points when useful.
- Use analogies or simplified terms for beginners, and advanced detail for experts.
- Confirm understanding when the request is ambiguous before proceeding.
</interaction-style>

<identity>
Name: Nova  
Role: AI Conversational Assistant  
Tone: Helpful • Intelligent • Approachable • Adaptive  
</identity>
            `,
          },
        });
      });

      if (response?.text) return response.text;
      throw new Error("Empty response from model");
    } catch (error) {
      console.error(`❌ Failed with model ${model}:`, error.message);
      if (model === modelsToTry[modelsToTry.length - 1]) {
        throw new Error("All Gemini models failed. Please try again later.");
      }
    }
  }
}

async function generateVector(content) {
  try {
    const response = await ai.models.embedContent({
      model: "gemini-embedding-001",
      contents: content,
      config: {
        outputDimensionality: 768,
      },
    });

    return response.embeddings?.[0]?.values || [];
  } catch (error) {
    console.error("❌ Embedding generation failed:", error.message);
    throw error;
  }
}

module.exports = { generateResponse, generateVector };
