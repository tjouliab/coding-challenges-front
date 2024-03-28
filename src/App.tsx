import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import React from "react";
import { EXERCICE_LIST } from "./ExerciseList";

export interface Exercice {
  component: () => JSX.Element;
  componentName: string;
  path: string;
  active: boolean;
}

function App() {
  const exerciceList: Exercice[] = EXERCICE_LIST;

  return (
    <BrowserRouter>
      <div className="app-container">
        <div className="sidebar">
          <nav style={{ margin: "1rem" }}>
            <ul className="list-group">
              {exerciceList.map((exercice) => (
                <li className="list-group-item" key={exercice.path}>
                  <a className="nav-link" href={exercice.path}>
                    {exercice.componentName}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="content">
          <Routes>
            {exerciceList.map((exercice) => (
              <Route
                key={exercice.path}
                path={exercice.path}
                element={React.createElement(exercice.component)}
              />
            ))}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
