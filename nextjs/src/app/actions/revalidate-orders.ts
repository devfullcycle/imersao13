'use server';

import { revalidateTag } from "next/cache";

export async function revalidateOrders(wallet_id: string){
    revalidateTag(`orders-wallet-${wallet_id}`);
}