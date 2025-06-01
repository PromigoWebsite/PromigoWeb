import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import Lucide from "../Lucide";
import { useNavigate } from "react-router-dom";
interface MainProps {
    openModal: boolean,
    setOpenModal: (openModal: boolean) => void;
}
export function LoginModal(props: MainProps){
    const navigate = useNavigate();
    return (
      <>
        <Dialog
          open={props.openModal}
          onClose={() => {}}
          className="relative z-50"
        >
          <DialogBackdrop className="fixed inset-0 bg-black/30" />
          <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
            <DialogPanel className="max-w-xl max-h-[1000px] bg-white p-8 rounded-2xl">
              {/* Headline */}
              <div className="flex justify-between mb-6">
                <DialogTitle className="font-bold text-2xl mr-3">
                  Setelah Login, Anda dapat menikmati:
                </DialogTitle>
                <button
                  onClick={() => {
                    props.setOpenModal(false);
                  }}
                >
                  <Lucide icon="X" className="w-9 h-auto stroke-2 " />
                </button>
              </div>

              {/* body */}
              <div className="mb-8">
                <div className="flex mb-2">
                  <div className="flex">
                    <Lucide
                      icon="Star"
                      className="size-6 fill-black mr-4 self-center"
                    />
                  </div>
                  <div className="text-black/80 font-semibold text-[20px] ">
                    Mengakses Fitur Favorit
                  </div>
                </div>
                <div className="flex">
                  <div className="flex">
                    <Lucide
                      icon="OctagonAlert"
                      className="size-6 stroke-3 mr-4 self-center"
                    />
                  </div>
                  <div className="text-black/80 font-semibold text-[20px] ">
                    Melaporkan promo yang bermasalah
                  </div>
                </div>
              </div>

              <button className="w-full bg-[#063EB8] h-[50px] text-white text-2xl" onClick={()=>{
                navigate(`/login`);
              }}>Login</button>
            </DialogPanel>
          </div>
        </Dialog>
      </>
    );
}