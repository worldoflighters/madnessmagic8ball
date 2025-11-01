"use client"

import { useFarcaster } from "@/hooks/use-farcaster"
import MagicEightBall from "@/components/magic-eight-ball"
import { motion } from "framer-motion"

export default function Home() {
  const { user } = useFarcaster()

  return (
    <main className="min-h-screen w-full relative flex flex-col items-center justify-center p-4 bg-gradient-to-b from-slate-950 via-purple-900 to-slate-950 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
          className="absolute top-20 right-10 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl"
        ></motion.div>
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
          className="absolute -bottom-20 -left-20 w-80 h-80 bg-purple-800/10 rounded-full blur-3xl"
        ></motion.div>
      </div>

      {user && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-4 right-4 flex items-center gap-3 px-4 py-2 rounded-lg bg-purple-900/40 border border-purple-500/30 backdrop-blur-md z-10"
        >
          {user.pfpUrl && (
            <img
              src={user.pfpUrl || "/placeholder.svg"}
              alt={user.displayName}
              className="w-8 h-8 rounded-full ring-2 ring-purple-400/50"
            />
          )}
          <div className="text-sm">
            <p className="text-purple-200 font-semibold">{user.displayName}</p>
            <p className="text-purple-400 text-xs">@{user.username}</p>
          </div>
        </motion.div>
      )}

      <div className="relative z-10">
        <MagicEightBall user={user} />
      </div>
    </main>
  )
}
