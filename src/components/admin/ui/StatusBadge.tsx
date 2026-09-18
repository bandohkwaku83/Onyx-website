import type {
  AvailabilityStatus,
  OrderStatus,
  PaymentStatus,
  PublishStatus,
} from "@/lib/admin/types";

const orderStyles: Record<OrderStatus, string> = {
  pending: "border-amber-700/20 bg-amber-50 text-amber-900",
  processing: "border-primary/20 bg-primary/5 text-primary",
  completed: "border-emerald-800/15 bg-emerald-50 text-emerald-900",
  cancelled: "border-charcoal/15 bg-charcoal/5 text-charcoal/60",
};

const paymentStyles: Record<PaymentStatus, string> = {
  pending: "border-amber-700/20 bg-amber-50 text-amber-900",
  paid: "border-emerald-800/15 bg-emerald-50 text-emerald-900",
  failed: "border-red-700/20 bg-red-50 text-red-800",
  refunded: "border-charcoal/15 bg-charcoal/5 text-charcoal/60",
};

const publishStyles: Record<PublishStatus, string> = {
  published: "border-emerald-800/15 bg-emerald-50 text-emerald-900",
  draft: "border-amber-700/20 bg-amber-50 text-amber-900",
  archived: "border-charcoal/15 bg-charcoal/5 text-charcoal/60",
};

const availabilityStyles: Record<AvailabilityStatus, string> = {
  available: "border-emerald-800/15 bg-emerald-50 text-emerald-900",
  unavailable: "border-charcoal/15 bg-charcoal/5 text-charcoal/60",
  "coming-soon": "border-primary/20 bg-primary/5 text-primary",
};

function Badge({
  label,
  className,
}: {
  label: string;
  className: string;
}) {
  return (
    <span
      className={`inline-flex items-center border px-2 py-0.5 text-[10px] tracking-[0.12em] uppercase ${className}`}
    >
      {label.replace("-", " ")}
    </span>
  );
}

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  return <Badge label={status} className={orderStyles[status]} />;
}

export function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  return <Badge label={status} className={paymentStyles[status]} />;
}

export function PublishStatusBadge({ status }: { status: PublishStatus }) {
  return <Badge label={status} className={publishStyles[status]} />;
}

export function AvailabilityBadge({ status }: { status: AvailabilityStatus }) {
  return <Badge label={status} className={availabilityStyles[status]} />;
}
