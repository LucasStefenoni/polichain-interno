"use client";
import React from "react";
import {ConectarCarteira} from "./ConectarCarteira";
import { CriarNFT } from "./CriarNFT";
export function NvDefault() {
  return (
  <nav className="bg-white  fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <div className="flex items-center space-x-3 rtl:space-x-reverse">
        <span className="self-center text-2xl font-semibold whitespace-nowrap text-black">Lojinha</span>
    </div>
    <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
        <ConectarCarteira></ConectarCarteira>
        <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
          </svg>
      </button>
    </div>
    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
      <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
        <li>
          <a href="/" className="text-black block py-2 px-3 rounded-sm hover:bg-gray-100" aria-current="page">Inicial</a>
        </li>
        <li>
          <a href="/masculino" className="text-black block py-2 px-3 rounded-sm hover:bg-gray-100">Masculino</a>
        </li>
        <li>
          <a href="/feminino" className="text-black block py-2 px-3 rounded-sm hover:bg-gray-100">Feminino</a>
        </li>
        <li>
          <CriarNFT></CriarNFT>
        </li>
      </ul>
    </div>
    </div>
  </nav>
  );
}