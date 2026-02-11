import "./IntroModal.css";
/* import dragGif from "../../assets/drag-drop.gif"; */
import { useState } from "react";

export default function IntroModal() {
  const [open, setOpen] = useState(true);

  if (!open) return null;

  return (
    <div className="intro-overlay">
      <div className="intro-modal">
        {/* BOTÃO FECHAR */}
        <button
          className="intro-close"
          onClick={() => setOpen(false)}
          aria-label="Fechar introdução"
        >
          ✕
        </button>

        {/* TEXTO */}
        <div className="intro-text">
          <h2>Bem-vindo ao MyKanban 👋</h2>
          <p>
            Crie e Organize suas tarefas de forma simples e visual.
            <br />
            <strong>Arraste os cards</strong> entre as colunas para mudar o status.
          </p>
        </div>

        {/* GIF 
        <div className="intro-gif">
          <img src={dragGif} alt="Demonstração de arrastar tarefas" />
        </div>*/}

        {/* AÇÃO */}
        <button
          className="intro-action"
          onClick={() => setOpen(false)}
        >
          Entendi
        </button>
      </div>
    </div>
  );
}
