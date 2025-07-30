import Image from "next/image";
import { Item } from "../Item";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 bg-white">  
        <span></span>
        <div className="object-center">
          <div className="grid grid-cols-3 gap-15">
            <div>
              <Item imagem="/vestido.webp" nome="Vestido" valor={120}></Item>{ /*Div 02*/}
            </div>
            <div>
              <Item imagem="/salto.jpg" nome="Salto" valor={180}></Item>{ /*Div 04*/}
            </div>
            <div>
              <Item imagem="/bolsa.webp" nome="Bolsa" valor={90}></Item>{ /*Div 05*/}
            </div>
          </div>
    
        </div>


    </div>
  );
}
