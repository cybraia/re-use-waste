import { conversations } from "@/lib/data";
import { notFound } from "next/navigation";
import ChatInterface from "@/components/messages/chat-interface";

export default function SingleMessagePage({ params }: { params: { id: string } }) {
  const conversation = conversations.find(c => c.id === params.id);

  if (!conversation) {
    // In a real app, you might fetch the conversation or redirect
    return notFound();
  }

  return <ChatInterface conversation={conversation} />;
}
