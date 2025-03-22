'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ChatbotDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ChatbotDialog({ open, onOpenChange }: ChatbotDialogProps) {
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([
    { text: 'Hi there! I'm your SheWorks AI assistant. How can I help you today?', isUser: false },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    setMessages([...messages, { text: input, isUser: true }]);
    setInput('');
    
    // Simulate AI response
    setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          text: 'Thank you for your message. This is a placeholder response. In the future, this will be connected to an AI service for personalized financial guidance.',
          isUser: false,
        },
      ]);
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md h-[500px] flex flex-col">
        <DialogHeader>
          <DialogTitle>SheWorks Assistant</DialogTitle>
        </DialogHeader>
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`rounded-lg px-4 py-2 max-w-[80%] ${
                    message.isUser
                      ? 'bg-teal-600 text-white'
                      : 'bg-muted'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <DialogFooter className="flex-row gap-2">
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1"
          />
          <Button onClick={handleSend}>Send</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}