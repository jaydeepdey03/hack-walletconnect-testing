import Image from "next/image";
import {Inter} from "next/font/google";
import {Button} from "@/components/ui/button";
import {useGlobalContextHook} from "@/context/useGlobalContextHook";
import {useEffect, useState} from "react";
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import {abi} from "@/lib/abi";
import {type Hex} from "viem";

const inter = Inter({subsets: ["latin"]});

export default function Home() {
  const {address, isConnecting, isDisconnected, isConnected} = useAccount();
  const {writeContract, isPending, data: hash} = useWriteContract();
  const {ContractAddress} = useGlobalContextHook();
  const {data} = useReadContract({
    abi,
    address: ContractAddress as Hex,
    functionName: "getValue",
    query: {
      refetchInterval: 2000,
    },
  });
  const {data: accounts} = useReadContract({
    abi,
    address: ContractAddress as Hex,
    functionName: "getAllAccounts",
    query: {
      refetchInterval: 2000,
    },
  });
  const {isLoading, dataUpdatedAt, refetch} = useWaitForTransactionReceipt({
    hash,
  });

  console.log(accounts, "accounts");

  if (isConnecting) {
    return (
      <div className="flex h-screen w-full justify-center items-center flex-col gap-4">
        <p className="text-xl font-bold">Connecting...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full justify-center items-center flex-col gap-4">
      <div className="flex items-center justify-center gap-2">
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
        <Button
          onClick={() =>
            writeContract({
              abi,
              address: ContractAddress as Hex,
              functionName: "addAccounts",
              args: [],
            })
          }
        >
          Add Account
        </Button>
      </div>
      {isLoading || isPending ? (
        <p className="text-xl font-bold">Loading...</p>
      ) : (
        <>
          <p className="text-xl font-bold">Count: {Number(data as BigInt)} </p>
          <p className="text-xl font-bold text-center">
            Accounts: {JSON.stringify(accounts, null, 2)}{" "}
          </p>
        </>
      )}
    </div>
  );
}
