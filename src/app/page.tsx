"use client";

import { useEffect, useRef } from "react";

import { useChat } from '@ai-sdk/react';

import Message from "../components/ui/message";
import ChatForm from "@/components/forms/chat-form";

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();

  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      <div
        ref={messagesRef}
        className="chat-list flex-1 overflow-auto space-y-4 px-4"
      >
        {messages.map(m => (
          <Message key={m.id} message={m} />
        ))}
      </div>

      <ChatForm
        handleFormSubmit={handleSubmit}
        setMessage={handleInputChange}
        loading={isLoading}
        input={input}
      />
    </>
  );
}