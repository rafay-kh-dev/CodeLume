"use client";
import React, { useState } from "react";
import { MessageCircle, X, Send, CheckCircle2, Headphones } from "lucide-react";

export default function SupportWidget() {
  // Web3Forms Access Key - https://web3forms.com se apni Outlook / Gmail daal ke lo, yahan paste karo
  // Jab user form bharega, mail seedha tumhare Outlook / Gmail pe aayega, mailto nahi khulega
  const WEB3FORMS_ACCESS_KEY = "c296afa0-659b-4345-912d-8ebba07a8b4b";
  const [isOpen, setIsOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!subject.trim()) {
      setError("Please enter a subject.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!message.trim()) {
      setError("Please write your message.");
      return;
    }

    setIsSending(true);
    try {
      // Direct email - Web3Forms se seedha tumhare Outlook / Gmail pe jayega
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Support: ${subject.trim()} - Rafay's CodeLume`,
          from_name: "Need help?",
          name: email.trim(),
          email: email.trim(),
          message: `Subject: ${subject.trim()}\nFrom: ${email.trim()}\n\nMessage:\n${message.trim()}`,
          // Reply-To user ka email taake tum Reply dabao to seedha user ko jaye
          replyto: email.trim(),
          // Auto-reply - user ko foran tumhari taraf se thanks wala mail jayega
          autoresponse: `Hi,\n\nThanks for contacting Rafay's CodeLume!\n\nI have received your message about "${subject.trim()}" and will respond as soon as possible from mrafaykh@outlook.com within 24 hours.\n\nThanks,\nRafay - Rafay's CodeLume`,
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Failed to send");

      setIsSent(true);
      // Auto-reset hata diya - user reload kiye baghair second form nahi bhar sakta
    } catch (err) {
      // Agar Web3Forms key nahi lagi ya net fail - fallback mailto
      const mailSubject = `Support: ${subject.trim()}`;
      const mailBody = `Subject: ${subject.trim()}\nFrom: ${email.trim()}\n\nMessage:\n${message.trim()}`;
      window.open(
        `mailto:hello@Rafay's CodeLume.online?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`,
        "_blank",
      );
      setError(
        "Could not send directly. Your email app is open - just press Send there.",
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed right-5 bottom-34 sm:right-6 sm:bottom-6 flex flex-col items-end gap-3 font-jakarta">
      {/* Panel */}
      {isOpen && (
        <div className="w-[300px] max-w-[calc(100vw-2rem)] bg-white border border-gray-200 rounded-[20px] shadow-[0_20px_50px_rgba(0,0,0,0.16)] overflow-hidden">
          {/* Header */}
          <div className="flex items-start justify-between px-4 pt-4 pb-3 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-full bg-[#4285f4] flex items-center justify-center shrink-0">
                <Headphones className="w-[18px] h-[18px] text-white" />
              </span>
              <div>
                <p className="text-[14px] font-bold text-black leading-tight m-0">
                  Need Help?
                </p>
                <p className="text-[11px] text-gray-500 font-medium m-0 mt-0.5">
                  Replies within 24h
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center outline-none cursor-pointer transition-colors"
              aria-label="Close support"
            >
              <X className="w-4 h-4 text-black" />
            </button>
          </div>

          {/* Form */}
          {isSent ? (
            <div className="px-5 py-8 flex flex-col items-center text-center">
              <CheckCircle2 className="w-12 h-12 text-[#34A853] mb-3" />
              <p className="text-[16px] font-bold text-black m-0">
                Message ready!
              </p>

              <p className="text-[13px] font-bold text-black leading-relaxed m-0 mt-2 max-w-[260px]">
                You will get the answer from{" "}
                <span className="text-black underline">
                  mrafaykh@outlook.com
                </span>{" "}
                within 24 hours.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="px-4 py-3 flex flex-col gap-3"
            >
              {/* 1. Subject */}
              <div>
                <label
                  htmlFor="support-subject"
                  className="block text-[12px] font-bold text-black uppercase tracking-wider mb-1.5"
                >
                  Subject
                </label>
                <input
                  id="support-subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Website pricing, Bug, Project inquiry"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-[13px] text-black placeholder:text-gray-400 font-medium outline-none focus:bg-white focus:border-black transition-colors"
                />
              </div>

              {/* 2. Email */}
              <div>
                <label
                  htmlFor="support-email"
                  className="block text-[12px] font-bold text-black uppercase tracking-wider mb-1.5"
                >
                  Your Email
                </label>
                <input
                  id="support-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-[13px] text-black placeholder:text-gray-400 font-medium outline-none focus:bg-white focus:border-black transition-colors"
                />
              </div>

              {/* 3. Message */}
              <div>
                <label
                  htmlFor="support-message"
                  className="block text-[12px] font-bold text-black uppercase tracking-wider mb-1.5"
                >
                  Message
                </label>
                <textarea
                  id="support-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us how we can help..."
                  rows={3}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-[13px] text-black placeholder:text-gray-400 font-medium outline-none focus:bg-white focus:border-black transition-colors resize-none"
                />
              </div>

              {error && (
                <p className="text-[12px] font-bold text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2 m-0">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={isSending}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-[#4285f4] hover:bg-[#1a1a1a] text-white text-[13.5px] font-bold outline-none cursor-pointer transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />{" "}
                {isSending ? "Sending..." : "Send Message"}
              </button>

              <p className="text-center text-[11px] text-gray-500 font-medium leading-relaxed m-0">
                You will get the answer from{" "}
                <span className="font-bold text-[#4285f4]">
                  mrafaykh@outlook.com
                </span>{" "}
                within 24 hours.
              </p>
            </form>
          )}
        </div>
      )}

      {/* Floating Button - Left pe "Need help?" sirf hover pe dikhega */}
      <div className="group flex items-center gap-3">
        <span className="opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 bg-white border border-gray-200 shadow-[0_8px_20px_rgba(0,0,0,0.12)] text-black text-[13px] font-bold px-3.5 py-2 rounded-full whitespace-nowrap pointer-events-none select-none">
          Need help?
        </span>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open support"
          className="w-14 h-14 rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.20)] outline-none cursor-pointer transition-all hover:scale-105 active:scale-95 bg-[#4285F4] text-white"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageCircle className="w-6 h-6" />
          )}
        </button>
      </div>
    </div>
  );
}
