import { useEffect, useState } from 'react';
import './ModalTutorial.css';

export default function ModalTutorial() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState('next');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem('kanban_tutorial');
    if (!seen) setOpen(true);
  }, []);

  const closeTutorial = () => {
    localStorage.setItem('kanban_tutorial', 'true');
    setOpen(false);
  };

  const steps = [
    {
      title: 'Bem-vindo ao MyKanban',
      text: 'Este é um quadro Kanban criado para ajudar você a organizar suas tarefas de forma simples, visual e eficiente.',
    },
    {
      title: 'O que é Kanban?',
      text: 'Kanban é um método visual onde as tarefas passam por etapas: PENDENTE → ANDAMENTO → FEITO. Ele ajuda você a manter o foco e acompanhar seu progresso.',
    },
    {
      title: 'Como Utilizar?',
    },
    {
      title: 'Tudo pronto!',
      text: 'Agora é só organizar suas tarefas e acompanhar seu progresso.',
    },
  ];


  const nextStep = () => {
    setDirection('next');
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setDirection('prev');
    setStep((prev) => prev - 1);
  };

  return (
    <div className="tutorialOverlay">
      <div className="tutorialModal">
        <div className={`stepContent slide-${direction}`} key={step}>
          <h2>{steps[step].title}</h2>

          {step === 2 ? (
            <div className="howToUse">
              <p>➕ Adicione tarefas</p>
              <p>🖱️ Arraste entre colunas</p>
              <p>🗑️ Exclua quando quiser</p>
              <p>📅 Acompanhe a criação</p>
            </div>
          ) : (
            <p className="tutorialText">
              {steps[step].text}
            </p>
          )}
        </div>

        <div className="tutorialButtons">
          {step > 0 && (
            <button onClick={prevStep}>Voltar</button>
          )}

          {step < steps.length - 1 ? (
            <button onClick={nextStep}>Próximo</button>
          ) : (
            <button className="startBtn" onClick={closeTutorial}>
              Começar a usar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
