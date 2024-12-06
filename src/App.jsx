import { useState } from "react";
import "./App.css";
import "./assets/css/scrollbar.css";
import searchImage from "../public/search_24dp_CCC_FILL0_wght400_GRAD0_opsz24.svg";
import { GoogleGenerativeAI } from "@google/generative-ai";

function App() {
  const apiKey = "AIzaSyC3PIatiR6pOqjtrHHb470duztrKVAeDWU";

  const [text, setText] = useState("");
  const [responses, setResponses] = useState("");
  const [description, setDescription] = useState(true);
  const genAi = new GoogleGenerativeAI(apiKey);
  const model = genAi.getGenerativeModel({ model: "gemini-1.5-flash" });
  const buttonHandler = async () => {
    if (!text.trim()) {
      setDescription(false);
      setResponses("Пожалуста напишите ваш запрос");
    } else {
      setDescription(false);
      setResponses("Ваш текст обрабатывается...");
      const promt = text;
      setText("");
      const result = await model.generateContent(promt);
      setResponses(result.response.text().replace("*", ""));
    }
  };

  const test = (e) => {
    if (e.key === "Enter") {
      buttonHandler();
    }
  };
  return (
    <>
      <div className="container">
        {description ? (
          <div className="text-para">
            <span>AI-helper</span>
            <p>This AI-Bot can help you to overcome with problems and so on</p>
            <span>Bu AI-Bot sizga yordamga tayyor</span>
          </div>
        ) : (
          <p></p>
        )}

        {responses ? (
          <div className="responses">
            <p className="response-para">{responses}</p>
          </div>
        ) : (
          <p></p>
        )}

        <div className="input-btn">
          <input
            type="text"
            className="input-values"
            onChange={(e) => setText(e.target.value)}
            value={text}
            onKeyDown={test}
          />
          <button className="confirm" onClick={buttonHandler}>
            <img src={searchImage} />
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
