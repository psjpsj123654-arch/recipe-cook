import { useState } from "react";

const ORANGE = {
  50: "#FFF4ED",
  100: "#FFE4CC",
  200: "#FFC89A",
  300: "#FFA05A",
  400: "#FF7A20",
  500: "#F05A00",
  600: "#C44600",
  700: "#9A3500",
  800: "#6E2500",
  900: "#3E1200",
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Pretendard:wght@400;500;600;700&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Pretendard', -apple-system, sans-serif;
    background: ${ORANGE[50]};
    min-height: 100vh;
    color: #1a1a1a;
  }

  .app {
    max-width: 860px;
    margin: 0 auto;
    padding: 0 1rem 4rem;
  }

  .hero {
    background: linear-gradient(135deg, ${ORANGE[500]} 0%, ${ORANGE[400]} 60%, ${ORANGE[300]} 100%);
    margin: 0 -1rem 2.5rem;
    padding: 2.5rem 2rem 2rem;
    border-radius: 0 0 2rem 2rem;
    color: white;
    text-align: center;
  }

  .hero-icon {
    font-size: 3rem;
    margin-bottom: 0.5rem;
  }

  .hero h1 {
    font-size: 1.9rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    margin-bottom: 0.4rem;
  }

  .hero p {
    font-size: 1rem;
    opacity: 0.88;
    font-weight: 400;
  }

  .section-label {
    font-size: 0.78rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: ${ORANGE[600]};
    margin-bottom: 0.6rem;
  }

  .card {
    background: white;
    border-radius: 1rem;
    padding: 1.25rem;
    margin-bottom: 1rem;
    border: 1.5px solid ${ORANGE[100]};
  }

  .card-title {
    font-size: 1rem;
    font-weight: 600;
    color: ${ORANGE[700]};
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .tag-input-area {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    min-height: 44px;
    padding: 0.5rem;
    border: 1.5px solid ${ORANGE[200]};
    border-radius: 0.7rem;
    background: ${ORANGE[50]};
    cursor: text;
    transition: border-color 0.15s;
  }

  .tag-input-area:focus-within {
    border-color: ${ORANGE[400]};
    background: white;
  }

  .tag {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    background: ${ORANGE[100]};
    color: ${ORANGE[800]};
    border-radius: 2rem;
    padding: 0.2rem 0.6rem;
    font-size: 0.85rem;
    font-weight: 500;
  }

  .tag button {
    background: none;
    border: none;
    color: ${ORANGE[500]};
    cursor: pointer;
    padding: 0;
    font-size: 1rem;
    line-height: 1;
    display: flex;
    align-items: center;
  }

  .tag button:hover { color: ${ORANGE[700]}; }

  .tag-input {
    border: none;
    background: transparent;
    outline: none;
    font-size: 0.9rem;
    flex: 1;
    min-width: 100px;
    color: #1a1a1a;
  }

  .row { display: flex; gap: 0.75rem; flex-wrap: wrap; }

  .select-group { flex: 1; min-width: 140px; }

  select {
    width: 100%;
    padding: 0.6rem 0.9rem;
    border: 1.5px solid ${ORANGE[200]};
    border-radius: 0.7rem;
    background: ${ORANGE[50]};
    font-size: 0.9rem;
    color: #1a1a1a;
    cursor: pointer;
    outline: none;
    transition: border-color 0.15s;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24'%3E%3Cpath fill='%23C44600' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0.75rem center;
    padding-right: 2.2rem;
  }

  select:focus { border-color: ${ORANGE[400]}; background-color: white; }

  .btn-main {
    width: 100%;
    padding: 0.85rem;
    background: linear-gradient(135deg, ${ORANGE[500]}, ${ORANGE[400]});
    color: white;
    border: none;
    border-radius: 0.8rem;
    font-size: 1.05rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    letter-spacing: -0.01em;
    margin-top: 0.5rem;
  }

  .btn-main:hover { transform: translateY(-1px); box-shadow: 0 4px 16px ${ORANGE[300]}; }
  .btn-main:active { transform: translateY(0); }
  .btn-main:disabled { opacity: 0.55; cursor: not-allowed; transform: none; box-shadow: none; }

  .loading {
    text-align: center;
    padding: 3rem 1rem;
    color: ${ORANGE[500]};
  }

  .loading-spinner {
    width: 44px;
    height: 44px;
    border: 4px solid ${ORANGE[100]};
    border-top-color: ${ORANGE[400]};
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin: 0 auto 1rem;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  .results-header {
    font-size: 1.2rem;
    font-weight: 700;
    color: ${ORANGE[700]};
    margin-bottom: 1rem;
  }

  .recipe-card {
    background: white;
    border-radius: 1rem;
    border: 1.5px solid ${ORANGE[100]};
    overflow: hidden;
    margin-bottom: 1rem;
    transition: box-shadow 0.2s;
  }

  .recipe-card:hover { box-shadow: 0 4px 20px ${ORANGE[100]}; }

  .recipe-header {
    padding: 1.1rem 1.25rem 0.75rem;
    cursor: pointer;
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    justify-content: space-between;
  }

  .recipe-header-left { flex: 1; }

  .recipe-name {
    font-size: 1.1rem;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 0.35rem;
  }

  .recipe-desc {
    font-size: 0.88rem;
    color: #666;
    line-height: 1.5;
  }

  .recipe-meta {
    display: flex;
    gap: 0.5rem;
    margin-top: 0.6rem;
    flex-wrap: wrap;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.2rem 0.55rem;
    border-radius: 2rem;
    font-size: 0.78rem;
    font-weight: 600;
  }

  .badge-orange { background: ${ORANGE[100]}; color: ${ORANGE[700]}; }
  .badge-green { background: #e6f4ea; color: #2d7d46; }
  .badge-yellow { background: #fff8e1; color: #9a6c00; }
  .badge-red { background: #fde8e8; color: #c0392b; }

  .match-bar-wrap {
    margin-top: 0.6rem;
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }

  .match-label { font-size: 0.78rem; color: #888; white-space: nowrap; }

  .match-bar {
    flex: 1;
    height: 6px;
    background: ${ORANGE[100]};
    border-radius: 3px;
    overflow: hidden;
  }

  .match-fill {
    height: 100%;
    border-radius: 3px;
    background: linear-gradient(90deg, ${ORANGE[300]}, ${ORANGE[500]});
    transition: width 0.6s ease;
  }

  .match-pct { font-size: 0.82rem; font-weight: 700; color: ${ORANGE[600]}; min-width: 34px; text-align: right; }

  .chevron {
    font-size: 1.2rem;
    color: ${ORANGE[300]};
    transition: transform 0.2s;
    flex-shrink: 0;
    margin-top: 0.1rem;
  }

  .chevron.open { transform: rotate(180deg); }

  .recipe-body {
    padding: 0 1.25rem 1.25rem;
    border-top: 1.5px solid ${ORANGE[50]};
    margin-top: 0.5rem;
  }

  .section-divider {
    margin: 1rem 0 0.6rem;
    font-size: 0.82rem;
    font-weight: 600;
    color: ${ORANGE[600]};
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  .section-divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: ${ORANGE[100]};
  }

  .ingredient-list, .step-list {
    list-style: none;
    padding: 0;
  }

  .ingredient-list li {
    font-size: 0.88rem;
    padding: 0.3rem 0;
    border-bottom: 1px solid ${ORANGE[50]};
    display: flex;
    align-items: center;
    gap: 0.4rem;
    color: #333;
  }

  .ingredient-list li:last-child { border-bottom: none; }

  .ingredient-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: ${ORANGE[300]};
    flex-shrink: 0;
  }

  .missing { color: #c0392b; }
  .missing .ingredient-dot { background: #e74c3c; }

  .step-list li {
    font-size: 0.9rem;
    padding: 0.5rem 0;
    border-bottom: 1px solid ${ORANGE[50]};
    display: flex;
    gap: 0.75rem;
    line-height: 1.55;
    color: #333;
  }

  .step-list li:last-child { border-bottom: none; }

  .step-num {
    width: 22px; height: 22px;
    border-radius: 50%;
    background: ${ORANGE[100]};
    color: ${ORANGE[700]};
    font-size: 0.75rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-top: 0.1rem;
  }

  .sub-chips {
    display: flex; flex-wrap: wrap; gap: 0.35rem; margin-top: 0.4rem;
  }

  .sub-chip {
    background: #fff3cd;
    color: #856404;
    font-size: 0.8rem;
    font-weight: 500;
    padding: 0.2rem 0.55rem;
    border-radius: 2rem;
    border: 1px solid #ffe08a;
  }

  .shopping-section {
    background: ${ORANGE[50]};
    border-radius: 0.75rem;
    padding: 0.8rem 1rem;
    margin-top: 0.75rem;
  }

  .shopping-title {
    font-size: 0.82rem;
    font-weight: 700;
    color: ${ORANGE[700]};
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.3rem;
  }

  .shopping-items {
    display: flex; flex-wrap: wrap; gap: 0.35rem;
  }

  .shopping-item {
    background: white;
    border: 1.5px solid ${ORANGE[200]};
    color: ${ORANGE[800]};
    font-size: 0.8rem;
    font-weight: 500;
    padding: 0.2rem 0.6rem;
    border-radius: 2rem;
  }

  .empty-state {
    text-align: center;
    padding: 2.5rem 1rem;
    color: #aaa;
  }

  .empty-icon { font-size: 2.5rem; margin-bottom: 0.5rem; }
  .empty-state p { font-size: 0.9rem; }
`;

function TagInput({ tags, onChange, placeholder }) {
  const [input, setInput] = useState("");

  const add = (val) => {
    const trimmed = val.trim();
    if (trimmed && !tags.includes(trimmed)) {
      onChange([...tags, trimmed]);
    }
    setInput("");
  };

  const handleKey = (e) => {
    if (["Enter", ",", " "].includes(e.key)) {
      e.preventDefault();
      add(input);
    } else if (e.key === "Backspace" && !input && tags.length) {
      onChange(tags.slice(0, -1));
    }
  };

  const handleBlur = () => { if (input.trim()) add(input); };

  return (
    <div
      className="tag-input-area"
      onClick={(e) => e.currentTarget.querySelector("input")?.focus()}
    >
      {tags.map((t) => (
        <span key={t} className="tag">
          {t}
          <button onClick={() => onChange(tags.filter((x) => x !== t))} aria-label={`${t} 삭제`}>×</button>
        </span>
      ))}
      <input
        className="tag-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKey}
        onBlur={handleBlur}
        placeholder={tags.length === 0 ? placeholder : ""}
      />
    </div>
  );
}

function MatchBar({ pct }) {
  const color = pct >= 80 ? "#2d7d46" : pct >= 50 ? "#C44600" : "#c0392b";
  return (
    <div className="match-bar-wrap">
      <span className="match-label">재료 일치도</span>
      <div className="match-bar">
        <div className="match-fill" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${color}88, ${color})` }} />
      </div>
      <span className="match-pct" style={{ color }}>{pct}%</span>
    </div>
  );
}

function RecipeCard({ recipe }) {
  const [open, setOpen] = useState(false);

  const diffBadge = {
    "쉬움": "badge-green",
    "보통": "badge-yellow",
    "어려움": "badge-red",
  }[recipe.difficulty] || "badge-orange";

  return (
    <div className="recipe-card">
      <div className="recipe-header" onClick={() => setOpen((v) => !v)}>
        <div className="recipe-header-left">
          <div className="recipe-name">{recipe.name}</div>
          <div className="recipe-desc">{recipe.description}</div>
          <div className="recipe-meta">
            <span className="badge badge-orange">⏱ {recipe.time}</span>
            <span className={`badge ${diffBadge}`}>{recipe.difficulty}</span>
            {recipe.cuisine && <span className="badge badge-orange">🍽 {recipe.cuisine}</span>}
          </div>
          <MatchBar pct={recipe.matchPercent} />
        </div>
        <span className={`chevron ${open ? "open" : ""}`}>▾</span>
      </div>

      {open && (
        <div className="recipe-body">
          <div className="section-divider">🧂 재료</div>
          <ul className="ingredient-list">
            {(recipe.availableIngredients || []).map((i) => (
              <li key={i}><span className="ingredient-dot" />{i}</li>
            ))}
            {(recipe.missingIngredients || []).map((i) => (
              <li key={i} className="missing"><span className="ingredient-dot" />⚠ {i} (부족)</li>
            ))}
          </ul>

          {(recipe.substitutes || []).length > 0 && (
            <>
              <div className="section-divider">🔄 대체 재료</div>
              <div className="sub-chips">
                {recipe.substitutes.map((s) => (
                  <span key={s} className="sub-chip">💡 {s}</span>
                ))}
              </div>
            </>
          )}

          <div className="section-divider">👨‍🍳 조리 방법</div>
          <ol className="step-list">
            {(recipe.steps || []).map((s, i) => (
              <li key={i}><span className="step-num">{i + 1}</span><span>{s}</span></li>
            ))}
          </ol>

          {(recipe.shoppingList || []).length > 0 && (
            <div className="shopping-section">
              <div className="shopping-title">🛒 최소 장보기 목록</div>
              <div className="shopping-items">
                {recipe.shoppingList.map((item) => (
                  <span key={item} className="shopping-item">{item}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [ingredients, setIngredients] = useState([]);
  const [seasonings, setSeasonings] = useState([]);
  const [cookTime, setCookTime] = useState("30분 이내");
  const [difficulty, setDifficulty] = useState("아무거나");
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (ingredients.length === 0) {
      setError("재료를 최소 1개 이상 입력해주세요.");
      return;
    }
    setError("");
    setLoading(true);
    setRecipes(null);

    const prompt = `당신은 한국인을 위한 요리 전문가입니다. 반드시 모든 텍스트를 한국어로만 작성하세요. 영어, 일본어, 중국어, 아랍어 등 다른 언어는 절대 사용하지 마세요.

다음 재료로 만들 수 있는 요리를 추천해주세요.
보유 재료: ${ingredients.join(", ")}
기본 양념: ${seasonings.length > 0 ? seasonings.join(", ") : "기본 소금, 후추, 식용유 있음"}
조리 시간 제한: ${cookTime}
난이도 선호: ${difficulty}

정확히 JSON 배열만 반환하세요 (다른 텍스트 없이). 형식:
[{"name":"요리명(한국어)","description":"맛과 특징 한 줄 설명(한국어)","cuisine":"한식/중식/일식/양식/기타","time":"20분","difficulty":"쉬움","matchPercent":85,"availableIngredients":["있는 재료"],"missingIngredients":["없는 재료"],"substitutes":["대체 재료 설명(한국어)"],"steps":["1단계: 재료 손질 - 구체적인 크기와 양 포함(한국어)","2단계: 불 세기와 조리 시간 포함한 구체적 과정(한국어)","3단계: 양념 추가 및 간 맞추기(한국어)","4단계: 완성 및 담기(한국어)"],"shoppingList":["꼭 사야 할 재료"]}]

규칙: 1)실제로 존재하는 요리 이름만 사용하고, 중복된 요리를 추천하지 마세요 2)모든 텍스트 반드시 한국어만 사용 3)steps는 최소 6단계 이상, 각 단계마다 구체적 시간/온도/양 포함 4)5~6가지 요리 추천 5)matchPercent는 정수 6)difficulty는 "쉬움"/"보통"/"어려움" 중 하나`;

    try {
      const apiKey = process.env.REACT_APP_GROQ_KEY;
      if (!apiKey) throw new Error("API 키가 없습니다. Vercel 환경변수를 확인해주세요.");

      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          max_tokens: 4096,
          messages: [{ role: "user", content: prompt }],
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(`API 오류 ${res.status}: ${errData?.error?.message || res.statusText}`);
      }

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error.message || "API 응답 오류");
      }

      const text = data.choices?.[0]?.message?.content || "";
      if (!text) throw new Error("응답이 비어있습니다.");

      const clean = text.replace(/```json|```/g, "").trim();

      // JSON 배열만 추출 (앞뒤 불필요한 텍스트 제거)
      const jsonMatch = clean.match(/\[[\s\S]*\]/);
      if (!jsonMatch) throw new Error("JSON 형식을 찾을 수 없습니다.");

      const parsed = JSON.parse(jsonMatch[0]);
      if (!Array.isArray(parsed)) throw new Error("배열 형식이 아닙니다.");

      setRecipes(parsed);
    } catch (e) {
      setError(`오류: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <div className="hero">
          <div className="hero-icon">🍳</div>
          <h1>냉장고 털기 요리사</h1>
          <p>있는 재료로 뚝딱! AI가 딱 맞는 요리를 찾아드려요</p>
        </div>

        <div className="card">
          <div className="card-title">🥦 보유 재료 <span style={{fontSize:"0.78rem",fontWeight:400,color:"#999"}}>(입력 후 Enter 또는 쉼표)</span></div>
          <TagInput
            tags={ingredients}
            onChange={setIngredients}
            placeholder="예: 계란, 양파, 두부, 돼지고기..."
          />
        </div>

        <div className="card">
          <div className="card-title">🧂 기본 양념</div>
          <TagInput
            tags={seasonings}
            onChange={setSeasonings}
            placeholder="예: 간장, 된장, 고추장, 마늘..."
          />
        </div>

        <div className="card">
          <div className="card-title">⚙️ 조건 설정</div>
          <div className="row">
            <div className="select-group">
              <div className="section-label">조리 시간</div>
              <select value={cookTime} onChange={(e) => setCookTime(e.target.value)}>
                <option>15분 이내</option>
                <option>30분 이내</option>
                <option>1시간 이내</option>
                <option>시간 무관</option>
              </select>
            </div>
            <div className="select-group">
              <div className="section-label">난이도</div>
              <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                <option>아무거나</option>
                <option>쉬운 것만</option>
                <option>보통 이하</option>
                <option>도전적으로</option>
              </select>
            </div>
          </div>
        </div>

        {error && <p style={{color:"#c0392b",fontSize:"0.88rem",marginBottom:"0.75rem",padding:"0 0.25rem"}}>{error}</p>}

        <button className="btn-main" onClick={handleSearch} disabled={loading}>
          {loading ? "🔍 요리 찾는 중..." : "🍽 요리 추천받기"}
        </button>

        {loading && (
          <div className="loading">
            <div className="loading-spinner" />
            <p>냉장고 안을 살펴보는 중이에요...</p>
          </div>
        )}

        {recipes && !loading && (
          <div style={{marginTop:"1.5rem"}}>
            <div className="results-header">✨ 추천 요리 {recipes.length}가지</div>
            {recipes.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🤔</div>
                <p>조건에 맞는 요리를 찾지 못했어요.<br/>재료를 더 추가해보세요!</p>
              </div>
            ) : (
              recipes
                .sort((a, b) => b.matchPercent - a.matchPercent)
                .map((r, i) => <RecipeCard key={i} recipe={r} />)
            )}
          </div>
        )}
      </div>
    </>
  );
}
