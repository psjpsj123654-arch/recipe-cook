export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "POST 요청만 허용됩니다." });
  }

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: "OpenAI API 키가 없습니다. Vercel의 OPENAI_API_KEY 환경변수를 확인해주세요.",
    });
  }

  const {
    ingredients = [],
    seasonings = [],
    cookTime = "30분 이내",
    difficulty = "아무거나",
  } = req.body || {};

  if (!Array.isArray(ingredients) || ingredients.length === 0) {
    return res.status(400).json({ error: "재료를 최소 1개 이상 입력해주세요." });
  }

  const safeIngredients = ingredients
    .filter((item) => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 20);

  const safeSeasonings = Array.isArray(seasonings)
    ? seasonings
        .filter((item) => typeof item === "string")
        .map((item) => item.trim())
        .filter(Boolean)
        .slice(0, 20)
    : [];

  const prompt = `
당신은 한국 가정요리 전문가입니다. 모든 결과는 한국어로 작성하세요.

각 요청은 이전 요청과 완전히 독립적입니다.
이전 입력 재료, 이전 추천 결과, 이전 대화는 절대 참고하지 마세요.
오직 아래의 현재 입력값만 사용하세요.

[현재 입력값]
보유 재료: ${safeIngredients.join(", ")}
기본 양념: ${
    safeSeasonings.length > 0
      ? safeSeasonings.join(", ")
      : "소금, 후추, 식용유"
  }
조리 시간 제한: ${String(cookTime).slice(0, 30)}
난이도 선호: ${String(difficulty).slice(0, 30)}

[추천 원칙]
- 실제로 널리 알려져 있고 사람들이 실제로 먹는 요리만 추천합니다.
- 입력 재료를 억지로 결합한 창작 요리는 추천하지 않습니다.
- 현재 입력 재료와 관련성이 낮은 요리는 제외합니다.
- 가장 적합한 요리를 최대 5개 추천합니다.
- 적합한 요리가 5개보다 적으면 억지로 개수를 채우지 않습니다.
- 추천 요리끼리 이름과 조리 방식이 지나치게 겹치지 않게 합니다.
- 없는 재료는 missingIngredients와 shoppingList에만 표시합니다.
- 조리 단계는 요리당 4~5개로 간결하게 작성하되, 필요한 시간과 불 세기를 포함합니다.
- matchPercent는 보유 재료와 기본 양념을 기준으로 현실적으로 계산합니다.
`;

  const recipeSchema = {
    name: "recipe_recommendations",
    strict: true,
    schema: {
      type: "object",
      additionalProperties: false,
      properties: {
        recipes: {
          type: "array",
          maxItems: 3,
          items: {
            type: "object",
            additionalProperties: false,
            properties: {
              name: { type: "string" },
              description: { type: "string" },
              cuisine: {
                type: "string",
                enum: ["한식", "중식", "일식", "양식", "기타"],
              },
              time: { type: "string" },
              difficulty: {
                type: "string",
                enum: ["쉬움", "보통", "어려움"],
              },
              matchPercent: {
                type: "integer",
                minimum: 0,
                maximum: 100,
              },
              availableIngredients: {
                type: "array",
                items: { type: "string" },
              },
              missingIngredients: {
                type: "array",
                items: { type: "string" },
              },
              substitutes: {
                type: "array",
                items: { type: "string" },
              },
              steps: {
                type: "array",
                minItems: 4,
                maxItems: 5,
                items: { type: "string" },
              },
              shoppingList: {
                type: "array",
                items: { type: "string" },
              },
            },
            required: [
              "name",
              "description",
              "cuisine",
              "time",
              "difficulty",
              "matchPercent",
              "availableIngredients",
              "missingIngredients",
              "substitutes",
              "steps",
              "shoppingList",
            ],
          },
        },
      },
      required: ["recipes"],
    },
  };

  try {
    const openAIResponse = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4.1-mini",
          messages: [
            {
              role: "system",
              content:
                "사용자의 현재 재료만 기준으로 실제 존재하는 요리를 추천하는 한국어 요리 전문가입니다.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.3,
          max_completion_tokens: 2000,
          response_format: {
            type: "json_schema",
            json_schema: recipeSchema,
          },
        }),
      }
    );

    const data = await openAIResponse.json().catch(() => ({}));

    if (!openAIResponse.ok) {
      const apiMessage =
        data?.error?.message || "OpenAI API 요청에 실패했습니다.";

      if (openAIResponse.status === 401) {
        return res.status(401).json({
          error: "OpenAI API 키가 올바르지 않습니다.",
        });
      }

      if (openAIResponse.status === 429) {
        return res.status(429).json({
          error:
            "OpenAI API 사용 한도 또는 결제 한도를 초과했습니다. OpenAI 결제 설정과 사용량을 확인해주세요.",
        });
      }

      return res.status(openAIResponse.status).json({
        error: apiMessage,
      });
    }

    const content = data?.choices?.[0]?.message?.content;

    if (!content) {
      return res.status(502).json({
        error: "OpenAI 응답이 비어 있습니다.",
      });
    }

    const parsed = JSON.parse(content);

    if (!Array.isArray(parsed.recipes)) {
      return res.status(502).json({
        error: "추천 결과 형식이 올바르지 않습니다.",
      });
    }

    return res.status(200).json({ recipes: parsed.recipes });
  } catch (error) {
    console.error("Recipe API error:", error);

    return res.status(500).json({
      error: "요리 추천 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
    });
  }
}
