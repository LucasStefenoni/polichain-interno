"use client";
import React from "react";

export function Item() {
  return (
    <div className="max-w-sm bg-white border border-black rounded-lg">
        <a href="#">
            <img className="p-5 rounded-t-lg w-full h-50 object-scale-down" src="/camisa_branca.jpg" alt="" />
        </a>
        <div className="p-5">
            <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Camiseta Branca</h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">R$40.00</p>
            <a href="#" className="text-white bg-black  hover:bg-gray-400 hover:ring-gray-400 focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 text-center">
                Comprar
            </a>
        </div>
    </div>

  );
}