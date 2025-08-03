
import { BotaoPagar as BotaoPagar } from "@/app/BotaoPagar";
import { UsarCupom } from '@/app/UsarCupom';
import { VerificadorDePosseNFT } from "@/app/VerificadorNFT";
export default async function PaginaVenda({ params }: { params: any }) {
    const nome = await decodeURIComponent(await params.nome);
    const valor = await parseFloat(await params.valor);
    const imagem = await decodeURIComponent(await params.imagem);

    return (
        <div className="font-sans grid grid-rows-[20px_1fr_20px] min-h-screen p-8 pb-20 gap-16 sm:p-20 bg-white">
            <div className="grid grid-cols-3 gap-4">
                <div>
                    <img className="object-scale-down h-100 w-100 rounded-lg shadow-xl/20 ring ring-black" src={"/"+imagem} alt={nome}></img>
                </div>
                <div className='col-span-2 w-full h-auto rounded-lg shadow-xl/20 ring ring-black'>
                    <div className="grid grid-cols-5 gap-4">
                        <div className='col-span-5 h-10'></div>
                        <div className="col-span-3 col-start-2 font-mono font-thin text-center text-black text-5xl">{nome}</div>
                        <div className='col-span-5 h-10'></div>
                        <div className="col-span-5 h-10 text-center text-3xl font-bold"></div>
                        <div className='col-start-2'>
                            <BotaoPagar valor={valor}/>
                        </div>
                        <div className='col-start-4'>
                            <VerificadorDePosseNFT/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}