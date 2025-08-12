import {
  Button,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState } from "react";
import { addAdmin } from "@/lib/api/usercalls";

export default function AddAdminModal({
  isOpen,
  setIsOpen,
  onAdminAdded,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onAdminAdded?: () => void;
}) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "super-admin",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function close() {
    setIsOpen(false);
    setFormData({ firstName: "", lastName: "", email: "", role: "super-admin" });
    setError("");
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        role: formData.role.toLocaleLowerCase()
      }
      console.log(data)
      await addAdmin(undefined,  data);
      
      onAdminAdded?.();
      close();
    } catch (error: any) {
      console.error("Failed to add admin:", error);
      setError(error?.message || error?.error || "Failed to add admin. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
        __demoMode
      >
        <DialogBackdrop className="fixed inset-0  bg-black/30" />
        <div className="fixed inset-0 z-90 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white p-6  duration-300 ease-out "
            >
              <p className="text-[#181D27] font-[600] text-[18px]">
                Invite New Admin
              </p>
              <p className="text-[#535862] mt-[5px]">
                Add a new admin to your system
              </p>
              <p className="mt-2 text-sm/6 text-white/50">
                Your payment has been successfully submitted. We’ve sent you an
                email with all of the details of your order.
              </p>

              {error && (
                <div className="my-2 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-[10px] flex flex-col">
                <div>
                  <p>First Name</p>
                  <input
                    type="text"
                    placeholder="Enter name here"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    required
                    className="h-[45px] w-full border border-[#D5D7DA] outline-none px-[10px] rounded-[8px] mt-[5px]"
                  />
                </div>
                <div>
                  <p>Last Name</p>
                  <input
                    type="text"
                    placeholder="Enter name here"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    required
                    className="h-[45px] w-full border border-[#D5D7DA] outline-none px-[10px] rounded-[8px] mt-[5px]"
                  />
                </div>
                <div>
                  <p>Email</p>
                  <input
                    type="email"
                    placeholder="Enter email here"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="h-[45px] w-full border border-[#D5D7DA] outline-none px-[10px] rounded-[8px] mt-[5px]"
                  />
                </div>
                <div>
                  <p>Role</p>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="h-[45px] w-full border border-[#D5D7DA] outline-none px-[10px] rounded-[8px] mt-[5px]"
                  >
                    <option value="super-admin">Super Admin</option>
                    <option value="investor">Investor</option>
                    <option value="crm">CRM</option>
                    <option value="marketer">Marketer</option>
                    <option value="compliance">Compliance</option>
                  </select>
                </div>
                
                <div className="mt-6 flex items-center justify-end w-full gap-2">
                  <button 
                    type="button" 
                    onClick={close} 
                    className="bg-white text-[#414651] rounded-[8px] font-[600] border border-[#D5D7DA] p-[8px_20px]"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="bg-purple-600 font-[600] rounded-[8px] text-white p-[8px_20px] disabled:opacity-50"
                  >
                    {loading ? "Sending..." : "Send Invitation"}
                  </button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
