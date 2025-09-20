import { MessageSquare } from "lucide-react";

export default function MessagesPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center bg-muted/20">
      <MessageSquare className="h-16 w-16 text-muted-foreground" />
      <h2 className="mt-4 text-2xl font-semibold">Select a conversation</h2>
      <p className="mt-2 text-muted-foreground">
        Choose a conversation from the list to start messaging.
      </p>
    </div>
  );
}
