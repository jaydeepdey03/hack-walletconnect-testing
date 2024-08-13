import Image from "next/image";
import {Inter} from "next/font/google";
import {Button} from "@/components/ui/button";
import {useGlobalContextHook} from "@/context/useGlobalContextHook";
import {useEffect, useState} from "react";
import {useWriteContract} from "wagmi";
import {abi} from "@/lib/abi";
import {type Hex} from "viem";

const inter = Inter({subsets: ["latin"]});

export default function Home() {
  const {writeContract} = useWriteContract();
  const {ContractAddress} = useGlobalContextHook();

  return (
    <div>
      <div className="w-full h-screen flex items-center justify-center gap-2">
        <div className="bg-black rounded-full">
          <w3m-button />
        </div>

        <Button
          onClick={() =>
            writeContract({
              abi,
              address: ContractAddress as Hex,
              functionName: "increment",
              args: [],
            })
          }
        >
          Increment
        </Button>
      </div>
    </div>
  );
}
