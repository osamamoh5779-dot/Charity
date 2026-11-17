export default function BackgroundGlow() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden opacity-40 dark:opacity-100"
    >
      <div className="absolute top-10 -start-20 w-[360px] h-[360px] rounded-full bg-primary/15 blur-[48px] transform-gpu" />
      <div className="absolute bottom-10 start-0 w-[300px] h-[300px] rounded-full bg-teal/15 blur-[48px] transform-gpu" />
      <div className="absolute -top-32 start-[376px] w-[583px] h-[384px] rounded-full bg-primary-light/10 blur-[32px] transform-gpu" />
      <div className="absolute -top-24 end-1/4 w-[340px] h-[260px] rounded-full bg-primary/10 blur-[40px] transform-gpu" />
      <div className="absolute top-48 end-0 w-[420px] h-[300px] rounded-full bg-teal/10 blur-[40px] transform-gpu" />
      <div className="absolute top-2/3 -end-24 w-[380px] h-[380px] rounded-full bg-primary-light/15 blur-[48px] transform-gpu" />
      <div className="absolute top-1/3 start-1/2 w-[300px] h-[300px] rounded-full bg-teal/15 blur-[48px] transform-gpu" />
      <div className="absolute top-1/2 start-64 w-[360px] h-[280px] rounded-full bg-primary/15 blur-[40px] transform-gpu" />
      <div className="absolute -bottom-40 start-1/4 w-[500px] h-[340px] rounded-full bg-primary/10 blur-[40px] transform-gpu" />
      <div className="absolute bottom-16 end-1/4 w-[320px] h-[240px] rounded-full bg-teal/15 blur-[40px] transform-gpu" />
    </div>
  );
}
