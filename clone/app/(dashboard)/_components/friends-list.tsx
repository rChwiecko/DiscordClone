"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  CheckIcon,
  MessageCircleCodeIcon,
  MessageCircleIcon,
  XIcon,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
const useTestUsers = () => {
  const user = useQuery(api.functions.user.get);
  if (!user) {
    return [];
  }
  return [user, user, user, user, user]; /*user, user, user, user, user*/
};

function FriendsListEmpty({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-4 bg-muted/50 text-center text-sm text-muted-foreground">
      {children}
    </div>
  );
}

function IconButton({
  title,
  className,
  icon,
}: {
  title: string;
  className?: string;
  icon: React.ReactNode;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          className={cn("rounded-full", className)}
          variant="outline"
          size="icon"
        >
          {icon}
          <span className="sr-only">{title}</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>{title}</TooltipContent>
    </Tooltip>
  );
}

export function PendingFriendsList() {
  const friends = useQuery(api.functions.friends.listPending)
  return (
    <div className="flex flex-col divide-y">
      <h2 className="text-xs font-medium text-muted-foreground p-2.5">
        Pending Friends
      </h2>
      {friends?.length === 0 && (
        <FriendsListEmpty>No requests yet</FriendsListEmpty>
      )}
      {friends?.length !== 0 &&
        friends?.map((friend, index) => (
          <FriendItem key={index} username={friend.user.username} image={friend.user.image}>
            <IconButton
              title="Reject Friend"
              icon={<XIcon />}
              className="bg-red-100"
            />
            <IconButton
              title="Add Friend"
              icon={<CheckIcon />}
              className="bg-green-100"
            />
          </FriendItem>
        ))}
    </div>
  );
}

export function AcceptedFriendsList() {
  const friends = useQuery(api.functions.friends.listAccepted);
  return (
    <div className="flex flex-col divide-y">
      <h2 className="text-xs font-medium text-muted-foreground p-2.5">
        Accepted Friends
      </h2>
      {friends?.length === 0 && <FriendsListEmpty>No friends</FriendsListEmpty>}
      {friends?.length !== 0 &&
        friends?.map((friend, index) => (
          <FriendItem key={index} username={friend.user.username} image={friend.user.image}>
            <IconButton title="Start DM" icon={<MessageCircleIcon />} />
            <IconButton
              title="Remove Friend"
              icon={<XIcon />}
              className="bg-red-100"
            />
          </FriendItem>
        ))}
    </div>
  );
}

function FriendItem({
  username,
  image,
  children,
}: {
  username: string;
  image: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between p-2.5 gap-2.5">
      <div className="flex items-center gap-2.5">
        <Avatar className="size-9 border">
          <AvatarImage src={image}></AvatarImage>
          <AvatarFallback></AvatarFallback>
        </Avatar>
        <p className="text-sem font-medium">{username}</p>
      </div>
      <div className="flex items-center gap-1">{children}</div>
    </div>
  );
}
