export const ROLE_LIST = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};

export const ROLE_ITEM = {
  hidden: { opacity: 0, scale: 0.98 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.22, ease: "easeOut" } },
  exit: { opacity: 0, scale: 0.98, transition: { duration: 0.15 } },
};
