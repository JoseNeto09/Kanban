import "./IntroModal.css";
import dragGif from "../../assets/drag-Gif.gif";
import { useState } from "react";

export default function IntroModal() {
  const [open, setOpen] = useState(true);
  const [step, setStep] = useState(0);

  if (!open) return null;

  const slides = [
    {
      title: "Bem-vindo ao MyKanban",
      text: "Crie e organize suas tarefas de forma simples e visual."
    },
    {
      title: "Arraste os Cards",
      text: "Arraste os cards entre as colunas para alterar o status da atividade."
    },
    {
      title: "Salve suas tarefas",
      text: "Faça login com Google para salvar e acessar suas tarefas depois."
    }
  ];

  const isLast = step === slides.length - 1;
  const showGif = step === 1; // 👈 somente slide 2

  const nextStep = () => {
    if (!isLast) {
      setStep(step + 1);
    } else {
      setOpen(false);
    }
  };

  return (
    <div className="intro-overlay">
      <div className="intro-modal keynote">
        <button
          className="intro-close"
          onClick={() => setOpen(false)}
          aria-label="Fechar introdução"
        >
          ✕
        </button>

        <div className="intro-text">
          <h2>{slides[step].title}</h2>
          <p>
            <strong>{slides[step].text}</strong>
          </p>
        </div>

        {/* 👇 GIF apenas no slide 2 */}
        {showGif && (
          <div className="intro-gif">
            <img src={dragGif} alt="Demonstração de arrastar tarefas" />
          </div>
        )}

        <button
          className="intro-action keynote-btn"
          onClick={nextStep}
        >
          {isLast ? "Entendi" : "Próximo"}
        </button>
      </div>
    </div>
  );
}
