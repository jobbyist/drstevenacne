import { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { X, Send, Sparkles, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";

const SUGGESTIONS = [
  "I get cystic breakouts on my jawline",
  "What should I avoid eating?",
  "Build me a beginner routine",
  "How long until I see results?",
];

const WELCOME: UIMessage = {
  id: "welcome",
  role: "assistant",
  parts: [
    {
      type: "text",
      text:
        "Hi — I'm **Steven AI**, your acne-care concierge. To build your custom Dr Steven regimen, tell me: **what does your skin look like today**, and **how long have you been dealing with breakouts?**",
    },
  ],
};

export function StevenAI({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { messages, sendMessage, status } = useChat({
    id: "steven-ai-session",
    messages: [WELCOME],
    transport: new DefaultChatTransport({ api: "/api/chat" }),
    onError: (e) => console.error(e),
  });

  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isLoading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 200);
  }, [open]);

  const submit = (text: string) => {
    const t = text.trim();
    if (!t || isLoading) return;
    sendMessage({ text: t });
    setInput("");
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-primary/30 backdrop-blur-sm z-50 transition-opacity ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />
      <aside
        className={`fixed z-50 inset-x-2 bottom-2 top-16 sm:inset-auto sm:bottom-4 sm:right-4 sm:top-4 sm:w-[440px] bg-background rounded-2xl shadow-product flex flex-col overflow-hidden border border-border transition-all duration-300 ${
          open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
        }`}
      >
        <header className="flex items-center justify-between px-5 py-4 border-b border-border bg-primary text-primary-foreground">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-clinical inline-flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-clinical-foreground" />
            </div>
            <div>
              <div className="text-sm font-semibold tracking-wide">STEVEN AI</div>
              <div className="text-[11px] text-primary-foreground/70 tracking-[0.1em]">Acne concierge · online</div>
            </div>
          </div>
          <button onClick={onClose} aria-label="Close" className="h-9 w-9 inline-flex items-center justify-center rounded-full hover:bg-primary-foreground/10 transition">
            <X className="h-4 w-4" />
          </button>
        </header>

        <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-6 space-y-5 bg-sand/40">
          {messages.map((m) => {
            const text = m.parts.map((p) => (p.type === "text" ? p.text : "")).join("");
            const isUser = m.role === "user";
            return (
              <div key={m.id} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[88%] rounded-2xl px-4 py-3 text-[14px] leading-relaxed ${
                    isUser
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-background border border-border text-primary rounded-bl-sm"
                  }`}
                >
                  {isUser ? (
                    <p>{text}</p>
                  ) : (
                    <div className="prose prose-sm max-w-none prose-p:my-1.5 prose-ul:my-2 prose-li:my-0.5 prose-strong:text-primary prose-headings:text-primary prose-headings:font-serif">
                      <ReactMarkdown>{text}</ReactMarkdown>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-background border border-border rounded-2xl rounded-bl-sm px-4 py-3 inline-flex items-center gap-2 text-muted-foreground text-sm">
                <Loader2 className="h-3.5 w-3.5 animate-spin" /> Steven AI is thinking…
              </div>
            </div>
          )}
          {messages.length === 1 && !isLoading && (
            <div className="pt-2">
              <div className="text-[11px] uppercase tracking-[0.18em] text-clinical font-semibold mb-3">Try asking</div>
              <div className="flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => submit(s)}
                    className="text-[13px] px-3 py-1.5 rounded-full bg-background border border-border text-primary hover:border-clinical hover:text-clinical transition"
                  >{s}</button>
                ))}
              </div>
            </div>
          )}
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); submit(input); }}
          className="border-t border-border p-3 bg-background"
        >
          <div className="relative flex items-end gap-2 rounded-xl border border-border focus-within:border-clinical px-3 py-2 transition">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submit(input); } }}
              rows={1}
              placeholder="Tell Steven AI about your skin…"
              className="flex-1 resize-none bg-transparent text-sm py-1.5 placeholder:text-muted-foreground focus:outline-none max-h-32"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="h-9 w-9 inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground disabled:opacity-40 hover:bg-ink transition shrink-0"
              aria-label="Send"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </button>
          </div>
          <p className="text-[10px] text-muted-foreground mt-2 px-1">AI guidance — not a medical diagnosis. For severe acne, see a dermatologist in person.</p>
        </form>
      </aside>
    </>
  );
}

export function StevenAIFloatingButton({ onClick, open }: { onClick: () => void; open: boolean }) {
  if (open) return null;
  return (
    <button
      onClick={onClick}
      className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 h-14 pl-3 pr-5 py-3 rounded-full bg-primary text-primary-foreground shadow-product hover:bg-ink transition group"
    >
      <span className="h-7 w-7 rounded-full bg-clinical inline-flex items-center justify-center">
        <Sparkles className="h-3.5 w-3.5 text-clinical-foreground" />
      </span>
      <span className="text-[13px] font-semibold tracking-wide">Ask Steven AI</span>
    </button>
  );
}
