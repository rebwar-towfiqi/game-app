// src/components/RoleSelector.tsx

import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { FaGavel, FaUser,FaUserShield } from 'react-icons/fa';

type Role = 'plaintiff' | 'defendant' | 'neutral';

const roles: {
  id: Role;
  label: string;
  icon: React.ElementType;
  bg: string;
}[] = [
  {
    id: 'plaintiff',
    label: 'وکیل شاکی',
    icon: FaGavel,
    bg: 'bg-red-600',
  },
  {
    id: 'defendant',
    label: 'وکیل متهم',
    icon: FaUserShield,
    bg: 'bg-green-600',
  },
  {
    id: 'neutral',
    label: 'نقش آزاد',
    icon: FaUser,
    bg: 'bg-blue-600',
  },
];

export default function RoleSelector() {
  const router = useRouter();

  const handleSelect = (roleId: Role) => {
    router.push(`/game/case-selection?role=${roleId}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-blue-100 p-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-center text-blue-800 mb-10"
      >
        🎭 نقش خود را در بازی انتخاب کنید
      </motion.h1>

      <div className="grid gap-6 w-full max-w-4xl sm:grid-cols-2 md:grid-cols-3">
        {roles.map(({ id, label, icon: Icon, bg }, index) => (
          <motion.button
            key={id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => handleSelect(id)}
            className={`cursor-pointer flex flex-col items-center justify-center ${bg} text-white p-6 rounded-2xl shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-blue-300`}
          >
            <Icon className="text-4xl mb-3" />
            <span className="text-xl font-semibold">{label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
