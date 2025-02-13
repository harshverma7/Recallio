import { Input } from "./input";
import { Button } from "./button";
import { CrossIcon } from "../../assets/icons/CrossIcon";

export function Modal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <>
      {open && (
        <div>
          <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60"></div>
          <div className="w-screen h-screen fixed top-0 left-0 flex items-center justify-center">
            <div className="bg-white opacity-100 p-8 rounded min-w-[500px] max-w-[800px] w-[50%] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="flex justify-end mb-4">
                <div onClick={onClose} className="cursor-pointer">
                  <CrossIcon />
                </div>
              </div>
              <h1 className="text-slate-800 text-2xl font-semibold text-center mb-5">
                Add items you want to recall later
              </h1>
              <div className="flex flex-col items-center space-y-4">
                <Input placeholder={"Title"} />
                <Input placeholder={"Link"} />
              </div>
              <div className="mt-6 flex justify-center">
                <Button variant="primary" text={"submit"}></Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
