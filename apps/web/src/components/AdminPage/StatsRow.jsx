import { motion } from "motion/react";
import { Activity, Hash, Zap, Clock } from "lucide-react";
import { StatCard } from "./StatCard";

export function StatsRow({ stats, generatedKeysCount }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
        gap: 14,
        marginBottom: 28,
      }}
    >
      <StatCard
        icon={<Activity size={16} />}
        label="Active Keys"
        value={stats.active}
      />
      <StatCard
        icon={<Hash size={16} />}
        label="Total HWIDs"
        value={stats.total}
      />
      <StatCard
        icon={<Zap size={16} />}
        label="Generated This Session"
        value={generatedKeysCount}
        color="#22c55e"
      />
      <StatCard
        icon={<Clock size={16} />}
        label="System Status"
        value="Online"
        color="#22c55e"
      />
    </motion.div>
  );
}
