'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import type { Conversation } from '@/lib/definitions';
import { Search } from 'lucide-react';

export default function ConversationList({ conversations }: { conversations: Conversation[] }) {
  const pathname = usePathname();

  return (
    <>
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold tracking-tight">Messages</h2>
        <div className="relative mt-2">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search conversations..." className="pl-8" />
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-1 p-2">
          {conversations.map((convo) => {
            const otherParticipantId = convo.participantIds.find(id => id !== 'user') || 'user';
            const isActive = pathname.includes(convo.id);
            return (
              <Link
                key={convo.id}
                href={`/messages/${convo.id}`}
                className={cn(
                  'flex items-start gap-3 rounded-lg p-3 text-left text-sm transition-all hover:bg-accent',
                  isActive && 'bg-accent'
                )}
              >
                <Avatar>
                  <AvatarImage src={convo.participantAvatars[otherParticipantId]} />
                  <AvatarFallback>
                    {convo.participantNames[otherParticipantId]?.charAt(0) || '?'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 overflow-hidden">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold truncate">
                      {convo.participantNames[otherParticipantId]}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(convo.lastMessageAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  <p className="text-xs font-medium truncate">Re: {convo.listingName}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {convo.messages[convo.messages.length - 1].text}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </ScrollArea>
    </>
  );
}
