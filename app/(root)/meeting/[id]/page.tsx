"use client";
import { useState } from "react";

import { useGetCallBtyId } from "@/hooks/useGetCallBtyId";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";

import Loader from "@/components/Loader";
import MeetingRoom from "@/components/MeetingRoom";
import MeetingSetup from "@/components/MeetingSetup";

const Meeting = ({params: {id}}: {params : {id:string}}) => {
  const {call, isCallLoading} = useGetCallBtyId(id);
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const {user, isLoaded} = useUser();

  if(!isLoaded || isCallLoading) {
    return <Loader/>;
  } 
  return (
    <main>
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetup setIsSetupComplete={setIsSetupComplete}/>
          ): (<MeetingRoom/>)}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default Meeting;