import { Modal } from "../../ui/modal";

interface AddContentModalProps {
  open: boolean;
  onClose: () => void;
}

export function AddContentModal({ open, onClose }: AddContentModalProps) {
  return <Modal open={open} onClose={onClose} />;
}
