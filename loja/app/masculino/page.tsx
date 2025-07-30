import Image from "next/image";
import { Item } from "../Item";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 bg-white">  
        <span></span>
        <div className="object-center">
          <div className="grid grid-cols-3 gap-15">
            <div>
              <Item imagem="/camisa_branca.jpg" nome="Camisa Branca" valor={40.00}></Item>{ /*Div 01*/}
            </div>
              <div>
              <Item imagem="/calca.jpg" nome="Calça Jeans" valor={100}></Item>{ /*Div 02*/}
            </div>
              <div>
              <Item imagem="/tenis.webp" nome="Tênis" valor={180}></Item>{ /*Div 03*/}
            </div>
          </div>
    
        </div>


    </div>
  );
}
