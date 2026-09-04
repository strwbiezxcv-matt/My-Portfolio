import { motion } from "motion/react";
import { X } from "lucide-react";
import type { Theme } from "../theme";
import { pubmats } from "../data";

interface PubmatsModalProps {
  theme: Theme;
  onClose: () => void;
}

export default function PubmatsModal({ theme, onClose }: PubmatsModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ type: "spring", damping: 25 }}
        className={`relative w-full max-w-6xl rounded-2xl shadow-2xl ${theme.card}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`px-6 py-5 flex items-center justify-between border-b ${theme.divider}`}>
          <div>
            <h3 className="text-2xl font-bold tracking-tight">My Pubmats Collection</h3>
            <p className={`text-sm mt-1 ${theme.muted}`}>
              Creative designs and promotional materials
            </p>
          </div>
          <button
            onClick={onClose}
            className={`p-2.5 rounded-full border transition-all ${theme.chip} hover:bg-brand/15`}
            aria-label="Close pubmats"
          >
            <X size={22} />
          </button>
        </div>

        <div className="px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pubmats.map((pubmat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(index * 0.06, 0.4) }}
                className={`group overflow-hidden rounded-xl ${theme.card} ${theme.cardHover} transition-all`}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={pubmat.image}
                    alt={pubmat.title}
                    className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className={`px-4 py-3 border-t ${theme.divider}`}>
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs mb-2 ${theme.chip}`}>
                    {pubmat.category}
                  </span>
                  <h4 className="text-sm font-semibold">{pubmat.title}</h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}