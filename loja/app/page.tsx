import Image from "next/image";
import { Item } from "./Item";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 bg-white">  
        <span></span>
        <div className="object-center">
          <div className="grid grid-cols-3 gap-15">
            <div>
              <Item id="1" imagem="/camisa_branca.jpg" nome="Camisa" valor={40.00}></Item>{ /*Div 01*/}
            </div>
            <div>
              <Item id="2" imagem="/vestido.webp" nome="Vestido" valor={120}></Item>{ /*Div 02*/}
            </div>
              <div>
              <Item id="3" imagem="/calca.jpg" nome="Jeans" valor={100}></Item>{ /*Div 03*/}
            </div>
            <div>
              <Item id="4" imagem="/salto.jpg" nome="Salto" valor={180}></Item>{ /*Div 04*/}
            </div>
            <div>
              <Item id="5" imagem="/bolsa.webp" nome="Bolsa" valor={90}></Item>{ /*Div 05*/}
            </div>
              <div>
              <Item id="6" imagem="/tenis.webp" nome="Sapato" valor={180}></Item>{ /*Div 06*/}
            </div>
          </div>
    
        </div>


    </div>
  );
}
