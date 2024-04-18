"use client";
import { useState } from "react";

import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";

import { useToast } from "@/components/ui/use-toast";

import HomeCard from "./HomeCard";
import MeetingModal from "./MeetingModal";

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
      <MeetingModal buttonText="Start Meeting"
        className="text-center"
        handleClick={createMeeting}
        isOpen={meetingState ==="isInstantMeeting"}
        onClose={()=>setMeetingState(undefined)}
        title="Start an Instant Meeting"
      />
    </section>
  );
};

export default MeetingTypeList;