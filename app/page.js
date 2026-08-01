"use client";

import { useState } from "react";

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    if (!inputText.trim()) return;
    setLoading(true);
    setTranslatedText("");

    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText }),
      });
      const data = await res.json();
      if (data.translation) {
        setTranslatedText(data.translation);
      } else {
        setTranslatedText("Error: " + (data.error || "Failed to translate"));
      }
    } catch (err) {
      setTranslatedText("Error connecting to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ maxWidth: "800px", margin: "40px auto", padding: "0 20px", fontFamily: "sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>Hashiya Reader</h1>
      <p style={{ textAlign: "center", color: "#666" }}>Line-by-Line Translation Tool</p>
      
      <div style={{ marginTop: "30px" }}>
        <textarea
          rows={8}
          style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #ccc", fontSize: "16px" }}
          placeholder="Paste your source text here..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button
          onClick={handleTranslate}
          disabled={loading}
          style={{
            marginTop: "12px",
            padding: "12px 24px",
            backgroundColor: loading ? "#888" : "#0070f3",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontSize: "16px",
            cursor: loading ? "not-allowed" : "pointer",
            width: "100%"
          }}
        >
          {loading ? "Translating..." : "Translate Line-by-Line"}
        </button>
      </div>

      {translatedText && (
        <div style={{ marginTop: "30px", padding: "20px", background: "#f5f5f5", borderRadius: "8px" }}>
          <h3>Translation Result:</h3>
          <div style={{ whitespace: "pre-wrap", fontSize: "16px", lineHeight: "1.6" }}>
            {translatedText}
          </div>
        </div>
      )}
    </main>
  );
}
