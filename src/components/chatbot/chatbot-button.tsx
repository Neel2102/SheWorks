'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChatbotDialog } from './chatbot-dialog';
import { MessageCircle } from 'lucide-react';

export function ChatbotButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        size="icon"
        className="fixed bottom-4 right-4 h-12 w-12 rounded-full shadow-lg"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
      <ChatbotDialog open={open} onOpenChange={setOpen} />
    </>
  );
}