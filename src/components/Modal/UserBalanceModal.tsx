// import { fetchWalletsByUserId } from "@/lib/api/walletcalls";
// import {
//   Button,
//   Dialog,
//   DialogBackdrop,
//   DialogPanel,
//   DialogTitle,
// } from "@headlessui/react";
// import { useEffect, useState } from "react";

// export default function UserBalanceModal({
//   isOpen,
//   setIsOpen,
//   id,
// }: {
//   isOpen: boolean;
//   setIsOpen: (open: boolean) => void;
//   id: string;
// }) {
//   function close() {
//     setIsOpen(false);
//   }

//   const [isLoading, setIsLoading] = useState(false)
//   useEffect(() => {
//     const fetchUserWallets = async () => {

//       if (!id) {
//         return;
//       } else {
//         const userId = id;
//         const res = await fetchWalletsByUserId(userId);
//         console.log(res, "wallet res");
//       }
//     };

//     fetchUserWallets();
//   }, [id]);

//   return (
//     <>
//       <Dialog
//         open={isOpen}
//         as="div"
//         className="relative z-10 focus:outline-none"
//         onClose={close}
//         __demoMode
//       >
//         <DialogBackdrop className="fixed inset-0  bg-black/30" />
//         <div className="fixed inset-0 z-90 w-screen overflow-y-auto">
//           <div className="flex min-h-full items-center justify-center p-4">
//             <DialogPanel
//               transition
//               className="w-full max-w-md rounded-xl bg-white p-6  duration-300 ease-out "
//             >
//               {id}
//               Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
//               corrupti repudiandae numquam accusamus pariatur. Magnam ut odio
//               enim minus provident? Fugit similique sunt, necessitatibus
//               explicabo sit molestiae aliquid porro incidunt.
//             </DialogPanel>
//           </div>
//         </div>
//       </Dialog>
//     </>
//   );
// }


import { fetchWalletsByUserId } from "@/lib/api/walletcalls";
import { formatCurrencyWithSymbol } from "@/lib/utils";
import {
  Button,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useEffect, useState } from "react";

type Wallet = {
  _id: string;
  currency: string;
  currencyName: string;
  availableBalance: string;
  ledgerBalance: string;
  lockedBalance: { $numberDecimal: string };
  totalCredit: { $numberDecimal: string };
  totalDebit: { $numberDecimal: string };
};

// Map currency code to symbol
const currencySymbols: Record<string, string> = {
  USD: "$",
  NGN: "₦",
  ZAR: "R",
  EUR: "€",
  GBP: "£",
  // Add more as needed
};

// function formatCurrency(amount: string | number, currency: string) {
//   const symbol = currencySymbols[currency] || "";
//   const numericAmount = typeof amount === "string" ? parseFloat(amount) : amount;
//   return `${symbol}${numericAmount.toLocaleString()}`;
// }

export default function UserBalanceModal({
  isOpen,
  setIsOpen,
  id,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  id: string;
}) {
  function close() {
    setIsOpen(false);
  }

  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserWallets = async () => {
      if (!id) return;

      setIsLoading(true);
      try {
        const res = await fetchWalletsByUserId(id);
        console.log(res, "wallet res");
        setWallets(res);
      } catch (err) {
        console.error("Failed to fetch wallets:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserWallets();
  }, [id]);

  console.log(wallets, "wallets");

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={close}
    >
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 z-90 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <DialogTitle className="text-lg font-semibold mb-4">
              User Wallet Balances
            </DialogTitle>

            {isLoading ? (
              <p>Loading...</p>
            ) : wallets.length === 0 ? (
              <p>No wallet data found.</p>
            ) : (
              <div className="space-y-4">
                {wallets.map((wallet) => (
                  <div
                    key={wallet._id}
                    className="border p-3 rounded-md bg-gray-50"
                  >
                    <p className="font-medium">
                      {wallet.currencyName} ({wallet.currency})
                    </p>
                    <p>
                      Available Balance:{" "}
                      {wallet.availableBalance}
                      {/* {formatCurrencyWithSymbol(wallet.availableBalance, wallet.currency)} */}
                    </p>
                    <p>
                      Ledger Balance:{" "}
                      {wallet.ledgerBalance}
                      {/* {formatCurrencyWithSymbol(wallet.ledgerBalance, wallet.currency)} */}
                    </p>
                    <p>
                      Locked Balance:{" "}
                      {wallet.lockedBalance.$numberDecimal}
                     
                    </p>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 text-right">
              <Button
                onClick={close}
                className="bg-purple-600 text-white px-[30px] py-[8px] rounded-md hover:bg-purple-700"
              >
                Close
              </Button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

