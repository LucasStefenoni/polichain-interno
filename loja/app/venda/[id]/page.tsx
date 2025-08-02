import { produtos } from '@/app/data'; 
import { notFound } from 'next/navigation';
import VendaClient from './VendaClient';
import { use } from "react";

export default async function PaginaVenda({ params }: { params: { id: string } }) {
    const { id } = params;
    const produto = produtos.find((p) => p.id === id); 

    if (!produto) {
        notFound();
    }

    return <VendaClient produto={produto} />;
}
