'use client';

import { useState } from 'react';
import type { Conversation } from '@/lib/definitions';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Paperclip } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader } from '../ui/card';
import Image from 'next/image';
import { listings } from '@/lib/data';
import Link from 'next/link';


export default function ChatInterface({ conversation }: { conversation: Conversation }) {
  const [messages, setMessages] = useState(conversation.messages);
  const [newMessage, setNewMessage] = useState('');
  
  const listing = listings.find(l => l.id === conversation.listingId);
  const otherParticipantId = conversation.participantIds.find(id => id !== 'user') || 'user';
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const msg = {
      id: `m${Date.now()}`,
      senderId: 'user',
      text: newMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages([...messages, msg]);
    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-full">
      <header className="flex items-center gap-4 p-4 border-b">
        <Avatar>
          <AvatarImage src={conversation.participantAvatars[otherParticipantId]} />
          <AvatarFallback>{conversation.participantNames[otherParticipantId]?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="font-semibold">{conversation.participantNames[otherParticipantId]}</h2>
          <p className="text-sm text-muted-foreground">Regarding: {conversation.listingName}</p>
        </div>
      </header>

      <div className="flex-1 grid grid-cols-1 xl:grid-cols-4 overflow-hidden">
        <ScrollArea className="flex-1 xl:col-span-3">
          <div className="p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn('flex items-end gap-2', message.senderId === 'user' ? 'justify-end' : 'justify-start')}
              >
                {message.senderId !== 'user' && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={conversation.participantAvatars[message.senderId]} />
                    <AvatarFallback>{conversation.participantNames[message.senderId]?.charAt(0)}</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    'max-w-xs md:max-w-md lg:max-w-lg rounded-lg px-4 py-2',
                    message.senderId === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  )}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        {listing && (
          <div className="hidden xl:block border-l p-4">
             <Card>
                <CardHeader className="p-0">
                    <Link href={`/listings/${listing.id}`} className="block">
                    <div className="relative aspect-video w-full">
                        <Image
                        src={listing.material.image}
                        alt={listing.material.name}
                        fill
                        className="object-cover rounded-t-lg"
                        />
                    </div>
                    </Link>
                </CardHeader>
                <CardContent className="p-4">
                     <Link href={`/listings/${listing.id}`} className="block">
                        <h3 className="font-semibold text-md leading-tight hover:text-primary transition-colors">
                        {listing.material.name}
                        </h3>
                    </Link>
                    <p className="text-sm text-muted-foreground mt-1">
                        {listing.quantity.value} {listing.quantity.unit}
                    </p>
                </CardContent>
            </Card>
          </div>
        )}
      </div>

      <footer className="p-4 border-t">
        <form onSubmit={handleSendMessage} className="relative">
          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="pr-20"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-2">
            <Button type="button" size="icon" variant="ghost">
              <Paperclip className="h-5 w-5" />
            </Button>
            <Button type="submit" size="icon" variant="ghost">
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </form>
      </footer>
    </div>
  );
}
