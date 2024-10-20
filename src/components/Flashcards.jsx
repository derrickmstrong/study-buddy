import { useDispatch, useSelector } from "react-redux";
import { selectQuestion } from "../store/questionsReducer";

const Flashcards = () => {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.questions.questions);
  const selectedId = useSelector((state) => state.questions.selectedId);

  const handleClick = (id) => {
    dispatch(selectQuestion(id === selectedId ? null : id));
  };

  return (
    <div className="flashcards">
      {questions.map((q) => (
        <div
          key={q.id}
          className={q.id === selectedId ? "selected" : ""}
          onClick={() => handleClick(q.id)}
        >
          {q.id !== selectedId ? q.question : q.answer}
        </div>
      ))}
    </div>
  );
};

export default Flashcards;
