import { motion } from "framer-motion";

function RewardModal({ isOpen, onClose, data }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="bg-white p-6 rounded-xl text-center relative w-[90%] max-w-sm"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2"
        >
          ❌
        </button>

        <h2 className="text-xl font-bold mb-2">
          🎉 Congratulations!
        </h2>

        <p>🪙 +{data.points} Points</p>
        <p>🏅 {data.badge}</p>
        <p>🔖 {data.tag}</p>

        <button
          onClick={() =>
            navigator.share({
              title: "My Achievement",
              text: `I unlocked ${data.badge}!`,
            })
          }
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
        >
          Share 🚀
        </button>

      </motion.div>
    </div>
  );
}

export default RewardModal;