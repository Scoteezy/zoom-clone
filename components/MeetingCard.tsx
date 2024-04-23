"use client";

import { avatarImages } from "@/constants";
import Image from "next/image";

import { cn } from "@/lib/utils";

import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

interface MeetingCardProps {
  title: string;
  date: string;
  icon: string;
  isPreviousMeeting?: boolean;
  buttonIcon1?: string;
  buttonText?: string;
  handleClick: () => void;
  link: string;
}

const MeetingCard = ({
  icon,
  title,
  date,
  isPreviousMeeting,
  buttonIcon1,
  handleClick,
  link,
  buttonText,
}: MeetingCardProps) => {
  const { toast } = useToast();

  return (
    <section className="flex min-h-[258px] w-full flex-col justify-between rounded-[14px] bg-dark-1 px-5 py-8 xl:max-w-[568px]">
      <article className="flex flex-col gap-5">
        <Image alt="upcoming"
          height={28}
          src={icon}
          width={28} />
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-base font-normal">{date}</p>
          </div>
        </div>
      </article>
      <article className={cn("flex justify-center relative", {})}>
        <div className="relative flex w-full max-sm:hidden">
          {avatarImages.map((img, index) => (
            <Image
              alt="attendees"
              className={cn("rounded-full", { absolute: index > 0 })}
              height={40}
              key={index}
              src={img}
              style={{ top: 0, left: index * 28 }}
              width={40}
            />
          ))}
          <div className="flex-center absolute left-[136px] size-10 rounded-full border-[5px] border-dark-3 bg-dark-4">
            +5
          </div>
        </div>
        {!isPreviousMeeting && (
          <div className="flex gap-2">
            <Button className="rounded bg-blue-1 px-6"
              onClick={handleClick}>
              {buttonIcon1 && (
                <Image alt="feature"
                  height={20}
                  src={buttonIcon1}
                  width={20} />
              )}
              &nbsp; {buttonText}
            </Button>
            <Button
              className="bg-dark-4 px-6"
              onClick={() => {
                navigator.clipboard.writeText(link);
                toast({
                  title: "Link Copied",
                });
              }}
            >
              <Image
                alt="feature"
                height={20}
                src="/icons/copy.svg"
                width={20}
              />
              &nbsp; Copy Link
            </Button>
          </div>
        )}
      </article>
    </section>
  );
};

export default MeetingCard;