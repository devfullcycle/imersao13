import { AssetChartComponent } from "../../../components/AssetChatComponent";
import { ChartComponent } from "../../../components/ChartComponent";
import {
  TabsGroup,
  TabsItem,
  Card,
} from "../../../components/flowbite-components";
import MyOrders from "../../../components/MyOrders";
import { OrderForm } from "../../../components/OrderForm";
import { HiShoppingCart, HiArrowUp } from "../../../components/react-icons/hi";
import { SyncOrders } from "../../../components/SyncOrders";

export default async function HomeBrokerPage({
  params,
}: {
  params: { wallet_id: string; asset_id: string };
}) {
  return (
    <main className="flex flex-grow flex-col container mx-auto p-2">
      <article className="format format-invert">
        <h1>Home broker - {params.asset_id}</h1>
      </article>
      <div className="grid grid-cols-5 flex-grow gap-2 mt-2">
        <div className="col-span-2">
          <div>
            <Card
              theme={{
                root: {
                  children:
                    "flex h-full flex-col justify-center gap-4 py-4 px-2",
                },
              }}
            >
              <TabsGroup aria-label="Default tabs" style="pills">
                <TabsItem active title="Comprar" icon={HiShoppingCart}>
                  <OrderForm
                    wallet_id={params.wallet_id}
                    asset_id={params.asset_id}
                    type="BUY"
                  />
                </TabsItem>
                <TabsItem title="Vender" icon={HiArrowUp}>
                  <OrderForm
                    wallet_id={params.wallet_id}
                    asset_id={params.asset_id}
                    type="SELL"
                  />
                </TabsItem>
              </TabsGroup>
            </Card>
          </div>
          <div className="mt-2">
            <Card
              theme={{
                root: {
                  children:
                    "flex h-full flex-col justify-center gap-4 py-4 px-2",
                },
              }}
            >
              <SyncOrders wallet_id={params.wallet_id}>
                <div className="max-h-96 overflow-y-auto overflow-hidden">
                  <MyOrders wallet_id={params.wallet_id} />
                </div>
              </SyncOrders>
            </Card>
          </div>
        </div>
        <div className="col-span-3 flex flex-grow">
          <AssetChartComponent asset_id={params.asset_id} />
        </div>
      </div>
    </main>
  );
}

1 / ago.	Mercadolivre*vinic10/10	34,50
01 / nov.	Mercadolivre*digit08/10	85,90
05 / nov.	Mercadolivre*saldo08/10	44,08
08 / nov.	Dell Computadores 08/12	379,93
09 / nov.	Dell Computadores 08/12	943,71
14 / nov.	Mercadolivre*merca08/10	125,90
16 / nov.	Mercadolivre*merca07/10	224,00
22 / nov.	Pg *sm Shop 07/12	536,00
06 / dez.	Americanas 07/08	280,44
23 / dez.	Mercadolivre*atlas06/10	76,90
23 / dez.	Mercadolivre*merca06/10	65,23
28 / dez.	Mercadolivre*merca06/10	61,34
19 / fev.	Centauro Ce217 04/05	70,03
19 / mai.	Super Luna 01/02	291,64
22 / mai.	Mc Donalds	10,00
25 / mai.	Everandos 2	27,34
25 / mai.	Mc Donalds	52,00
26 / mai.	Rd Hamburgueria	7,50
26 / mai.	Posto Angola	100,00
27 / mai.	Posto Angola	50,00
27 / mai.	Nobre Pasteleiro	40,48
27 / mai.	Casa Carnes Lara	160,25
27 / mai.	Ubirajara Joias 01/08	65,25
27 / mai.	Super Luna 01/02	71,52
28 / mai.	Supermercado Super01/02	81,04
02 / jun.	Pag*paroquiasao	55,00
04 / jun.	Supermercado Super Lun	154,12
06 / jun.	Posto Abril Das Americ	21,96
06 / jun.	Supermercado Super Lun	47,61
06 / jun.	Espeteria Do Ze	81,03
06 / jun.	Pg *ton Manutenca 01/02	110,00
06 / jun.	Pg *ton Manutenca 01/02	110,00
06 / jun.	Pg *ton Manutenca 01/02	110,00
06 / jun.	Parc=103berlinf*ac01/03	103,23
07 / jun.	Drogaria Araujo Sa Fl	16,08
07 / jun.	Mc Donalds	8,00
12 / jun.	Pizzaria Bahamas	71,00
13 / jun.	Paroquia Sagrado Corac	23,00
15 / jun.	Eletro Betim Ltda	3,00
15 / jun.	Casa Carnes Lara	41,00
15 / jun.	Supermercado Super Lun	33,11
15 / jun.	Super Luna 01/02	149,48