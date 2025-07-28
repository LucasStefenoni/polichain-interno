import Image from "next/image";
import { NvDefault } from "./NvDefault";
import { Item } from "./Item";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 bg-white">
        <div><NvDefault></NvDefault></div>  
        <div className="object-center">
          <div className="grid grid-cols-3 gap-15">
            <div>
              <Item></Item>{ /*Div 01*/}
            </div>
            <div>
              <Item></Item>{ /*Div 02*/}
            </div>
              <div>
              <Item></Item>{ /*Div 03*/}
            </div>
            <div>
              <Item></Item>{ /*Div 04*/}
            </div>
            <div>
              <Item></Item>{ /*Div 05*/}
            </div>
              <div>
              <Item></Item>{ /*Div 06*/}
            </div>
          </div>
    
        </div>


    </div>
  );
}
