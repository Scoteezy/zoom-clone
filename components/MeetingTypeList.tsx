"use client";
import { useState } from "react";
import ReactDatePicker from "react-datepicker";

import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";

import { useToast } from "@/components/ui/use-toast";

import HomeCard from "./HomeCard";
import MeetingModal from "./MeetingModal";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const MeetingTypeList = () => {
  const router = useRouter();
  const { toast } = useToast();

  const [meetingState, setMeetingState] = useState<"isInstantMeeting"| "isJoiningMeeting" | "isScheduleMeeting" | undefined>();
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: ""
  });
  const [callDetails, setCallDetails] = useState<Call>();
  const {user} = useUser();
  const client = useStreamVideoClient();

  const createMeeting = async () => {
    if(!client || !user) {
      return;
    }
    try{
      if(!values.dateTime){
        toast({
          title: "Please select a date and a time",
        });
        return;
      }
      const id = crypto.randomUUID();
      const call = client.call("default",id);

      if(!call) {
        throw new Error("Failed to create call");
      }
      const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "Instant meeting";

      await call.getOrCreate({
        data:{
          starts_at: startsAt,
          custom: {
            description
          }
        }
      });
      setCallDetails(call);
      if(!values.description){
        router.push(`/meeting/${call.id}`);
      }
      toast({
        title: "Meeting Created",
      });
    }catch(e){
      console.log(e);
      toast({
        title: "Failed to create meeting",
      });
    }
  };
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard className="bg-orange-1"
        description="Start an instant meeting"
        handleClick={()=>setMeetingState("isInstantMeeting")}
        img="/icons/add-meeting.svg"
        title="New Meeting"
      />
      <HomeCard 
        className="bg-blue-1"
        description="Plan your meeting"
        handleClick={()=>setMeetingState("isScheduleMeeting")}
        img="/icons/schedule.svg"
        title="Schedule meeting"/>
      <HomeCard  className="bg-purple-1"
        description="Check out your recordings"
        handleClick={()=>router.push("/recordings")}
        img="/icons/recordings.svg"
        title="View Recordings"/>
      <HomeCard  className="bg-yellow-1"
        description="via invitation link"
        handleClick={()=>setMeetingState("isJoiningMeeting")}
        img="/icons/join-meeting.svg"
        title="Join Meeting"/>
      {!callDetails ? (
        <MeetingModal buttonText="Start Meeting"
          handleClick={createMeeting}
          isOpen={meetingState ==="isScheduleMeeting"}
          onClose={()=>setMeetingState(undefined)}
          title="Create Meeting"
        >
          <div className="flex flex-col gap-2.5">
            <label className="text-base text-normal leading-[22px] text-sky-2">
              Add a description
            </label>
            <Textarea className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={(e)=>setValues({...values,description:e.target.value})}/>
          </div>
          <div className="flex w-full flex-col gap-2.5">
            <label className="text-base text-normal leading-[22px] text-sky-2">
              Select Date and Time
            </label>
            <ReactDatePicker className="w-full rounded bg-dark-3 p-2 focus:outline-none"
              dateFormat="MMMM d, yyyy h:mm aa"
              onChange={(date)=>setValues({...values,dateTime:date!})}
              selected={values.dateTime}
              showTimeSelect
              timeCaption="time"
              timeFormat="HH:mm"
              timeIntervals={15}
            />
          </div>
        </MeetingModal>
      ):( <MeetingModal buttonIcon="/icons/copy.svg"
        buttonText ="Copy Meeting Link"
        className="text-center"
        handleClick={()=>{
          navigator.clipboard.writeText(meetingLink);
          toast({
            title:"Link copied"
          });
        }}
        image="/icons/checked.svg"
        isOpen={meetingState ==="isScheduleMeeting"}
        onClose={()=>setMeetingState(undefined)}
        title="Schedule Meeting"
      />)}
      <MeetingModal buttonText="Start Meeting"
        className="text-center"
        handleClick={createMeeting}
        isOpen={meetingState ==="isInstantMeeting"}
        onClose={()=>setMeetingState(undefined)}
        title="Start an Instant Meeting"
      />
      <MeetingModal buttonText="Join Meeting"
        className="text-center"
        handleClick={()=>router.push(values.link)}
        isOpen={meetingState ==="isJoiningMeeting"}
        onClose={()=>setMeetingState(undefined)}
        title="Type the link here"
      >
        <Input className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
          onChange={(e)=>setValues({...values,link:e.target.value})}
          placeholder="Meeting link"
        />
      </MeetingModal>
    </section>
  );
};

export default MeetingTypeList;