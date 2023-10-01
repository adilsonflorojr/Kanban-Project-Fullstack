import { Send } from "lucide-react";

import { Input } from "@/components/ui/input";
import { ChevronRight } from "lucide-react";
import { Check } from 'lucide-react';
import { SetStateAction, useState } from 'react';


export function App() {
  const [inputValue, setInputValue] = useState('');
  const [doList, setDoList] = useState<string[]>([]);
  const [doingList, setDoingList] = useState<string[]>([]);
  const [doneList, setDoneList] = useState<string[]>([]);

  const handleInputChange = (ev: { target: { value: SetStateAction<string>; }; }) => {
    setInputValue(ev.target.value);
  };

  const handleSubmit = async () => {
    try {
      await fetch('http://localhost:8080/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputString: inputValue }),
      });
      fetchStringList();
    } catch (error) {
      console.error('Erro ao fazer a solicitação:', error);
    }
  };

  const fetchStringList = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/list');
      const data = await response.json();
      setDoList([...doList, data.valorstring]);
      setInputValue('');
      console.log(`${data.valorstring}`);
    } catch (error) {
      console.error('Erro', error);
    }
  }
  const StrDoing = (index: number) => {
    const stringToMove = doList[index];
    setDoList(doList.filter((random, i) => i !== index));
    setDoingList([...doingList, stringToMove]);
  };

  const StrDone = (index: number) => {
    const stringToMove = doingList[index];
    setDoingList(doingList.filter((random, i) => i !== index));
    setDoneList([...doneList, stringToMove]);
  };
  return (
    <div id="container" className="flex flex-col min-h-screen bg-white">
      <div id="header" className="flex-col mb-6">
        <div className="px-5 py-6 flex items-center justify-center border-b border-3 border-violet-300 border-solid ">
          <h1 className="text-base font-bold">Kanban</h1>
        </div>
      </div>
      <div
        id="main"
        className="flex-1 flex items-center justify-between flex-col"
      >
        <div id="send" className="flex items-center">
          <div className="flex items-center">
            <Input
              type="text"
              name="inputString"
              className="rounded-lg  mr-5 w-96 px-10"
              value={inputValue}
              onChange={handleInputChange}
            />
            <button id="btn" type='submit' onClick={handleSubmit}>
              <Send />
            </button>
          </div>
        </div>

        <div className="flex w-8/12 h-96 flex-row justify-center mt-5">

          <div className="flex-1 mx-5 bg-violet rounded-lg flex flex-col items-center justify-between border-2 w-full mt-5 mb-5 p-4 py-50 overflow-x-auto">
            <div className="flex flex-col items-center justify-center h-auto w-auto">
              <h1 className="border-b w-full text-center ml-4 mb-2">Do</h1>
              {doList.map((DoStr, indice) => (
                <div key={indice} className="flex flex-row items-center justify-center bg-slate-50 p-3">
                  <h1 className="p-1 text-center border-r w-max mx-1 ml-4">{DoStr}</h1>
                  <button type="button" className="ml-2" onClick={() => StrDoing(indice)}>
                    <ChevronRight />
                  </button>
                </div>
              ))}
            </div>
          </div>


          <div className="flex-1 mx-5 bg-violet rounded-lg flex flex-col items-center justify-between border-2 w-full mt-5 mb-5  p-4 py-30 overflow-x-auto">
            <div className="flex flex-col items-center justify-center h-auto w-auto">
              <h1 className="border-b w-full text-center ml-4 mb-2">Doing</h1>
              {doingList.map((doingStr, indice) => (
                <div key={indice} className="flex flex-row items-center justify-center bg-slate-50 p-3">
                  <h1 className="p-1 text-center border-r w-full mx-1">{doingStr}</h1>
                  <button type="button" className="ml-2" onClick={() => StrDone(indice)}><Check /></button>
                </div>
              ))}
            </div>
          </div>


          <div className="flex-1 mx-5 bg-violet rounded-lg flex flex-col items-center justify-between border-2 w-full mt-5 mb-5  p-4 py-30 overflow-x-auto">
            <div className="flex flex-col items-center justify-center h-auto w-auto">
              <h1 className="border-b w-full text-center mb-2">Done</h1>
              {doneList.map((doneStr, indice) => (
                <div key={indice} className="flex flex-row items-center justify-center bg-slate-50 p-3">
                  <h1 className="text-center p-1 border-r w-full mx-1 ml-4">{doneStr}</h1>
                  <button type="button" className="ml-2"> <Check /></button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div id="footer" className="flex-col">
        <div className="px-5 py-6 flex items-center justify-center  border-3 border-violet-300 border-solid border-t">
          <h1 className="text-base font-bold">Kanban</h1>
        </div>
      </div>
    </div>
  );
}

