import React from "react";

import Image from "next/image";

import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

import { Button } from "./ui/button";
  
interface MeetingModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    className?: string;
    children?: React.ReactNode;
    handleClick: () => void;
    buttonText?: string;
    buttonIcon?:string;
    image?:string;
}
const MeetingModal = ({isOpen, onClose, title, className, children, handleClick, buttonText, image, buttonIcon} : MeetingModalProps) => {
  return (
    <Dialog onOpenChange={onClose}
      open={isOpen}>
      <DialogContent className="flex w-full max-w-[520px] flex-col gap-6 border-none bg-dark-1 px-6 py-9 text-white">
        <div className="flex flex-col gap-6">
          {image && (
            <div className="flex justify-center">
              <Image alt="image"
                height={72}
                src={image}
                width={72}/>
            </div>
          )}
          <h1 className={cn("text-3xl font-bold leading-[42px]", className)}>{title}</h1>
          {children}
          <Button className="bg-blue-1 focus-visible:ring-0 focus-visible:ring-offset-0"
            onClick={handleClick}>
            {buttonIcon && (
              <Image alt="button icon"
                height={13}
                src={buttonIcon}
                width={13}/>
            )} &nbsp;
            {buttonText || "Schedule Meeting"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>

  );
};

export default MeetingModal;