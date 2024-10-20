import { useRef } from "react";
import * as XLSX from "xlsx";
import { useDispatch } from "react-redux";
import { addQuestions, clearQuestions } from "../store/questionsReducer";
import { v4 as uuidv4 } from "uuid";
import demoImage from "./assets/demo.png";

const UploadQA = () => {
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    // Check if the file is an Excel file
    const validFileTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
    ];
    if (!validFileTypes.includes(file.type)) {
      alert("Please upload a valid Excel file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet);
      const newQuestions = json.map((row) => ({
        id: uuidv4(),
        question: row.Question,
        answer: row.Answer,
      }));
      dispatch(addQuestions(newQuestions));

      // Clear the file input
      fileInputRef.current.value = "";
    };
    reader.readAsArrayBuffer(file);
  };

  const handleClear = () => {
    dispatch(clearQuestions());
  };

  return (
    <div className="question-form">
      <h1>Study Buddy (Flashcards app)</h1>
      <div>
        {" "}
        <img src={demoImage} alt="demo file" width={200} />
        <br />
        <a href="/demo.xlsx" download>
          📂 Download demo.xlsx 📂
        </a>
      </div>
      <div>
        <label>
          Upload demo.xlsx or your own Excel (.xls or .xlsx) file using the same
          format to begin: {""}
          <br />
          <br />
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileChange}
            ref={fileInputRef}
          />
        </label>
      </div>
      <button className="clear-button" onClick={handleClear}>
        Clear Quiz
      </button>
    </div>
  );
};

export default UploadQA;
