import "./IntroModal.css";
import dragGif from "../../assets/drag-Gif.gif";
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
          <h2>Bem-vindo ao MyKanban</h2>
          <p>
            <strong>Crie e organize suas tarefas de forma simples e visual.
                    Arraste os cards entre as colunas para alterar o status da atividade.<br/>
                    Para salvar e acessar suas tarefas depois, faça login com sua conta Google.</strong>
          </p>
        </div>

        <div className="intro-gif">
          <img src={dragGif} alt="Demonstração de arrastar tarefas" />
        </div>

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
