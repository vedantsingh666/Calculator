import React,{ useState, useEffect } from 'react';

import Header from './Components/Header/Header';
import KeyPad from './Components/KeyPad/KeyPad';

import moonIcon from './assets/moon.png';
import sunIcon from './assets/sun.png';

import './App.css';

const usedKeyCodes =[
  48,49,50,51,52,53,54,55,56,57,96,97,98,99,100,101,102,103,104,105,
  8,13,190,187,189,191,56,111,106,107,109,
];
const numbers = ["0", "1", "2", "3", "4","5", "6", "7", "8", "9"];
const operators = ["-","+","*","/"];

function App() {
  const [isDarkMode,setDarkMode] = useState(JSON.parse
    (localStorage.getItem("calculator-app-mode")) || false);
  const [expression,setExpression] = useState("");
  const [result,setResult] = useState("");
  const [history,setHistory] = useState(JSON.parse
    (localStorage.getItem("calculator-app-history")) || []);

  const handleKeyPress=(keyCode,key)=>{
    if(!keyCode)return;
    if(!usedKeyCodes.includes(keyCode)) return;
    if(numbers.includes(key)){
      if(key==="0"){
        if(expression.length === 0) return;
      }
      calculate(expression+key);
      setExpression(expression+key);
    }
    else if(operators.includes(key)){
      if(expression.length === 0) return;
      const lastCharacter = expression.slice(-1);
      if(operators.includes(lastCharacter)) return;
      if(lastCharacter==='.')return;
      setExpression(expression+key);
    }
    else if(key==="."){
      if(expression.length === 0) ;
      const lastCharacter = expression.slice(-1);
      if(!numbers.includes(lastCharacter)) return;
      setExpression(expression+key);
    }
    else if(keyCode===8){
      if(expression.length === 0) setResult("");
      calculate(expression.slice(0,-1));
      setExpression(expression.slice(0,-1));
    }
    else if(keyCode===13){
      if(expression.length === 0) return;
      calculate(expression);
      const tempHistory = [...history];
      if(tempHistory.length>20) tempHistory = tempHistory.splice(0,1);
      tempHistory.push(expression);
      setHistory(tempHistory);
    }
  };

  const calculate = (exp)=>{
    if(!exp) return;
    const lastCharacter = exp.slice(-1);
    if(!numbers.includes(lastCharacter)){
      exp = exp.slice(0,-1);
    }
    const ans = eval(exp).toFixed(2)+"";
    setResult(ans);
  }

  useEffect(()=>{
    localStorage.setItem("calculator-app-mode",JSON.stringify(isDarkMode))
  },[isDarkMode]);

  useEffect(()=>{
    localStorage.setItem("calculator-app-history",JSON.stringify(history))
  },[history]);

  return (
    <div className="app"
    tabIndex= "0"
    onKeyDown={(event)=>handleKeyPress(event.keyCode,event.key)}
    data-theme={isDarkMode ? "dark":""}>
      <div className="app_calculator">
        <div className='app_calculator_navbar'>
          <div className='app_calculator_navbar_toggle'
          onClick={()=>setDarkMode(!isDarkMode)}
          >
            <div className={`app_calculator_navbar_toggle_circle ${
              isDarkMode ? "app_calculator_navbar_toggle_circle_active":""
            }`} />
          </div>
          <img src={isDarkMode ? moonIcon : sunIcon} alt="mode" />
        </div>
        <Header expression={expression} result = { result }
        history = { history }
        />
        <KeyPad handleKeyPress={handleKeyPress}/>
      </div>
    </div>
  );
}

export default App;
