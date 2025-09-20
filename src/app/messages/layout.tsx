import AppLayout from "@/components/app-layout";
import { conversations } from "@/lib/data";
import ConversationList from "@/components/messages/conversation-list";

export default function MessagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppLayout>
      <div className="flex h-[calc(100vh-56px)]">
        <div className="hidden md:flex flex-col w-80 lg:w-96 border-r">
          <ConversationList conversations={conversations} />
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </AppLayout>
  );
}
