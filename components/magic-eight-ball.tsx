"use client"

import { useState } from "react"
import { motion } from "framer-motion"

interface FarcasterUser {
  fid: number
  username: string
  displayName: string
  pfpUrl: string
}

interface MagicEightBallProps {
  user: FarcasterUser | null
}

const RESPONSES = [
  // Positive answers
  "It is certain",
  "It is decidedly so",
  "Without a doubt",
  "Yes definitely",
  "You may rely on it",
  "As I see it, yes",
  "Most likely",
  "Outlook good",
  "Yes",
  "Signs point to yes",
  // Non-committal answers
  "Reply hazy, try again",
  "Ask again later",
  "Better not tell you now",
  "Cannot predict now",
  "Concentrate and ask again",
  // Negative answers
  "Don't count on it",
  "My reply is no",
  "My sources say no",
  "Outlook not so good",
  "Very doubtful",
]

export default function MagicEightBall({ user }: MagicEightBallProps) {
  const [response, setResponse] = useState<string | null>(null)
  const [isShaking, setIsShaking] = useState(false)
  const [question, setQuestion] = useState("")

  const handleAsk = () => {
    if (!question.trim()) return

    setIsShaking(true)
    setResponse(null)

    // Simulate shaking and thinking time
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * RESPONSES.length)
      setResponse(RESPONSES[randomIndex])
      setIsShaking(false)
    }, 2000)
  }

  const handleReset = () => {
    setResponse(null)
    setQuestion("")
    setIsShaking(false)
  }

  const handleShare = async () => {
    if (!response || !user) return

    const shareText = `@${user.username} asked: "${question}"\n\nThe Magic 8 Ball says: ${response}\n\nTry it yourself! 🔮`
    const warpcastUrl = `https://warpcast.com/~/compose?text=${encodeURIComponent(shareText)}`

    try {
      window.open(warpcastUrl, "_blank")
    } catch (error) {
      console.error("Failed to open share:", error)
    }
  }

  const getResponseColor = (resp: string | null) => {
    if (!resp) return "text-white"
    const positive = RESPONSES.slice(0, 10).includes(resp)
    const negative = RESPONSES.slice(15).includes(resp)
    if (positive) return "text-emerald-400"
    if (negative) return "text-red-400"
    return "text-amber-300"
  }

  return (
    <div className="flex flex-col items-center justify-center gap-10 max-w-2xl w-full px-6">
      {/* Header section */}
      <div className="text-center space-y-3">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-6xl md:text-7xl font-black text-white tracking-tighter"
        >
          Magic 8 Ball
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg text-purple-300/80 font-light"
        >
          Ask your question and seek your destiny
        </motion.p>
      </div>

      {/* Magic Ball container with enhanced visuals */}
      <motion.div
        animate={isShaking ? { rotate: [0, -15, 15, -15, 15, 0] } : { y: 0 }}
        transition={isShaking ? { duration: 0.5, repeat: 4 } : { duration: 0.3 }}
        className="relative w-full flex justify-center"
      >
        {/* Glow background */}
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
          <div className="w-56 h-56 rounded-full bg-purple-600/20 blur-3xl absolute"></div>
        </div>

        {/* Magic Ball */}
        <div className="glow-pulse relative w-56 h-56 rounded-full bg-gradient-to-br from-purple-900 via-black to-purple-950 shadow-2xl flex items-center justify-center border-2 border-purple-500/40 group cursor-default overflow-hidden">
          {/* Animated shine effect */}
          <motion.div
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            className="absolute top-8 left-8 w-24 h-24 bg-white/15 rounded-full blur-2xl"
          ></motion.div>

          {/* Inner reflection */}
          <div className="absolute inset-4 rounded-full border border-purple-400/20 shimmer"></div>

          {/* Response display */}
          <div className="text-center px-8 z-10 relative">
            {response ? (
              <motion.p
                initial={{ opacity: 0, scale: 0.3 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
                className={`text-2xl font-bold ${getResponseColor(response)} text-balance leading-relaxed`}
              >
                {response}
              </motion.p>
            ) : (
              <motion.p
                animate={{ opacity: [0.4, 0.9, 0.4] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="text-white/40 text-sm tracking-widest uppercase"
              >
                {isShaking ? "✨ Seeking..." : "✨ Ask me..."}
              </motion.p>
            )}
          </div>
        </div>
      </motion.div>

      {/* Input and action section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full space-y-4"
      >
        {/* Question input */}
        <div className="relative group">
          <input
            type="text"
            placeholder="What does your future hold?"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && !isShaking && handleAsk()}
            disabled={isShaking}
            className="w-full px-5 py-4 rounded-xl bg-slate-800/30 border border-purple-500/30 text-white placeholder-white/25 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 disabled:opacity-50 transition-all backdrop-blur-sm text-lg"
          />
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600/0 via-purple-600/0 to-purple-600/0 group-hover:from-purple-600/5 group-hover:via-purple-600/10 group-hover:to-purple-600/5 transition-all pointer-events-none"></div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 flex-wrap justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAsk}
            disabled={isShaking || !question.trim()}
            className="flex-1 min-w-32 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-purple-600/50 disabled:shadow-none"
          >
            {isShaking ? "Seeking..." : "Ask"}
          </motion.button>

          {response && (
            <>
              {/* Share button for authenticated users */}
              {user && (
                <motion.button
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleShare}
                  className="px-6 py-3 bg-blue-600/70 hover:bg-blue-500/70 text-white font-semibold rounded-lg transition-all border border-blue-500/50 shadow-lg hover:shadow-blue-600/50"
                  title="Share on Warpcast"
                >
                  Share
                </motion.button>
              )}

              <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleReset}
                className="px-6 py-3 bg-slate-700/50 hover:bg-slate-600/50 text-white font-semibold rounded-lg transition-all border border-slate-500/50"
              >
                Reset
              </motion.button>
            </>
          )}
        </div>
      </motion.div>

      {/* Stats and info section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="w-full grid grid-cols-2 gap-4 md:grid-cols-3"
      >
        <div className="rounded-lg bg-slate-800/20 border border-purple-500/20 px-4 py-3 text-center backdrop-blur-sm">
          <p className="text-sm text-purple-300/60 uppercase tracking-wider">Positive</p>
          <p className="text-xl font-bold text-emerald-400">10</p>
        </div>
        <div className="rounded-lg bg-slate-800/20 border border-purple-500/20 px-4 py-3 text-center backdrop-blur-sm">
          <p className="text-sm text-purple-300/60 uppercase tracking-wider">Uncertain</p>
          <p className="text-xl font-bold text-amber-300">5</p>
        </div>
        <div className="rounded-lg bg-slate-800/20 border border-purple-500/20 px-4 py-3 text-center backdrop-blur-sm md:col-span-1 col-span-2">
          <p className="text-sm text-purple-300/60 uppercase tracking-wider">Negative</p>
          <p className="text-xl font-bold text-red-400">5</p>
        </div>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-center text-xs text-purple-400/50 space-y-2"
      >
        <p className="font-medium">Built for Farcaster • Powered by Base</p>
        <p className="text-purple-500/30">Your mystical guide to destiny 🔮</p>
      </motion.div>
    </div>
  )
}
