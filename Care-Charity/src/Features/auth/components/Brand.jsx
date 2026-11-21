import { Link } from "react-router";
import { Heart } from "lucide-react";

export default function Brand() {
  return (
    <Link to="/" className="flex items-center gap-3">
      <span className="grid h-10 w-10 place-items-center rounded-xl border border-primary/40 bg-primary/10 text-primary-light">
        <Heart size={22} />
      </span>

      <span className="max-[420px]:hidden">
        <span className="block text-xl font-bold tracking-tight text-ink">We Care</span>
        <span className="block text-[10px] tracking-[0.19em] text-ink-muted">CHARITY OPERATIONS</span>
      </span>
    </Link>
  );
}
