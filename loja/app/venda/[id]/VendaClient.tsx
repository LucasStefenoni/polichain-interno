'use client';

import { useState } from 'react';
import { BotaoPagar as BotaoPagar } from "@/app/BotaoPagar";
import { UsarCupom } from '@/app/UsarCupom';
import type { Produto } from '@/app/data'; 

// Este componente recebe o produto já encontrado como uma prop
export default function VendaClient({ produto }: { produto: Produto }) {
    const [precoAtual, setPrecoAtual] = useState(produto.valor);

  

    return (
        <div className="font-sans grid grid-rows-[20px_1fr_20px] min-h-screen p-8 pb-20 gap-16 sm:p-20 bg-white">
            <div className="grid grid-cols-3 gap-4">
                <div>
                    <img className="object-scale-down h-100 w-100 rounded-lg shadow-xl/20 ring ring-black" src={produto.imagem} alt={produto.nome}></img>
                </div>
                <div className='col-span-2 w-full h-auto rounded-lg shadow-xl/20 ring ring-black'>
                    <div className="grid grid-cols-5 gap-4">
                        <div className='col-span-5 h-10'></div>
                        <div className="col-span-3 col-start-2 font-mono font-thin text-center text-black text-5xl">{produto.nome}</div>
                        <div className='col-span-5 h-10'></div>
                        <div className="col-span-5 h-10 text-center text-3xl font-bold"></div>
                        <div className='col-start-2'>
                            <BotaoPagar valor={precoAtual}/>
                        </div>
                        <div className='col-start-4'>
                            <UsarCupom/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}