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
      text: "Crie e organize suas tarefas de forma simples e visual.",
      image: null,
    },
    {
      title: "Arraste suas tarefas",
      text: "Arraste os cards entre as colunas para mudar o status da atividade.",
      image: dragGif,
    },
    {
      title: "Salve suas tarefas",
      text: "Faça login com sua conta Google para salvar e acessar depois.",
      image: null,
    },
  ];

  const next = () => {
    if (step === slides.length - 1) return setOpen(false);
    setStep(step + 1);
  };

  const prev = () => {
    if (step === 0) return;
    setStep(step - 1);
  };

  return (
    <div className="intro-overlay">
      <div className="intro-modal">
        {/* FECHAR */}
        <button
          className="intro-close"
          onClick={() => setOpen(false)}
          aria-label="Fechar introdução"
        >
          ✕
        </button>

        {/* SLIDE */}
        <div className="intro-text">
          <h2>{slides[step].title}</h2>
          <p><strong>{slides[step].text}</strong></p>
        </div>

        {/* GIF */}
        {slides[step].image && (
          <div className="intro-gif">
            <img src={slides[step].image} alt="tutorial" />
          </div>
        )}

        {/* INDICADORES */}
        <div className="intro-dots">
          {slides.map((_, i) => (
            <span
              key={i}
              className={i === step ? "dot active" : "dot"}
            />
          ))}
        </div>

        {/* BOTÕES */}
        <div className="intro-buttons">
          {step > 0 && (
            <button className="intro-secondary" onClick={prev}>
              Voltar
            </button>
          )}

          <button className="intro-action" onClick={next}>
            {step === slides.length - 1 ? "Começar" : "Próximo"}
          </button>
        </div>
      </div>
    </div>
  );
}
