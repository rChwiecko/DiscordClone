"use client";

import {
  Authenticated,
  Unauthenticated,
  useMutation,
  useQueries,
  useQuery,
} from "convex/react";
import { useState } from "react";
import { api } from "@/convex/_generated/api";

export default function Home() {
  const messages = useQuery(api.functions.message.list);
  const createMessage = useMutation(api.functions.message.create);
  const [input, setInput] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createMessage({ sender: "Alice", content: input });
    setInput("");
  };

  return (
    <div>
      {messages?.map((message, index) => (
        <div key={index}>
          <strong>{message.sender}</strong>: {message.content}
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="message"
          id="message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
